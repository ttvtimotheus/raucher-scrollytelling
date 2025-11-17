export interface AdPosterData {
  id: string;
  image: string;
  year: string;
  brand: string;
  technique: string;
  impact: string;
}

export interface DecadeAdvertising {
  decade: string;
  learningPoints: string[];
  posters: AdPosterData[];
}

export const advertisingData: Record<string, DecadeAdvertising> = {
  '1950': {
    decade: '1950er',
    learningPoints: [
      'Ärzte als Werbeträger: "9 von 10 Ärzten empfehlen..." - Autorität wurde missbraucht, um Vertrauen zu schaffen',
      'Gesundheits-Claims: Zigaretten wurden als "gesund für die Kehle" beworben - eine dreiste Lüge',
      'Geschlechterrollen: Männer rauchten für Männlichkeit, Frauen für Emanzipation - beides war konstruiert',
      'Celebrity Endorsements: Stars und Sportler wurden bezahlt, um das Produkt cool zu machen',
    ],
    posters: [
      {
        id: '1950-1',
        image: '/images/ads/1950-1.jpg',
        year: '1950',
        brand: 'Pall Mall',
        technique: 'Superlativ-Marketing: "OUTSTANDING"',
        impact: 'Qualitätsversprechen durch absolute Behauptungen',
      },
      {
        id: '1950-2',
        image: '/images/ads/1950-2.jpg',
        year: '1952',
        brand: 'Lucky Strike',
        technique: 'Glücksversprechen + Celebrity (Cheerleader)',
        impact: 'Rauchen = Fröhlichkeit, Jugend, Lebensfreude',
      },
      {
        id: '1950-3',
        image: '/images/ads/1950-3.jpg',
        year: '1955',
        brand: 'Chesterfield',
        technique: 'Celebrity Testimonial (Joan Caulfield) + "Milder"',
        impact: 'Glamour durch Hollywood-Stars, Vertrauenswerbung',
      },
    ],
  },

  '1970': {
    decade: '1970er',
    learningPoints: [
      'Lifestyle-Marketing: Nicht das Produkt, sondern ein Lebensgefühl wurde verkauft',
      'Rebellion als Marke: "You\'ve come a long way, baby" - Feminismus wurde kommerzialisiert',
      'Coolness-Faktor: Zigaretten = erwachsen, unabhängig, erfolgreich',
      'Zielgruppen-Segmentierung: Verschiedene Marken für verschiedene Identitäten',
    ],
    posters: [
      {
        id: '1970-1',
        image: '/images/ads/1970-1.jpg',
        year: '1970',
        brand: 'Chesterfield',
        technique: 'Sport-Hero Marketing (Jackie Robinson)',
        impact: 'Rassenbarrieren brechen für Profitmaximierung',
      },
      {
        id: '1970-2',
        image: '/images/ads/1970-2.jpg',
        year: '1975',
        brand: 'Newport',
        technique: 'Maskuline Arbeitswelt ("Men of the Sea")',
        impact: 'Mentholzigaretten als Männer-Produkt etablieren',
      },
      {
        id: '1970-3',
        image: '/images/ads/1970-3.jpg',
        year: '1978',
        brand: 'Winston',
        technique: 'Individualismus ("I know my taste")',
        impact: 'Rauchen als Ausdruck persönlicher Freiheit',
      },
    ],
  },

  '1990': {
    decade: '1990er',
    learningPoints: [
      'Cartoon-Marketing: Joe Camel war bewusst für Kinder designed - trotz Dementis',
      'Subkultur-Targeting: Grunge, Hip-Hop, Rave - jede Szene bekam ihre Zigarette',
      'Event-Sponsoring: Festivals, Konzerte, Sportevents - überall präsent',
      'Product Placement: In Filmen, Videospielen, Musikvideos - versteckte Werbung',
    ],
    posters: [
      {
        id: '1990-1',
        image: '/images/ads/1990-1.jpg',
        year: '1990',
        brand: 'Camel',
        technique: 'Cartoon-Sophistication (Joe Camel im Smoking)',
        impact: 'Kindgerechte Figur verkauft "Erwachsensein"',
      },
      {
        id: '1990-2',
        image: '/images/ads/1990-2.jpg',
        year: '1994',
        brand: 'Marlboro',
        technique: 'Grunge/Punk-Ästhetik + Rebellentum',
        impact: 'Tattoos, Lederjacke = authentische Rebellion (fake)',
      },
      {
        id: '1990-3',
        image: '/images/ads/1990-3.jpg',
        year: '1998',
        brand: 'Marlboro',
        technique: 'Lifestyle-Packaging ("Weekender")',
        impact: 'Klassischer Cowboy trifft moderne Freizeit',
      },
    ],
  },

  '2000': {
    decade: '2000er',
    learningPoints: [
      'Influencer-Marketing (frühe Form): Club-Promoter und "Markenbotschafter" in Bars',
      'Packaging als Werbung: Sleeke Designs, Limited Editions, Sammelobjekte',
      'Viral Marketing: Online-Kampagnen, die nicht als Werbung erkennbar waren',
      'Point-of-Sale: Zigarettenautomaten strategisch platziert',
    ],
    posters: [
      {
        id: '2000-1',
        image: '/images/ads/2000-1.jpg',
        year: '2002',
        brand: 'Camel',
        technique: 'Provokation ("Pleasure to Burn") + Ironie',
        impact: 'Selbstironische Warnung wird zum Verkaufsargument',
      },
      {
        id: '2000-2',
        image: '/images/ads/2000-2.jpg',
        year: '2005',
        brand: 'blu E-Cigarettes',
        technique: 'Celebrity (Stephen Dorff) + Tech-Innovation',
        impact: '"Rise from the Ashes" - E-Zigaretten als Lösung',
      },
      {
        id: '2000-3',
        image: '/images/ads/2000-3.jpg',
        year: '2008',
        brand: 'Davidoff',
        technique: 'Geschenk-Ästhetik ("Life is Rich")',
        impact: 'Luxus-Packaging macht Sucht zum Premium-Erlebnis',
      },
    ],
  },
};
