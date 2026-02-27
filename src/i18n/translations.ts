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
		'nav.weather': 'Sää',

		// Site
		'site.title': 'Aurinkotarha Mustio',
		'site.description': 'Omenatarha Mustion kylässä, Raaseporissa. Omenoita, päärynöitä ja marjoja Mustion Linnan naapurissa.',

		// Hero
		'hero.tagline': 'Omenatarha Mustion kylässä',
		'hero.subtitle': 'Viljelemme pääasiassa omenoita sekä kokeilemme viinirypäleitä, päärynöitä ja luumuja Raaseporin maisemissa, Mustion Linnan naapurissa.',
		'hero.cta': 'Tutustu tilaan',

		// About section (homepage)
		'home.about.title': 'Tila Mustiossa',
		'home.about.text': 'Tilamme sijaitsee Mustion kylässä, Raaseporin kauniissa maisemissa — aivan historiallisen Mustion Linnan naapurissa. Viljelemme kahta hehtaaria omenoita, päärynöitä ja marjoja modernein menetelmin.',

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
		'location.text': 'Tilaamme löydät Mustiosta, Raaseporin kunnasta — historiallisen Mustion Linnan naapurista, Länsi-Uudenmaan kauniista maisemista. Noin tunnin ajomatka Helsingistä.',
		'location.address': 'Trycksbackavägen 24, 10360 Mustio',

		// Blog
		'blog.title': 'Blogi',
		'blog.subtitle': 'Kuulumisia tilalta',
		'blog.readmore': 'Lue lisää',
		'blog.latest': 'Viimeisimmät kirjoitukset',
		'blog.back': 'Takaisin blogiin',
		'blog.updated': 'Päivitetty',

		// About page
		'about.title': 'Tietoa meistä',
		'about.intro': 'Moderni omenatarha Mustion kylässä, perustettu 2024. Kaksi hehtaaria tarkasti viljeltyä maata Raaseporissa.',
		'about.story.title': 'Tarinamme',
		'about.story.text': 'Aurinkotarha syntyi rakkaudesta hedelmänviljelyyn ja uskosta siihen, että modernit menetelmät ja pohjoiset olosuhteet tuottavat poikkeuksellisia hedelmiä. Tilamme sijaitsee Mustion idyllisessä ympäristössä, aivan historiallisen Mustion Linnan tuntumassa.',
		'about.orchard.title': 'Omenatarhamme',
		'about.orchard.text': 'Käytämme moderneja intensiiviviljelymenetelmiä: kääpiöperusrunkoja, tiheää istutusta jopa 50 cm välein, tippukastelua, fertigaatiota sekä kevät- ja kesäleikkausta. Jokainen puu muotoillaan kapeaksi 2D-latvukseksi, enintään 40 cm leveäksi, jotta auringonvalo tavoittaa jokaisen hedelmän — näin omenamme saavuttavat täyden makunsa ja syvimmän värinsä. Tämä lähestymistapa vähentää luonnostaan myös kasvinsuojelun tarvetta. Omenoiden lisäksi kokeilemme päärynä-, luumu- ja kriikunalajikkeita sekä ylläpidämme viinirypäleiden koeistutuksia.',
		'about.contact.title': 'Ota yhteyttä',

		// Weather
		'weather.title': 'Sää Mustiossa',
		'weather.subtitle': 'Säähavainnot FMI:n sääasemalta Karjaa Kuusisto.',
		'weather.date': 'Päivämäärä',
		'weather.tmin': 'Min °C',
		'weather.tmax': 'Max °C',
		'weather.snow': 'Lumi cm',
		'weather.source': 'Lähde: Ilmatieteen laitos, avoin data.',
		'weather.temp.chart': 'Lämpötila',
		'weather.month': 'Kuukausi',
		'weather.nodata': 'Säätietoja ei ole saatavilla.',

		// Footer
		'footer.rights': 'Kaikki oikeudet pidätetään.',
	},
	sv: {
		// Navigation
		'nav.home': 'Hem',
		'nav.about': 'Om oss',
		'nav.blog': 'Blogg',
		'nav.weather': 'Väder',

		// Site
		'site.title': 'Aurinkotarha Svartå',
		'site.description': 'Äppelodling i byn Svartå, Raseborg. Äpplen, päron och bär intill Svartå Slott.',

		// Hero
		'hero.tagline': 'Äppelodling i byn Svartå',
		'hero.subtitle': 'Vi odlar främst äpplen, med provplanteringar av vindruvor, päron och plommon i Raseborgs landskap, intill Svartå Slott.',
		'hero.cta': 'Utforska gården',

		// About section (homepage)
		'home.about.title': 'Gården i Svartå',
		'home.about.text': 'Vår gård ligger i byn Svartå, i Raseborgs vackra landskap — alldeles intill det historiska Svartå Slott. Vi odlar två hektar äpplen, päron och bär med moderna metoder.',

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
		'location.text': 'Vår gård ligger i Svartå, Raseborg — intill det historiska Svartå Slott, i Västra Nylands vackra landskap. Cirka en timmes körväg från Helsingfors.',
		'location.address': 'Trycksbackavägen 24, 10360 Svartå',

		// Blog
		'blog.title': 'Blogg',
		'blog.subtitle': 'Nyheter från gården',
		'blog.readmore': 'Läs mer',
		'blog.latest': 'Senaste inläggen',
		'blog.back': 'Tillbaka till bloggen',
		'blog.updated': 'Uppdaterad',

		// About page
		'about.title': 'Om oss',
		'about.intro': 'Modern äppelodling i byn Svartå, grundad 2024. Två hektar noggrant odlad mark i Raseborg.',
		'about.story.title': 'Vår historia',
		'about.story.text': 'Aurinkotarha föddes ur en kärlek till fruktodling och en övertygelse om att moderna metoder och nordiska förhållanden ger exceptionell frukt. Vår gård ligger i Svartås idylliska omgivningar, alldeles intill det historiska Svartå Slott.',
		'about.orchard.title': 'Vår äppelodling',
		'about.orchard.text': 'Vi använder moderna intensiva metoder: dvärggrundstammar, tät plantering med så lite som 50 cm mellanrum, droppbevattning, fertigering samt vår- och sommarbeskärning. Varje träd formas till en smal 2D-krona, högst 40 cm bred, så att solljuset når varje frukt — och ger våra äpplen deras fulla smak och djupaste färg. Denna metod minskar naturligt även behovet av växtskydd. Utöver äpplen experimenterar vi med päron-, plommon- och körsbärsplommonsorter samt har provplanteringar av vindruvor.',
		'about.contact.title': 'Kontakta oss',

		// Weather
		'weather.title': 'Väder i Svartå',
		'weather.subtitle': 'Väderobservationer från FMI-stationen Karis Kuusisto.',
		'weather.date': 'Datum',
		'weather.tmin': 'Min °C',
		'weather.tmax': 'Max °C',
		'weather.snow': 'Snö cm',
		'weather.source': 'Källa: Meteorologiska institutet, öppen data.',
		'weather.temp.chart': 'Temperatur',
		'weather.month': 'Månad',
		'weather.nodata': 'Väderdata är inte tillgänglig.',

		// Footer
		'footer.rights': 'Alla rättigheter förbehållna.',
	},
	en: {
		// Navigation
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.blog': 'Blog',
		'nav.weather': 'Weather',

		// Site
		'site.title': 'Aurinkotarha Mustio',
		'site.description': 'Apple orchard in the village of Mustio, Raasepori. Apples, pears and berries next to the historic Svartå Manor.',

		// Hero
		'hero.tagline': 'Apple orchard in the village of Mustio',
		'hero.subtitle': 'We grow mainly apples, with trial plantings of grapes, pears and plums in the Raasepori countryside, next to the historic Svartå Manor.',
		'hero.cta': 'Explore the farm',

		// About section (homepage)
		'home.about.title': 'The farm in Mustio',
		'home.about.text': 'Our farm is located in the village of Mustio, in the beautiful Raasepori countryside — right next to the historic Svartå Manor. We grow two hectares of apples, pears and berries using modern methods.',

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
		'location.text': 'Our farm lies in Mustio, Raasepori — next to the historic Svartå Manor, in the beautiful landscape of Western Uusimaa. About an hour\'s drive from Helsinki.',
		'location.address': 'Trycksbackavägen 24, 10360 Svartå',

		// Blog
		'blog.title': 'Blog',
		'blog.subtitle': 'News from the farm',
		'blog.readmore': 'Read more',
		'blog.latest': 'Latest posts',
		'blog.back': 'Back to blog',
		'blog.updated': 'Updated',

		// About page
		'about.title': 'About us',
		'about.intro': 'A modern apple orchard in the village of Mustio, founded 2024. Two hectares of precisely cultivated land in Raasepori.',
		'about.story.title': 'Our story',
		'about.story.text': 'Aurinkotarha was born from a love of fruit growing and a belief that modern methods and northern conditions produce exceptional fruit. Our farm is situated in the idyllic surroundings of Mustio, right next to the historic Svartå Manor.',
		'about.orchard.title': 'Our orchard',
		'about.orchard.text': 'We use modern intensive methods: dwarf rootstocks, high-density planting as close as 50 cm apart, drip irrigation, fertigation, and careful spring and summer pruning. Each tree is trained into a narrow 2D canopy, no wider than 40 cm, so that sunlight reaches every fruit — giving our apples their fullest flavour and deepest colour. This approach also naturally reduces the need for crop protection. Beyond apples, we experiment with pear, plum and cherry plum varieties, and maintain trial plantings of grape.',
		'about.contact.title': 'Contact us',

		// Weather
		'weather.title': 'Weather in Mustio',
		'weather.subtitle': 'Weather observations from FMI station Karjaa Kuusisto.',
		'weather.date': 'Date',
		'weather.tmin': 'Min °C',
		'weather.tmax': 'Max °C',
		'weather.snow': 'Snow cm',
		'weather.source': 'Source: Finnish Meteorological Institute, open data.',
		'weather.temp.chart': 'Temperature',
		'weather.month': 'Month',
		'weather.nodata': 'Weather data is not available.',

		// Footer
		'footer.rights': 'All rights reserved.',
	},
};
