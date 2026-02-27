export const languages = {
	fi: 'Suomi',
	sv: 'Svenska',
	en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'fi';

export const translations: Record<Lang, Record<string, string>> = {
	fi: {
		// Navigation
		'nav.home': 'Etusivu',
		'nav.about': 'Tietoa meistä',
		'nav.blog': 'Blogi',

		// Site
		'site.title': 'Aurinkopuutarha Mustio',
		'site.description': 'Omenatarha Mustiossa, Raaseporissa — omenoita, viinirypäleitä ja siemenhedelmäpuita historiallisen Mustion Linnan naapurissa.',

		// Hero
		'hero.tagline': 'Omenatarha Mustion sydämessä',
		'hero.subtitle': 'Kasvatamme omenoita, viinirypäleitä ja siemenhedelmiä Raaseporin kauniissa maisemissa, historiallisen Mustion Linnan naapurissa.',
		'hero.cta': 'Lue lisää',

		// About section (homepage)
		'home.about.title': 'Tietoa tilasta',
		'home.about.text': 'Aurinkopuutarha on tiheäistutteinen omenatarha Mustiossa, Raaseporin kunnassa. Tilamme sijaitsee historiallisen Mustion Linnan läheisyydessä, Länsi-Uudenmaan kauniissa maisemissa. Kasvatamme pääasiassa omenoita, mutta myös viinirypäleitä ja muita siemenhedelmäpuita.',

		// Products
		'products.title': 'Tuotteemme',
		'products.apples.title': 'Omenat',
		'products.apples.desc': 'Päätuotteemme. Tiheäistutteisessa omenatarhassamme kasvaa useita lajikkeita, jotka sopivat Suomen ilmastoon.',
		'products.grapes.title': 'Viinirypäleet',
		'products.grapes.desc': 'Kasvatamme viinirypäleitä, jotka menestyvät pohjoisessa ilmastossamme.',
		'products.pome.title': 'Siemenhedelmät',
		'products.pome.desc': 'Omenoiden lisäksi kasvatamme myös muita siemenhedelmäpuita.',

		// Location
		'location.title': 'Sijainti',
		'location.text': 'Tilaamme löydät Mustiosta, Raaseporin kunnasta. Olemme aivan historiallisen Mustion Linnan naapurissa — yhden Suomen arvostetuimmista kartanoista, jolla on yli 200 vuoden historia.',
		'location.address': 'Mustio, Raasepori',

		// Blog
		'blog.title': 'Blogi',
		'blog.subtitle': 'Kuulumisia tilalta',
		'blog.readmore': 'Lue lisää',
		'blog.latest': 'Viimeisimmät kirjoitukset',

		// About page
		'about.title': 'Tietoa meistä',
		'about.intro': 'Aurinkopuutarha on tiheäistutteinen omenatarha, joka sijaitsee Mustiossa, Raaseporin kunnassa, Länsi-Uudellamaalla.',
		'about.story.title': 'Tarinamme',
		'about.story.text': 'Aurinkopuutarha syntyi rakkaudesta hedelmänviljelyyn ja halusta tuoda tuoreita, laadukkaita omenoita suoraan suomalaisille kuluttajille. Tilaamme sijaitsee Mustion idyllisessä ympäristössä, aivan historiallisen Mustion Linnan tuntumassa.',
		'about.orchard.title': 'Omenatarhamme',
		'about.orchard.text': 'Käytämme tiheäistutustekniikkaa (high density orchard), joka mahdollistaa tehokkaan ja kestävän omenanviljelyn. Tämä moderni viljelymenetelmä yhdistettynä Etelä-Suomen suotuisaan ilmastoon takaa laadukkaan sadon vuodesta toiseen.',
		'about.contact.title': 'Ota yhteyttä',

		// Footer
		'footer.rights': 'Kaikki oikeudet pidätetään.',
	},
	sv: {
		// Navigation
		'nav.home': 'Hem',
		'nav.about': 'Om oss',
		'nav.blog': 'Blogg',

		// Site
		'site.title': 'Aurinkopuutarha Svartå',
		'site.description': 'Äppelodling i Svartå, Raseborg — äpplen, vindruvor och kärnfrukter intill historiska Svartå Slott.',

		// Hero
		'hero.tagline': 'Äppelodling i hjärtat av Svartå',
		'hero.subtitle': 'Vi odlar äpplen, vindruvor och kärnfrukter i Raseborgs vackra landskap, intill det historiska Svartå Slott.',
		'hero.cta': 'Läs mer',

		// About section (homepage)
		'home.about.title': 'Om gården',
		'home.about.text': 'Aurinkopuutarha är en tätplanterad äppelodling i Svartå, Raseborg. Vår gård ligger i närheten av det historiska Svartå Slott, i Västra Nylands vackra landskap. Vi odlar främst äpplen, men också vindruvor och andra kärnfruktträd.',

		// Products
		'products.title': 'Våra produkter',
		'products.apples.title': 'Äpplen',
		'products.apples.desc': 'Vår huvudprodukt. I vår tätplanterade äppelodling växer flera sorter som passar Finlands klimat.',
		'products.grapes.title': 'Vindruvor',
		'products.grapes.desc': 'Vi odlar vindruvor som trivs i vårt nordliga klimat.',
		'products.pome.title': 'Kärnfrukter',
		'products.pome.desc': 'Utöver äpplen odlar vi också andra kärnfruktträd.',

		// Location
		'location.title': 'Läge',
		'location.text': 'Du hittar vår gård i Svartå, Raseborg. Vi ligger alldeles intill det historiska Svartå Slott — ett av Finlands mest uppskattade herrgårdar med över 200 års historia.',
		'location.address': 'Svartå, Raseborg',

		// Blog
		'blog.title': 'Blogg',
		'blog.subtitle': 'Nyheter från gården',
		'blog.readmore': 'Läs mer',
		'blog.latest': 'Senaste inläggen',

		// About page
		'about.title': 'Om oss',
		'about.intro': 'Aurinkopuutarha är en tätplanterad äppelodling i Svartå, Raseborg, i Västra Nyland.',
		'about.story.title': 'Vår historia',
		'about.story.text': 'Aurinkopuutarha föddes ur en kärlek till fruktodling och en önskan att erbjuda färska, högkvalitativa äpplen direkt till finska konsumenter. Vår gård ligger i Svartås idylliska omgivningar, alldeles intill det historiska Svartå Slott.',
		'about.orchard.title': 'Vår äppelodling',
		'about.orchard.text': 'Vi använder tätplanteringsteknik (high density orchard), som möjliggör effektiv och hållbar äppelodling. Denna moderna odlingsmetod i kombination med Södra Finlands gynnsamma klimat garanterar en kvalitativ skörd år efter år.',
		'about.contact.title': 'Kontakta oss',

		// Footer
		'footer.rights': 'Alla rättigheter förbehållna.',
	},
	en: {
		// Navigation
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.blog': 'Blog',

		// Site
		'site.title': 'Aurinkopuutarha Mustio',
		'site.description': 'Apple orchard in Mustio, Raasepori — apples, grapes and pome fruits next to the historic Svartå Manor.',

		// Hero
		'hero.tagline': 'Apple orchard in the heart of Mustio',
		'hero.subtitle': 'We grow apples, grapes and pome fruits in the beautiful landscape of Raasepori, next to the historic Svartå Manor.',
		'hero.cta': 'Learn more',

		// About section (homepage)
		'home.about.title': 'About the farm',
		'home.about.text': 'Aurinkopuutarha is a high-density apple orchard in Mustio, Raasepori. Our farm is located near the historic Svartå Manor, in the beautiful landscapes of Western Uusimaa. We primarily grow apples, but also grapes and other pome fruit trees.',

		// Products
		'products.title': 'Our products',
		'products.apples.title': 'Apples',
		'products.apples.desc': 'Our main product. Our high-density apple orchard features several varieties well-suited to the Finnish climate.',
		'products.grapes.title': 'Grapes',
		'products.grapes.desc': 'We grow grape varieties that thrive in our northern climate.',
		'products.pome.title': 'Pome fruits',
		'products.pome.desc': 'In addition to apples, we also grow other pome fruit trees.',

		// Location
		'location.title': 'Location',
		'location.text': 'You can find our farm in Mustio, Raasepori. We are located right next to the historic Svartå Manor — one of Finland\'s most treasured manor houses with over 200 years of history.',
		'location.address': 'Mustio, Raasepori',

		// Blog
		'blog.title': 'Blog',
		'blog.subtitle': 'News from the farm',
		'blog.readmore': 'Read more',
		'blog.latest': 'Latest posts',

		// About page
		'about.title': 'About us',
		'about.intro': 'Aurinkopuutarha is a high-density apple orchard located in Mustio, Raasepori, in Western Uusimaa, Finland.',
		'about.story.title': 'Our story',
		'about.story.text': 'Aurinkopuutarha was born from a love of fruit growing and a desire to bring fresh, high-quality apples directly to Finnish consumers. Our farm is situated in the idyllic surroundings of Mustio, right next to the historic Svartå Manor.',
		'about.orchard.title': 'Our orchard',
		'about.orchard.text': 'We use high-density planting techniques, which enable efficient and sustainable apple growing. This modern cultivation method, combined with the favourable climate of Southern Finland, ensures a quality harvest year after year.',
		'about.contact.title': 'Contact us',

		// Footer
		'footer.rights': 'All rights reserved.',
	},
};
