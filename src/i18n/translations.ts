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
		'site.title': 'Aurinkotarha Mustio',
		'site.description': 'Moderni omenatarha Mustiossa, Raaseporissa. Kaksi hehtaaria tarkasti viljeltyjä omenoita, päärynöitä ja viinirypäleitä historiallisen Mustion Linnan naapurissa.',

		// Hero
		'hero.tagline': 'Tarkasti viljeltyä, auringossa kypsytettyä',
		'hero.subtitle': 'Moderni omenatarha Mustion kylässä, Raaseporissa. Perustettu 2024.',
		'hero.cta': 'Tutustu tilaan',

		// About section (homepage)
		'home.about.title': 'Tila',
		'home.about.text': 'Kaksi hehtaaria maata Mustion kylässä, viljelty tarkasti ja huolella. Käytämme moderneja intensiiviviljelymenetelmiä — kääpiöperusrunkoja, tiheää istutusta, tippukastelua ja fertigaatiota. Jokainen puu muotoillaan kapeaksi 2D-latvukseksi, jotta auringonvalo tavoittaa jokaisen hedelmän.',

		// Products
		'products.title': 'Tuotteemme',
		'products.apples.title': 'Omenat',
		'products.apples.desc': 'Päätuotteemme. Tiheäistutteisessa tarhassamme kasvaa useita lajikkeita kääpiöperusrungoilla.',
		'products.grapes.title': 'Viinirypäleet',
		'products.grapes.desc': 'Koeistutuksia viinirypäleistä, jotka menestyvät pohjoisessa ilmastossa.',
		'products.pome.title': 'Päärynät ja luumut',
		'products.pome.desc': 'Kokeilemme eri päärynälajikkeita, perusrunkoja ja muotoilutapoja sekä luumuja ja kriikunoita.',

		// Location
		'location.title': 'Sijainti',
		'location.text': 'Tilaamme löydät Mustiosta, Raaseporin kunnasta — historiallisen Mustion Linnan naapurista, Länsi-Uudenmaan kauniista maisemista.',
		'location.address': 'Mustio, Raasepori',

		// Blog
		'blog.title': 'Blogi',
		'blog.subtitle': 'Kuulumisia tilalta',
		'blog.readmore': 'Lue lisää',
		'blog.latest': 'Viimeisimmät kirjoitukset',

		// About page
		'about.title': 'Tietoa meistä',
		'about.intro': 'Moderni omenatarha Mustion kylässä, perustettu 2024. Kaksi hehtaaria tarkasti viljeltyä maata Raaseporissa.',
		'about.story.title': 'Tarinamme',
		'about.story.text': 'Aurinkotarha syntyi rakkaudesta hedelmänviljelyyn ja uskosta siihen, että modernit menetelmät ja pohjoiset olosuhteet tuottavat poikkeuksellisia hedelmiä. Tilamme sijaitsee Mustion idyllisessä ympäristössä, aivan historiallisen Mustion Linnan tuntumassa.',
		'about.orchard.title': 'Omenatarhamme',
		'about.orchard.text': 'Käytämme moderneja intensiiviviljelymenetelmiä: kääpiöperusrunkoja, tiheää istutusta jopa 50 cm välein, tippukastelua, fertigaatiota sekä kevät- ja kesäleikkausta. Jokainen puu muotoillaan kapeaksi 2D-latvukseksi, enintään 40 cm leveäksi, jotta auringonvalo tavoittaa jokaisen hedelmän — näin omenamme saavuttavat täyden makunsa ja syvimmän värinsä. Tämä lähestymistapa vähentää luonnostaan myös kasvinsuojelun tarvetta. Omenoiden lisäksi kokeilemme päärynä-, luumu- ja kriikunalajikkeita sekä ylläpidämme viinirypäleiden koeistutuksia.',
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
		'site.title': 'Aurinkotarha Svartå',
		'site.description': 'Modern äppelodling i Svartå, Raseborg. Två hektar noggrant odlade äpplen, päron och vindruvor intill det historiska Svartå Slott.',

		// Hero
		'hero.tagline': 'Noggrant odlat, solmognat',
		'hero.subtitle': 'Modern äppelodling i byn Svartå, Raseborg. Grundad 2024.',
		'hero.cta': 'Utforska gården',

		// About section (homepage)
		'home.about.title': 'Gården',
		'home.about.text': 'Två hektar mark i byn Svartå, odlad med precision och omsorg. Vi använder moderna intensiva metoder — dvärggrundstammar, tät plantering, droppbevattning och fertigering. Varje träd formas till en smal 2D-krona, så att solljuset når varje frukt.',

		// Products
		'products.title': 'Våra produkter',
		'products.apples.title': 'Äpplen',
		'products.apples.desc': 'Vår huvudprodukt. I vår tätplanterade odling växer flera sorter på dvärggrundstammar.',
		'products.grapes.title': 'Vindruvor',
		'products.grapes.desc': 'Provplanteringar av vindruvor som trivs i nordligt klimat.',
		'products.pome.title': 'Päron och plommon',
		'products.pome.desc': 'Vi experimenterar med päronsorter, grundstammar och uppbyggnadssystem samt plommon och körsbärsplommon.',

		// Location
		'location.title': 'Läge',
		'location.text': 'Vår gård ligger i Svartå, Raseborg — intill det historiska Svartå Slott, i Västra Nylands vackra landskap.',
		'location.address': 'Svartå, Raseborg',

		// Blog
		'blog.title': 'Blogg',
		'blog.subtitle': 'Nyheter från gården',
		'blog.readmore': 'Läs mer',
		'blog.latest': 'Senaste inläggen',

		// About page
		'about.title': 'Om oss',
		'about.intro': 'Modern äppelodling i byn Svartå, grundad 2024. Två hektar noggrant odlad mark i Raseborg.',
		'about.story.title': 'Vår historia',
		'about.story.text': 'Aurinkotarha föddes ur en kärlek till fruktodling och en övertygelse om att moderna metoder och nordiska förhållanden ger exceptionell frukt. Vår gård ligger i Svartås idylliska omgivningar, alldeles intill det historiska Svartå Slott.',
		'about.orchard.title': 'Vår äppelodling',
		'about.orchard.text': 'Vi använder moderna intensiva metoder: dvärggrundstammar, tät plantering med så lite som 50 cm mellanrum, droppbevattning, fertigering samt vår- och sommarbeskärning. Varje träd formas till en smal 2D-krona, högst 40 cm bred, så att solljuset når varje frukt — och ger våra äpplen deras fulla smak och djupaste färg. Denna metod minskar naturligt även behovet av växtskydd. Utöver äpplen experimenterar vi med päron-, plommon- och körsbärsplommonsorter samt har provplanteringar av vindruvor.',
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
		'site.title': 'Aurinkotarha Mustio',
		'site.description': 'A modern apple orchard in Mustio, Raasepori. Two hectares of precisely cultivated apples, pears and grapes next to the historic Svartå Manor.',

		// Hero
		'hero.tagline': 'Precisely grown, sun-ripened',
		'hero.subtitle': 'A modern apple orchard in the village of Mustio, Raasepori. Founded 2024.',
		'hero.cta': 'Explore the farm',

		// About section (homepage)
		'home.about.title': 'The farm',
		'home.about.text': 'Two hectares of land in the village of Mustio, cultivated with precision and care. We use modern intensive methods — dwarf rootstocks, high-density planting, drip irrigation and fertigation. Each tree is trained into a narrow 2D canopy, so that sunlight reaches every fruit.',

		// Products
		'products.title': 'Our products',
		'products.apples.title': 'Apples',
		'products.apples.desc': 'Our main product. Our high-density orchard features several varieties on dwarf rootstocks.',
		'products.grapes.title': 'Grapes',
		'products.grapes.desc': 'Trial plantings of grape varieties that thrive in a northern climate.',
		'products.pome.title': 'Pears and plums',
		'products.pome.desc': 'We experiment with pear varieties, rootstocks and training systems, as well as plum and cherry plum.',

		// Location
		'location.title': 'Location',
		'location.text': 'Our farm lies in Mustio, Raasepori — next to the historic Svartå Manor, in the beautiful landscape of Western Uusimaa.',
		'location.address': 'Mustio, Raasepori',

		// Blog
		'blog.title': 'Blog',
		'blog.subtitle': 'News from the farm',
		'blog.readmore': 'Read more',
		'blog.latest': 'Latest posts',

		// About page
		'about.title': 'About us',
		'about.intro': 'A modern apple orchard in the village of Mustio, founded 2024. Two hectares of precisely cultivated land in Raasepori.',
		'about.story.title': 'Our story',
		'about.story.text': 'Aurinkotarha was born from a love of fruit growing and a belief that modern methods and northern conditions produce exceptional fruit. Our farm is situated in the idyllic surroundings of Mustio, right next to the historic Svartå Manor.',
		'about.orchard.title': 'Our orchard',
		'about.orchard.text': 'We use modern intensive methods: dwarf rootstocks, high-density planting as close as 50 cm apart, drip irrigation, fertigation, and careful spring and summer pruning. Each tree is trained into a narrow 2D canopy, no wider than 40 cm, so that sunlight reaches every fruit — giving our apples their fullest flavour and deepest colour. This approach also naturally reduces the need for crop protection. Beyond apples, we experiment with pear, plum and cherry plum varieties, and maintain trial plantings of grape.',
		'about.contact.title': 'Contact us',

		// Footer
		'footer.rights': 'All rights reserved.',
	},
};
