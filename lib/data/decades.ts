export interface DecadeSection {
	id: string;
	decade: string;
	title: string;
	subtitle: string;
	narrative: string[];
	chartExplainer: string;
	chartType: '1950' | '1970' | '1980' | '1990' | '2000' | '2010' | 'world';
	videoSlug?: string;
	hasLottie?: boolean;
	lottieFile?: string;
}

export const decades: DecadeSection[] = [
	{
		id: 'decade-1950',
		decade: '1950er',
		title: 'Freiheit verkauft sich',
		subtitle: 'Der Beginn einer Ära',
		narrative: [
			'In den Fünfzigern explodiert der Zigarettenkonsum. Werbung verspricht Männlichkeit, Freiheit, Abenteuer.',
			'Die Tabakindustrie investiert Millionen. Stars rauchen in Filmen. Ärzte empfehlen Marken.',
			'Der Konsum steigt rasant. Die gesundheitlichen Folgen sind längst bekannt, aber werden verschwiegen.'
		],
		chartExplainer:
			'Das siehst du hier. Der Konsum steigt sehr schnell. Die Todesfälle folgen mit Verzögerung. Werbung wirkt sofort. Krankheiten brauchen Zeit.',
		chartType: '1950',
		videoSlug: 'cowboy_loop'
	},
	{
		id: 'decade-1970',
		decade: '1960 bis 1970',
		title: 'Das Normale',
		subtitle: 'Rauchen als Alltagskultur',
		narrative: [
			'Sieben von zehn Erwachsenen rauchen. In Zügen, Restaurants, Büros, Klassenzimmern.',
			'Es ist so selbstverständlich wie Kaffee trinken. Lehrer rauchen zwischen den Stunden. Ärzte im Krankenhaus.',
			'Niemand fragt nach Erlaubnis. Das Rauchen gehört zum Leben.'
		],
		chartExplainer:
			'Hier siehst du den Anteil rauchender Erwachsener. Sieben von zehn. Lehrer, Ärzte, Politiker. Das war Alltagskultur.',
		chartType: '1970'
	},
	{
		id: 'decade-1980',
		decade: '1980er',
		title: 'Emanzipation in Pastell',
		subtitle: 'Die Zigarette als Statement',
		narrative: [
			'Die Tabakindustrie entdeckt Frauen als Zielgruppe. Schlank, unabhängig, modern.',
			'Virginia Slims wirbt mit Emanzipation. Die Zigarette wird zum Symbol für Selbstbestimmung.',
			'Der Anteil rauchender Frauen steigt deutlich. Was als Freiheit verkauft wird, schafft neue Abhängigkeit.'
		],
		chartExplainer:
			'Die Fläche zeigt den wachsenden Anteil von Raucherinnen. Die Kampagnen verkauften Selbstbestimmung. Gekauft wurde Abhängigkeit.',
		chartType: '1980',
		hasLottie: true,
		lottieFile: 'lipstick_to_glow'
	},
	{
		id: 'decade-1990',
		decade: '1990er',
		title: 'Rebellion im Mainstream',
		subtitle: 'Cool sein kostet',
		narrative: [
			'MTV, Grunge, Clubkultur. Die Neunziger machen Rauchen wieder jung.',
			'Camel sponsert Events. Marlboro ist überall. In Videoclips, auf Festivals, in Magazinen.',
			'Jugendliche greifen zur Zigarette. Die Rauchquote unter Teenagern steigt über dreißig Prozent.'
		],
		chartExplainer:
			'Die Linie steigt in den Neunzigern. Popkultur, Filme, Sponsoring. Rebellion wurde ein Produkt.',
		chartType: '1990',
		videoSlug: 'mtv_90s'
	},
	{
		id: 'decade-2000',
		decade: '2000er',
		title: 'Das Schweigen',
		subtitle: 'Verbote und ihre Grenzen',
		narrative: [
			'Werbeverbote treten in Kraft. Rauchverbote in Restaurants und Bars. Leere Plakatwände.',
			'Die Ausgaben für Tabakwerbung sinken drastisch. Aber die Rauchquote bleibt hartnäckig hoch.',
			'Jahrzehnte der Konditionierung wirken nach. Die Bilder im Kopf sind langlebiger als Gesetze.'
		],
		chartExplainer:
			'Hier fällt die Werbung stark. Die Rauchquote bleibt. Bilder im Kopf sind langlebig.',
		chartType: '2000'
	},
	{
		id: 'decade-2010',
		decade: '2010er',
		title: 'Wiedergeburt aus Plastik',
		subtitle: 'Alte Sucht, neue Hülle',
		narrative: [
			'E-Zigaretten und Vapes erobern den Markt. Bunt, süß, scheinbar harmlos.',
			'Influencer dampfen auf Instagram. TikTok zeigt bunte Wolken. Die Industrie spricht von Schadensbegrenzung.',
			'Jugendliche steigen um oder steigen ein. Der Nikotinkonsum bei jungen Menschen steigt wieder.'
		],
		chartExplainer:
			'Die Balken steigen. Vapes ersetzen Zigaretten. Nikotin bleibt. Die Verpackung wird hübscher.',
		chartType: '2010',
		videoSlug: 'tiktok_vapes'
	},
	{
		id: 'decade-world',
		decade: '2020er',
		title: 'Der Preis',
		subtitle: 'Eine globale Bilanz',
		narrative: [
			'Acht Millionen Menschen sterben jährlich an den Folgen des Tabakkonsums.',
			'Seit den Fünfzigern sind mehr Menschen durch Tabak gestorben als in allen Kriegen des zwanzigsten Jahrhunderts zusammen.',
			'Das ist die Bilanz eines Produkts, das nie verboten wurde.'
		],
		chartExplainer:
			'Jeder Punkt steht für viele Menschenleben pro Jahr. Seit den Fünfzigern starben mehr Menschen durch Tabak als in vielen Kriegen. Das ist die Bilanz eines Produkts.',
		chartType: 'world'
	}
];
