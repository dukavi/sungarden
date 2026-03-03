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
		'contact.name': 'Nimi',
		'contact.email': 'Sähköposti',
		'contact.message': 'Viesti',
		'contact.send': 'Lähetä',
		'contact.thanks': 'Kiitos viestistäsi!',

		// Weather
		'weather.title': 'Sää Mustiossa',
		'weather.subtitle': 'Säähavainnot FMI:n sääasemalta Karjaa Kuusisto.',
		'weather.date': 'Päivämäärä',
		'weather.tmin': 'Min °C',
		'weather.tmax': 'Max °C',
		'weather.rain': 'Sade mm',
		'weather.snow': 'Lumi cm',
		'weather.source': 'Lähde: Ilmatieteen laitos, avoin data.',
		'weather.temp.chart': 'Lämpötila',
		'weather.month': 'Kuukausi',
		'weather.nodata': 'Säätietoja ei ole saatavilla.',
		'weather.sat.title': 'Aktiivisten lämpötilojen summa (SAT)',
		'weather.sat.year': 'Vuosi',
		'weather.sat.sum': 'SAT (>10 °C)',
		'weather.sat.lastfrost': 'Kevään viimeinen halla',
		'weather.sat.firstfrost': 'Syksyn ensimmäinen halla',
		'weather.sat.ongoing': '(käynnissä)',
		'weather.sat.desc': 'SAT on kasvukauden kokonaislämpömäärä: vuorokauden keskilämpötilojen ((min + max) / 2) summa niiltä päiviltä, joina keskilämpötila ylittää +10 °C. Tämä on keskeinen mittari lajikkeiden valinnassa.',
		'weather.sat.grapes': 'Viinirypäleet',
		'weather.sat.grapes.desc': 'Viinirypäleet ovat lämpöä vaativa kasvi. Lajikkeen kypsymisaika määrittää vaadittavan SAT-arvon:',
		'weather.sat.grapes.veryearly': 'Hyvin aikaiset: alle 2500 °C',
		'weather.sat.grapes.early': 'Aikaiset: 2500–2600 °C',
		'weather.sat.grapes.earlymid': 'Aikaiskeskimyöhäiset: 2600–2700 °C',
		'weather.sat.grapes.mid': 'Keskimyöhäiset: 2700–2800 °C',
		'weather.sat.apples': 'Omenat',
		'weather.sat.apples.desc': 'Omenapuut ovat kestävämpiä ja vaativat vähemmän lämpöä. Kesälajikkeet pärjäävät matalammilla SAT-arvoilla, myöhäiset lajikkeet vaativat 2500–2600 °C.',
		'weather.sat.source': 'Tiedot: Ilmatieteen laitos, avoin data.',

		// SAT Map
		'nav.satmap': 'SAT-kartta',
		'satmap.title': 'SAT-kartta Suomesta',
		'satmap.subtitle': 'Aktiivisten lämpötilojen summa (SAT) interpoloituna noin 200 FMI-sääasemalta.',
		'satmap.year': 'Vuosi',
		'satmap.year.hint': 'Valitse vuosi nähdäksesi SAT-arvot kartalla.',
		'satmap.loading': 'Ladataan',
		'satmap.loading.month': 'Ladataan kuukautta',
		'satmap.of': '/',
		'satmap.station': 'Asema',
		'satmap.nodata': 'Tietoja ei ole saatavilla.',
		'satmap.legend.low': 'Matala',
		'satmap.legend.high': 'Korkea',
		'satmap.source': 'Lähde: Ilmatieteen laitos, avoin data. Interpolointi IDW-menetelmällä.',
		'satmap.info.title': 'Mikä on SAT?',
		'satmap.info.desc': 'SAT (Sum of Active Temperatures) on kasvukauden kokonaislämpömäärä: vuorokauden keskilämpötilojen ((min + max) / 2) summa niiltä päiviltä, joina keskilämpötila ylittää +10 °C. Tämä on keskeinen mittari hedelmä- ja viinirypälelajikkeiden valinnassa.',
		'satmap.info.grapes': 'Viinirypäleet',
		'satmap.info.grapes.desc': 'Viinirypäleiden viljely avomaalla on mahdollista vain alueilla, joissa SAT-arvo ylittää 2000 °C. Suomessa tämä rajoittaa ulkoviljelyä maan eteläisimpiin osiin. Lajikkeen kypsymisaika määrittää tarkemman SAT-vaatimuksen:',
		'satmap.info.grapes.ultraearly': 'Erittäin aikaiset: 2000–2200 °C',
		'satmap.info.grapes.veryearly': 'Hyvin aikaiset: 2200–2500 °C',
		'satmap.info.grapes.early': 'Aikaiset: 2500–2600 °C',
		'satmap.info.grapes.earlymid': 'Aikaiskeskimyöhäiset: 2600–2700 °C',
		'satmap.info.grapes.mid': 'Keskimyöhäiset: 2700–2800 °C',
		'satmap.info.apples': 'Omenat',
		'satmap.info.apples.desc': 'Omenapuut ovat kestävämpiä ja vaativat vähemmän lämpöä. Kesälajikkeet pärjäävät matalammilla SAT-arvoilla, myöhäiset lajikkeet vaativat 2500–2600 °C.',

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
		'contact.name': 'Namn',
		'contact.email': 'E-post',
		'contact.message': 'Meddelande',
		'contact.send': 'Skicka',
		'contact.thanks': 'Tack för ditt meddelande!',

		// Weather
		'weather.title': 'Väder i Svartå',
		'weather.subtitle': 'Väderobservationer från FMI-stationen Karis Kuusisto.',
		'weather.date': 'Datum',
		'weather.tmin': 'Min °C',
		'weather.tmax': 'Max °C',
		'weather.rain': 'Regn mm',
		'weather.snow': 'Snö cm',
		'weather.source': 'Källa: Meteorologiska institutet, öppen data.',
		'weather.temp.chart': 'Temperatur',
		'weather.month': 'Månad',
		'weather.nodata': 'Väderdata är inte tillgänglig.',
		'weather.sat.title': 'Summa av aktiva temperaturer (SAT)',
		'weather.sat.year': 'År',
		'weather.sat.sum': 'SAT (>10 °C)',
		'weather.sat.lastfrost': 'Sista vårfrosten',
		'weather.sat.firstfrost': 'Första höstfrosten',
		'weather.sat.ongoing': '(pågående)',
		'weather.sat.desc': 'SAT är den totala värmen under vegetationsperioden: summan av dygnsmedeltemperaturer ((min + max) / 2) för dagar då medeltemperaturen överstiger +10 °C. Detta är ett centralt mått för val av sorter.',
		'weather.sat.grapes': 'Vindruvor',
		'weather.sat.grapes.desc': 'Vindruvor är en värmekrävande gröda. Sortens mognadsperiod avgör det SAT-värde som krävs:',
		'weather.sat.grapes.veryearly': 'Mycket tidiga: under 2500 °C',
		'weather.sat.grapes.early': 'Tidiga: 2500–2600 °C',
		'weather.sat.grapes.earlymid': 'Tidigt medelsena: 2600–2700 °C',
		'weather.sat.grapes.mid': 'Medelsena: 2700–2800 °C',
		'weather.sat.apples': 'Äpplen',
		'weather.sat.apples.desc': 'Äppelträd är härdigare och kräver mindre värme. Sommarsorter klarar sig med lägre SAT-värden, sena sorter kräver 2500–2600 °C.',
		'weather.sat.source': 'Data: Meteorologiska institutet, öppen data.',

		// SAT Map
		'nav.satmap': 'SAT-karta',
		'satmap.title': 'SAT-karta över Finland',
		'satmap.subtitle': 'Summa av aktiva temperaturer (SAT) interpolerad från ca 200 FMI-väderstationer.',
		'satmap.year': 'År',
		'satmap.year.hint': 'Välj ett år för att se SAT-värden på kartan.',
		'satmap.loading': 'Laddar',
		'satmap.loading.month': 'Laddar månad',
		'satmap.of': '/',
		'satmap.station': 'Station',
		'satmap.nodata': 'Data är inte tillgänglig.',
		'satmap.legend.low': 'Låg',
		'satmap.legend.high': 'Hög',
		'satmap.source': 'Källa: Meteorologiska institutet, öppen data. Interpolering med IDW-metoden.',
		'satmap.info.title': 'Vad är SAT?',
		'satmap.info.desc': 'SAT (Sum of Active Temperatures) är den totala värmen under vegetationsperioden: summan av dygnsmedeltemperaturer ((min + max) / 2) för dagar då medeltemperaturen överstiger +10 °C. Detta är ett centralt mått vid val av frukt- och druvsorter.',
		'satmap.info.grapes': 'Vindruvor',
		'satmap.info.grapes.desc': 'Odling av vindruvor utomhus är möjlig endast i områden där SAT-värdet överstiger 2000 °C. I Finland begränsar detta utomhusodling till landets sydligaste delar. Sortens mognadsperiod avgör det exakta SAT-kravet:',
		'satmap.info.grapes.ultraearly': 'Ultratidiga: 2000–2200 °C',
		'satmap.info.grapes.veryearly': 'Mycket tidiga: 2200–2500 °C',
		'satmap.info.grapes.early': 'Tidiga: 2500–2600 °C',
		'satmap.info.grapes.earlymid': 'Tidigt medelsena: 2600–2700 °C',
		'satmap.info.grapes.mid': 'Medelsena: 2700–2800 °C',
		'satmap.info.apples': 'Äpplen',
		'satmap.info.apples.desc': 'Äppelträd är härdigare och kräver mindre värme. Sommarsorter klarar sig med lägre SAT-värden, sena sorter kräver 2500–2600 °C.',

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
		'contact.name': 'Name',
		'contact.email': 'Email',
		'contact.message': 'Message',
		'contact.send': 'Send',
		'contact.thanks': 'Thank you for your message!',

		// Weather
		'weather.title': 'Weather in Mustio',
		'weather.subtitle': 'Weather observations from FMI station Karjaa Kuusisto.',
		'weather.date': 'Date',
		'weather.tmin': 'Min °C',
		'weather.tmax': 'Max °C',
		'weather.rain': 'Rain mm',
		'weather.snow': 'Snow cm',
		'weather.source': 'Source: Finnish Meteorological Institute, open data.',
		'weather.temp.chart': 'Temperature',
		'weather.month': 'Month',
		'weather.nodata': 'Weather data is not available.',
		'weather.sat.title': 'Sum of Active Temperatures (SAT)',
		'weather.sat.year': 'Year',
		'weather.sat.sum': 'SAT (>10 °C)',
		'weather.sat.lastfrost': 'Last spring frost',
		'weather.sat.firstfrost': 'First autumn frost',
		'weather.sat.ongoing': '(ongoing)',
		'weather.sat.desc': 'SAT is the total heat accumulated during the growing season: the sum of daily mean temperatures ((min + max) / 2) for days when the mean exceeds +10 °C. This is a key metric for variety selection.',
		'weather.sat.grapes': 'Grapes',
		'weather.sat.grapes.desc': 'Grapes are a heat-demanding crop. The ripening period of a variety determines the required SAT:',
		'weather.sat.grapes.veryearly': 'Very early: below 2500 °C',
		'weather.sat.grapes.early': 'Early: 2500–2600 °C',
		'weather.sat.grapes.earlymid': 'Early-mid: 2600–2700 °C',
		'weather.sat.grapes.mid': 'Mid-season: 2700–2800 °C',
		'weather.sat.apples': 'Apples',
		'weather.sat.apples.desc': 'Apple trees are hardier and require less heat. Summer varieties manage with lower SAT values, while late varieties need 2500–2600 °C.',
		'weather.sat.source': 'Data: Finnish Meteorological Institute, open data.',

		// SAT Map
		'nav.satmap': 'SAT Map',
		'satmap.title': 'SAT Map of Finland',
		'satmap.subtitle': 'Sum of Active Temperatures (SAT) interpolated from ~200 FMI weather stations.',
		'satmap.year': 'Year',
		'satmap.year.hint': 'Select a year to see SAT values on the map.',
		'satmap.loading': 'Loading',
		'satmap.loading.month': 'Loading month',
		'satmap.of': '/',
		'satmap.station': 'Station',
		'satmap.nodata': 'Data is not available.',
		'satmap.legend.low': 'Low',
		'satmap.legend.high': 'High',
		'satmap.source': 'Source: Finnish Meteorological Institute, open data. Interpolation using IDW method.',
		'satmap.info.title': 'What is SAT?',
		'satmap.info.desc': 'SAT (Sum of Active Temperatures) is the total heat accumulated during the growing season: the sum of daily mean temperatures ((min + max) / 2) for days when the mean exceeds +10 °C. This is a key metric for selecting fruit and grape varieties.',
		'satmap.info.grapes': 'Grapes',
		'satmap.info.grapes.desc': 'Outdoor grape growing is only possible in areas where the SAT value exceeds 2000 °C. In Finland, this limits outdoor cultivation to the southernmost parts of the country. The ripening period of a variety determines the exact SAT requirement:',
		'satmap.info.grapes.ultraearly': 'Ultra-early: 2000–2200 °C',
		'satmap.info.grapes.veryearly': 'Very early: 2200–2500 °C',
		'satmap.info.grapes.early': 'Early: 2500–2600 °C',
		'satmap.info.grapes.earlymid': 'Early-mid: 2600–2700 °C',
		'satmap.info.grapes.mid': 'Mid-season: 2700–2800 °C',
		'satmap.info.apples': 'Apples',
		'satmap.info.apples.desc': 'Apple trees are hardier and require less heat. Summer varieties manage with lower SAT values, while late varieties need 2500–2600 °C.',

		// Footer
		'footer.rights': 'All rights reserved.',
	},
};
