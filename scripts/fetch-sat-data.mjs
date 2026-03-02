#!/usr/bin/env node
/**
 * Fetch SAT (Sum of Active Temperatures) data from FMI Open Data API
 * for all weather stations in Finland. Outputs JSON files to public/data/sat/.
 *
 * Usage:
 *   node scripts/fetch-sat-data.mjs              # fetch all missing years + stations
 *   node scripts/fetch-sat-data.mjs --year 2023  # fetch specific year (overwrite)
 *   node scripts/fetch-sat-data.mjs --stations   # only update stations.json
 *
 * Requires Node.js 18+ (native fetch).
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'data', 'sat');
const FMI_BASE = 'https://opendata.fmi.fi/wfs';

mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
	return new Promise(r => setTimeout(r, ms));
}

async function fetchWithRetry(url, retries = 3) {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return await res.text();
		} catch (e) {
			console.error(`  Attempt ${attempt}/${retries} failed: ${e.message}`);
			if (attempt === retries) throw e;
			await sleep(2000 * attempt);
		}
	}
}

// ---------------------------------------------------------------------------
// Station discovery
// ---------------------------------------------------------------------------

async function fetchStations() {
	console.log('Fetching station list from FMI...');
	const url = `${FMI_BASE}?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::ef::stations&networkid=121`;
	const xml = await fetchWithRetry(url);

	const stations = [];
	// Split into individual facility blocks
	const facilityRegex = /<ef:EnvironmentalMonitoringFacility[\s\S]*?<\/ef:EnvironmentalMonitoringFacility>/g;
	let match;
	while ((match = facilityRegex.exec(xml)) !== null) {
		const block = match[0];

		// fmisid
		const idMatch = block.match(/<gml:identifier[^>]*>(\d+)<\/gml:identifier>/);
		if (!idMatch) continue;
		const id = idMatch[1];

		// station name — first gml:name with locationcode/name
		const nameMatch = block.match(/<gml:name\s+codeSpace="[^"]*locationcode\/name">([^<]+)<\/gml:name>/);
		const name = nameMatch ? nameMatch[1] : `Station ${id}`;

		// coordinates from representativePoint
		const repPointBlock = block.match(/<ef:representativePoint>[\s\S]*?<\/ef:representativePoint>/);
		if (!repPointBlock) continue;
		const posMatch = repPointBlock[0].match(/<gml:pos>([^<]+)<\/gml:pos>/);
		if (!posMatch) continue;
		const [lat, lon] = posMatch[1].trim().split(/\s+/).map(Number);
		if (isNaN(lat) || isNaN(lon)) continue;

		stations.push({
			id,
			name,
			lat: Math.round(lat * 10000) / 10000,
			lon: Math.round(lon * 10000) / 10000,
		});
	}

	console.log(`  Found ${stations.length} stations`);
	return stations;
}

// ---------------------------------------------------------------------------
// Yearly SAT data fetching
// ---------------------------------------------------------------------------

function lastDayOfMonth(year, month) {
	return new Date(year, month, 0).getDate();
}

async function fetchYearData(year, stations) {
	console.log(`\nFetching year ${year}...`);

	// Coordinate key for grouping
	function coordKey(lat, lon) {
		return `${Math.round(lat * 10000)}_${Math.round(lon * 10000)}`;
	}

	// Build station lookup by coordinate
	const stationLookup = new Map();
	for (const s of stations) {
		stationLookup.set(coordKey(s.lat, s.lon), s);
	}

	// Map: coordKey -> Map<date, {tmin, tmax}>
	const stationData = new Map();

	// Fetch in 2-month chunks
	const chunks = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]];

	for (let ci = 0; ci < chunks.length; ci++) {
		const [m1, m2] = chunks[ci];
		const startStr = `${year}-${String(m1).padStart(2, '0')}-01`;
		const endDay = lastDayOfMonth(year, m2);
		const endStr = `${year}-${String(m2).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;

		const params = new URLSearchParams({
			service: 'WFS',
			version: '2.0.0',
			request: 'getFeature',
			storedquery_id: 'fmi::observations::weather::daily::simple',
			bbox: '19,59,32,71',
			starttime: `${startStr}T00:00:00Z`,
			endtime: `${endStr}T00:00:00Z`,
			parameters: 'tmin,tmax',
			maxlocations: '500',
		});

		const url = `${FMI_BASE}?${params}`;
		process.stdout.write(`  Chunk ${ci + 1}/6 (${startStr} to ${endStr})...`);

		try {
			const xml = await fetchWithRetry(url);

			// Parse BsWfsElements
			let elementCount = 0;
			const elRegex = /<BsWfs:BsWfsElement[^>]*>([\s\S]*?)<\/BsWfs:BsWfsElement>/g;
			let elMatch;
			while ((elMatch = elRegex.exec(xml)) !== null) {
				const el = elMatch[1];
				const posMatch = el.match(/<gml:pos>([^<]+)<\/gml:pos>/);
				const timeMatch = el.match(/<BsWfs:Time>([^<]+)<\/BsWfs:Time>/);
				const paramMatch = el.match(/<BsWfs:ParameterName>([^<]+)<\/BsWfs:ParameterName>/);
				const valueMatch = el.match(/<BsWfs:ParameterValue>([^<]*)<\/BsWfs:ParameterValue>/);

				if (!posMatch || !timeMatch || !paramMatch) continue;

				const [lat, lon] = posMatch[1].trim().split(/\s+/).map(Number);
				if (isNaN(lat) || isNaN(lon)) continue;

				const key = coordKey(lat, lon);
				const date = timeMatch[1].trim().split('T')[0];
				const param = paramMatch[1].trim();
				const value = valueMatch ? parseFloat(valueMatch[1]) : NaN;

				if (!stationData.has(key)) stationData.set(key, new Map());
				const days = stationData.get(key);
				if (!days.has(date)) days.set(date, { tmin: null, tmax: null });
				const day = days.get(date);
				if (param === 'tmin' && !isNaN(value)) day.tmin = value;
				if (param === 'tmax' && !isNaN(value)) day.tmax = value;
				elementCount++;
			}

			console.log(` ${elementCount} elements`);
		} catch (e) {
			console.log(` FAILED: ${e.message}`);
		}

		await sleep(1000);
	}

	// Compute SAT per station
	const results = [];
	for (const [key, days] of stationData) {
		let sat = 0;
		for (const [, day] of days) {
			if (day.tmin !== null && day.tmax !== null) {
				const avg = (day.tmin + day.tmax) / 2;
				if (avg > 10) sat += avg;
			}
		}
		sat = Math.round(sat);

		// Match to known station
		let station = stationLookup.get(key);

		// If no exact match, try nearest within 0.01 degrees
		if (!station) {
			const [latStr, lonStr] = key.split('_');
			const lat = parseInt(latStr) / 10000;
			const lon = parseInt(lonStr) / 10000;
			let bestDist = Infinity;
			for (const s of stations) {
				const d = Math.abs(s.lat - lat) + Math.abs(s.lon - lon);
				if (d < bestDist && d < 0.02) {
					bestDist = d;
					station = s;
				}
			}
			if (!station) {
				// Unknown station, use coordinates as ID
				station = { id: key, lat: parseInt(latStr) / 10000, lon: parseInt(lonStr) / 10000 };
			}
		}

		if (sat > 0) {
			results.push({
				id: station.id,
				lat: station.lat,
				lon: station.lon,
				sat,
			});
		}
	}

	results.sort((a, b) => b.sat - a.sat);
	console.log(`  ${results.length} stations with SAT > 0`);
	return { year, stations: results };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	const args = process.argv.slice(2);
	const stationsOnly = args.includes('--stations');
	const yearArg = args.find((_, i, a) => a[i - 1] === '--year');
	const forceYear = yearArg ? parseInt(yearArg) : null;

	// Step 1: Fetch/load station metadata
	const stationsFile = join(OUT_DIR, 'stations.json');
	let stations;

	if (existsSync(stationsFile) && !stationsOnly) {
		stations = JSON.parse(readFileSync(stationsFile, 'utf-8'));
		console.log(`Loaded ${stations.length} stations from cache`);
	} else {
		stations = await fetchStations();
		writeFileSync(stationsFile, JSON.stringify(stations, null, 2));
		console.log(`Wrote ${stationsFile}`);
	}

	if (stationsOnly) return;

	// Step 2: Fetch yearly data
	const currentYear = new Date().getFullYear();
	const startYear = forceYear || 2010;
	const endYear = forceYear || (currentYear - 1);

	for (let year = startYear; year <= endYear; year++) {
		const yearFile = join(OUT_DIR, `${year}.json`);

		if (!forceYear && existsSync(yearFile)) {
			console.log(`\nSkipping ${year} (already exists)`);
			continue;
		}

		const data = await fetchYearData(year, stations);
		writeFileSync(yearFile, JSON.stringify(data));
		console.log(`  Wrote ${yearFile}`);
	}

	console.log('\nDone!');
}

main().catch(e => {
	console.error('Fatal error:', e);
	process.exit(1);
});
