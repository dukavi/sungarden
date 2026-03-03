(function () {
	// Read translated strings from script data attributes
	var scriptEl = document.querySelector('script[data-loading-text]');
	var loadingTextPrefix = scriptEl?.getAttribute('data-loading-text') || 'Loading station';
	var loadingMonthText = scriptEl?.getAttribute('data-loading-month-text') || 'Loading month';
	var ofText = scriptEl?.getAttribute('data-of-text') || '/';

	var STATIONS_META = []; // Loaded from stations.json

	// Major stations shown at all zoom levels (~35 regional)
	var MAJOR_IDS = new Set([
		'100971', // Helsinki
		'100949', // Turku
		'101118', // Tampere
		'101339', // Jyvaskyla
		'101462', // Vaasa
		'101572', // Kuopio
		'101632', // Joensuu
		'101799', // Oulu
		'101756', // Kajaani
		'101252', // Lappeenranta
		'101486', // Seinajoki
		'101267', // Pori
		'101150', // Lahti
		'101398', // Mikkeli
		'101662', // Kokkola
		'101921', // Rovaniemi
		'101932', // Sodankyla
		'102035', // Utsjoki
		'100921', // Enontekio
		'101886', // Kuusamo
		'101908', // Salla
		'101918', // Muonio
		'100946', // Hanko
		'101042', // Kotka
		'101436', // Savonlinna
		'101523', // Ylivieska
		'101851', // Tornio
		'101906', // Inari
		'101920', // Kittila
		'101784', // Hailuoto
		'101104', // Jokioinen
		'101580', // Lieksa
		'100929', // Maarianhamina
	]);

	// Finland boundary polygons for clipping (mainland + Åland)
	var FINLAND_POLYGON = [
		[70.09,27.80],[69.94,28.96],[69.06,28.36],[68.91,28.77],[68.54,28.47],
		[68.36,29.34],[67.79,29.11],[67.47,29.24],[66.93,29.52],[66.56,29.02],
		[65.89,29.63],[65.62,29.79],[65.13,29.57],[64.78,29.93],[64.63,30.05],
		[64.22,30.06],[63.72,29.99],[63.07,31.18],[62.43,31.35],[61.72,31.59],
		[61.07,30.99],[60.64,30.68],[60.53,30.10],[60.22,29.63],[60.15,28.70],
		[60.00,27.87],[59.82,26.58],[59.80,24.47],[59.82,22.90],[59.92,22.60],
		[60.13,21.44],[60.46,21.38],[60.65,21.22],[61.10,21.16],[61.47,21.33],
		[62.06,21.07],[62.62,21.28],[63.05,21.35],[63.52,21.74],[63.92,22.37],
		[64.20,23.24],[64.58,24.04],[65.02,24.54],[65.53,24.64],[65.84,24.14],
		[66.17,23.65],[66.76,23.65],[67.25,23.76],[67.94,23.45],[68.25,22.38],
		[68.56,21.63],[68.94,21.06],[69.05,20.62],[69.28,20.03],[69.33,20.50],
		[69.62,21.65],[69.81,22.95],[69.90,24.11],[70.02,25.17],[70.08,25.71],
		[70.09,27.80]
	];
	var ALAND_POLYGON = [
		[60.48,19.50],[60.45,20.10],[60.35,20.45],[60.20,20.55],[60.05,20.45],
		[59.95,20.15],[59.97,19.80],[60.00,19.50],[60.10,19.30],[60.25,19.25],
		[60.40,19.30],[60.48,19.50]
	];

	// -----------------------------------------------------------------------
	// Color scale
	// -----------------------------------------------------------------------
	function satColor(val) {
		var stops = [
			{ v: 400, r: 49, g: 130, b: 189 },
			{ v: 900, r: 49, g: 189, b: 189 },
			{ v: 1400, r: 49, g: 189, b: 80 },
			{ v: 1900, r: 230, g: 160, b: 40 },
			{ v: 2800, r: 210, g: 40, b: 40 },
		];
		if (val <= stops[0].v) return stops[0];
		if (val >= stops[stops.length - 1].v) return stops[stops.length - 1];
		for (var i = 0; i < stops.length - 1; i++) {
			if (val <= stops[i + 1].v) {
				var t = (val - stops[i].v) / (stops[i + 1].v - stops[i].v);
				return {
					r: Math.round(stops[i].r + t * (stops[i + 1].r - stops[i].r)),
					g: Math.round(stops[i].g + t * (stops[i + 1].g - stops[i].g)),
					b: Math.round(stops[i].b + t * (stops[i + 1].b - stops[i].b)),
				};
			}
		}
		return stops[stops.length - 1];
	}

	function pointInPolygon(lat, lon, poly) {
		var inside = false;
		for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
			var yi = poly[i][0], xi = poly[i][1];
			var yj = poly[j][0], xj = poly[j][1];
			if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
				inside = !inside;
			}
		}
		return inside;
	}

	// -----------------------------------------------------------------------
	// XML parsing (for current year live fetch)
	// -----------------------------------------------------------------------
	function parseBboxSimpleXml(xmlText) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(xmlText, 'text/xml');
		var elements = doc.getElementsByTagName('BsWfs:BsWfsElement');
		// Map: "lat_lon" -> Map<date, {tmin, tmax}>
		var stationMap = new Map();

		for (var k = 0; k < elements.length; k++) {
			var el = elements[k];
			var posEl = el.getElementsByTagName('gml:pos')[0];
			var timeEl = el.getElementsByTagName('BsWfs:Time')[0];
			var paramEl = el.getElementsByTagName('BsWfs:ParameterName')[0];
			var valueEl = el.getElementsByTagName('BsWfs:ParameterValue')[0];

			if (!posEl || !timeEl || !paramEl) continue;

			var parts = posEl.textContent.trim().split(/\s+/);
			var lat = parseFloat(parts[0]);
			var lon = parseFloat(parts[1]);
			if (isNaN(lat) || isNaN(lon)) continue;

			var key = lat.toFixed(4) + '_' + lon.toFixed(4);
			var date = timeEl.textContent.trim().split('T')[0];
			var param = paramEl.textContent.trim();
			var value = valueEl ? parseFloat(valueEl.textContent) : NaN;

			if (!stationMap.has(key)) stationMap.set(key, { lat: lat, lon: lon, days: new Map() });
			var station = stationMap.get(key);
			if (!station.days.has(date)) station.days.set(date, { tmin: null, tmax: null });
			var day = station.days.get(date);
			if (param === 'tmin' && !isNaN(value)) day.tmin = value;
			if (param === 'tmax' && !isNaN(value)) day.tmax = value;
		}

		return stationMap;
	}

	function computeSATFromDays(days) {
		var sat = 0;
		days.forEach(function (day) {
			if (day.tmin !== null && day.tmax !== null) {
				var avg = (day.tmin + day.tmax) / 2;
				if (avg > 10) sat += avg;
			}
		});
		return Math.round(sat);
	}

	// -----------------------------------------------------------------------
	// Data loading
	// -----------------------------------------------------------------------
	async function loadStationsMeta() {
		var res = await fetch('/data/sat/stations.json');
		STATIONS_META = await res.json();
	}

	function findStationMeta(lat, lon) {
		var best = null;
		var bestDist = Infinity;
		for (var i = 0; i < STATIONS_META.length; i++) {
			var s = STATIONS_META[i];
			var d = Math.abs(s.lat - lat) + Math.abs(s.lon - lon);
			if (d < bestDist) {
				bestDist = d;
				best = s;
			}
		}
		return (best && bestDist < 0.02) ? best : null;
	}

	async function fetchHistoricalYear(year) {
		var res = await fetch('/data/sat/' + year + '.json');
		if (!res.ok) return null;
		var data = await res.json();
		return data.stations.map(function (s) {
			var meta = STATIONS_META.find(function (m) { return m.id === s.id; });
			return {
				id: s.id,
				name: meta ? meta.name : 'Station ' + s.id,
				lat: s.lat,
				lon: s.lon,
				sat: s.sat,
				ok: true,
			};
		});
	}

	function lastDayOfMonth(year, month) {
		return new Date(year, month, 0).getDate();
	}

	function fmtDate(d) {
		return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
	}

	async function fetchCurrentYearLive(year, onProgress) {
		var today = new Date();
		var endMonth = today.getMonth(); // 0-indexed
		var totalMonths = endMonth + 1;
		var allStationData = new Map();

		for (var m = 0; m <= endMonth; m++) {
			var startStr = year + '-' + String(m + 1).padStart(2, '0') + '-01';
			var endDay = (m === endMonth) ? fmtDate(today) : year + '-' + String(m + 1).padStart(2, '0') + '-' + lastDayOfMonth(year, m + 1);

			var params = new URLSearchParams({
				service: 'WFS',
				version: '2.0.0',
				request: 'getFeature',
				storedquery_id: 'fmi::observations::weather::daily::simple',
				bbox: '19,59,32,71',
				starttime: startStr + 'T00:00:00Z',
				endtime: endDay + 'T00:00:00Z',
				parameters: 'tmin,tmax',
				maxlocations: '500',
			});

			try {
				var res = await fetch('https://opendata.fmi.fi/wfs?' + params);
				if (res.ok) {
					var xml = await res.text();
					var monthData = parseBboxSimpleXml(xml);
					// Merge into allStationData
					monthData.forEach(function (station, key) {
						if (!allStationData.has(key)) {
							allStationData.set(key, { lat: station.lat, lon: station.lon, days: new Map() });
						}
						var target = allStationData.get(key);
						station.days.forEach(function (day, date) {
							target.days.set(date, day);
						});
					});
				}
			} catch (e) {
				console.error('Failed to fetch month ' + (m + 1) + ':', e);
			}

			onProgress(m + 1, totalMonths);
		}

		// Compute SAT and match to station metadata
		var results = [];
		allStationData.forEach(function (station) {
			var sat = computeSATFromDays(station.days);
			var meta = findStationMeta(station.lat, station.lon);
			results.push({
				id: meta ? meta.id : station.lat.toFixed(4) + '_' + station.lon.toFixed(4),
				name: meta ? meta.name : station.lat.toFixed(2) + ', ' + station.lon.toFixed(2),
				lat: station.lat,
				lon: station.lon,
				sat: sat,
				ok: true,
			});
		});

		return results;
	}

	async function fetchYearData(year, onProgress) {
		var currentYear = new Date().getFullYear();

		// Check sessionStorage cache for current year
		if (year === currentYear) {
			var cacheKey = 'sat-map-live-' + year;
			var cached = sessionStorage.getItem(cacheKey);
			if (cached) {
				try {
					var parsed = JSON.parse(cached);
					if (parsed && parsed.length > 0) {
						onProgress(1, 1);
						return parsed;
					}
				} catch (e) {}
			}

			var data = await fetchCurrentYearLive(year, onProgress);
			if (data.length > 0) {
				sessionStorage.setItem(cacheKey, JSON.stringify(data));
			}
			return data;
		}

		// Historical: load static JSON
		onProgress(1, 1);
		var data = await fetchHistoricalYear(year);
		return data || [];
	}

	// -----------------------------------------------------------------------
	// Map setup
	// -----------------------------------------------------------------------
	var map = L.map('map').setView([64.5, 26.0], 5);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; OpenStreetMap contributors',
		maxZoom: 10,
	}).addTo(map);

	// Aurinkotarha marker
	var farmIcon = L.divIcon({
		className: 'farm-marker',
		html: '<span>Aurinkotarha</span>',
		iconSize: [80, 14],
		iconAnchor: [0, 7],
	});
	L.marker([60.155, 23.84], { icon: farmIcon }).addTo(map)
		.bindPopup('<strong>Aurinkotarha Mustio</strong>');

	var heatLayer = null;
	var majorGroup = L.layerGroup().addTo(map);
	var minorGroup = L.layerGroup();

	// Show minor stations only at zoom >= 7
	map.on('zoomend', function () {
		if (map.getZoom() >= 7) {
			if (!map.hasLayer(minorGroup)) map.addLayer(minorGroup);
		} else {
			if (map.hasLayer(minorGroup)) map.removeLayer(minorGroup);
		}
	});

	// -----------------------------------------------------------------------
	// IDW heatmap overlay
	// -----------------------------------------------------------------------
	function createHeatOverlay(stationData) {
		var validStations = stationData.filter(function (s) { return s.ok && s.sat > 0; });
		if (validStations.length === 0) return null;

		var IDWLayer = L.GridLayer.extend({
			createTile: function (coords) {
				var tile = document.createElement('canvas');
				var size = this.getTileSize();
				tile.width = size.x;
				tile.height = size.y;
				var ctx = tile.getContext('2d');
				var cellSize = 4;

				for (var px = 0; px < size.x; px += cellSize) {
					for (var py = 0; py < size.y; py += cellSize) {
						var point = L.point(coords.x * size.x + px + cellSize / 2, coords.y * size.y + py + cellSize / 2);
						var latlng = map.unproject(point, coords.z);
						var lat = latlng.lat;
						var lon = latlng.lng;

						if (!pointInPolygon(lat, lon, FINLAND_POLYGON) && !pointInPolygon(lat, lon, ALAND_POLYGON)) continue;

						var weightedSum = 0;
						var weightSum = 0;
						for (var i = 0; i < validStations.length; i++) {
							var s = validStations[i];
							var dLat = lat - s.lat;
							var dLon = (lon - s.lon) * Math.cos(lat * Math.PI / 180);
							var dist = Math.sqrt(dLat * dLat + dLon * dLon);
							if (dist < 0.01) {
								weightedSum = s.sat;
								weightSum = 1;
								break;
							}
							var w = 1 / (dist * dist);
							weightedSum += w * s.sat;
							weightSum += w;
						}

						if (weightSum === 0) continue;
						var val = weightedSum / weightSum;
						var c = satColor(val);
						ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0.55)';
						ctx.fillRect(px, py, cellSize, cellSize);
					}
				}
				return tile;
			}
		});

		return new IDWLayer({ pane: 'overlayPane', updateWhenZooming: false, updateWhenIdle: true });
	}

	// -----------------------------------------------------------------------
	// Render
	// -----------------------------------------------------------------------
	function createLabel(station) {
		var c = satColor(station.sat);
		var icon = L.divIcon({
			className: 'sat-label',
			html: '<span style="color:rgb(' + c.r + ',' + c.g + ',' + c.b + ')">' + station.sat + '</span>',
			iconSize: [40, 16],
			iconAnchor: [20, 8],
		});
		var marker = L.marker([station.lat, station.lon], { icon: icon });
		marker.bindPopup('<strong>' + station.name + '</strong><br>SAT: ' + station.sat + ' °C');
		return marker;
	}

	async function loadYear(year) {
		var loading = document.getElementById('loading');
		var loadingText = document.getElementById('loading-text');
		var errorMsg = document.getElementById('error-msg');
		var legend = document.getElementById('legend');

		loading.hidden = false;
		errorMsg.hidden = true;
		legend.hidden = true;

		if (heatLayer) {
			map.removeLayer(heatLayer);
			heatLayer = null;
		}
		majorGroup.clearLayers();
		minorGroup.clearLayers();

		var currentYear = new Date().getFullYear();
		var isLive = year === currentYear;

		var data = await fetchYearData(year, function (done, total) {
			if (isLive) {
				loadingText.textContent = loadingMonthText + ' ' + done + ofText + total + '...';
			} else {
				loadingText.textContent = loadingTextPrefix + '...';
			}
		});

		loading.hidden = true;

		var validData = data.filter(function (s) { return s.ok && s.sat > 0; });
		if (validData.length === 0) {
			errorMsg.hidden = false;
			return;
		}

		// Add station labels (split into major/minor)
		for (var i = 0; i < data.length; i++) {
			var s = data[i];
			if (!s.ok || s.sat <= 0) continue;
			var marker = createLabel(s);
			if (MAJOR_IDS.has(s.id)) {
				majorGroup.addLayer(marker);
			} else {
				minorGroup.addLayer(marker);
			}
		}

		// Show minor if zoomed in
		if (map.getZoom() >= 7 && !map.hasLayer(minorGroup)) {
			map.addLayer(minorGroup);
		}

		heatLayer = createHeatOverlay(data);
		if (heatLayer) {
			heatLayer.addTo(map);
		}

		legend.hidden = false;
	}

	// -----------------------------------------------------------------------
	// Init
	// -----------------------------------------------------------------------
	var yearPicker = document.getElementById('year-picker');
	var now = new Date();
	var currentYear = now.getFullYear();

	for (var y = currentYear; y >= 2010; y--) {
		var opt = document.createElement('option');
		opt.value = String(y);
		opt.textContent = String(y);
		yearPicker.appendChild(opt);
	}
	var defaultYear = currentYear - 1;
	yearPicker.value = String(defaultYear);
	yearPicker.addEventListener('change', function () {
		loadYear(Number(yearPicker.value));
	});

	// Load stations metadata, then load default year
	loadStationsMeta().then(function () {
		loadYear(defaultYear);
	});
})();
