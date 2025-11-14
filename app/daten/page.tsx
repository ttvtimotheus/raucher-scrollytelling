import type { Metadata } from 'next';
import Link from 'next/link';

import { decades } from '@/lib/data/decades';

export const metadata: Metadata = {
  title: 'Daten und Methodik | Wie du zum Raucher wurdest',
  description: 'Datenquellen und Methodik der Scrollytelling-Erfahrung über Tabakwerbung.',
};

export default function DatenPage() {
  return (
    <main className="data-page min-h-screen bg-bg-dark px-8 py-16 text-text-primary">
      <div className="container-narrow">
        <header className="mb-12">
          <Link href="/" className="mb-4 inline-block text-text-secondary transition hover:text-accent">
            ← Zurück zur Geschichte
          </Link>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold">Daten und Methodik</h1>
        </header>

        <section className="intro mb-16">
          <p className="text-lg leading-relaxed text-neutral-300">
            Diese Scrollytelling-Erfahrung basiert auf historischen Daten über Tabakkonsum, Werbung und
            gesundheitliche Auswirkungen von den 1950er Jahren bis heute.
          </p>
        </section>

        <section className="methodology mb-16">
          <h2 className="mb-6 mt-12 text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-accent-subtle">Datenquellen</h2>
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">Die verwendeten Daten stammen aus folgenden Quellen:</p>
          <ul className="space-y-4">
            <li className="relative pl-8 text-lg leading-relaxed text-neutral-300 before:absolute before:left-0 before:text-accent before:content-['→']">
              <strong>WHO Tobacco Control Database:</strong> Weltweite Statistiken zu Tabakkonsum und
              tabakbedingten Todesfällen
            </li>
            <li className="relative pl-8 text-lg leading-relaxed text-neutral-300 before:absolute before:left-0 before:text-accent before:content-['→']">
              <strong>OECD Health Statistics:</strong> Langzeitdaten zum Zigarettenkonsum in Industrieländern
            </li>
            <li className="relative pl-8 text-lg leading-relaxed text-neutral-300 before:absolute before:left-0 before:text-accent before:content-['→']">
              <strong>US Surgeon General Reports:</strong> Historische Berichte zu gesundheitlichen Auswirkungen
              des Rauchens
            </li>
            <li className="relative pl-8 text-lg leading-relaxed text-neutral-300 before:absolute before:left-0 before:text-accent before:content-['→']">
              <strong>Tobacco Advertising Expenditure Studies:</strong> Daten zu Werbeausgaben der Tabakindustrie
            </li>
          </ul>
        </section>

        <section className="chart-descriptions mb-16">
          <h2 className="mb-6 mt-12 text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-accent-subtle">
            Diagrammerklärungen
          </h2>

          {decades.map((decade) => (
            <article key={decade.id} className="chart-description mb-8 rounded-xl border-l-4 border-accent bg-bg-section/60 p-8">
              <h3 className="mb-4 text-2xl font-bold text-accent">
                {decade.decade}: {decade.title}
              </h3>
              <p className="mb-2 font-semibold">Was das Diagramm zeigt:</p>
              <p className="mb-4 text-neutral-300">{decade.chartExplainer}</p>
              <p className="mb-2 font-semibold">Kontext:</p>
              <div className="space-y-4">
                {decade.narrative.map((paragraph, idx) => (
                  <p key={idx} className="text-neutral-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="accessibility mb-16">
          <h2 className="mb-6 mt-12 text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-accent-subtle">
            Barrierefreiheit
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Alle Diagramme enthalten ARIA-Labels und Beschreibungen für Screenreader. Bei aktivierter Einstellung
            für reduzierte Bewegung werden Animationen minimiert.
          </p>
        </section>

        <section className="sources mb-16">
          <h2 className="mb-6 mt-12 text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-accent-subtle">
            Weiterführende Quellen
          </h2>
          <ul className="space-y-4">
            <li className="relative pl-8 before:absolute before:left-0 before:text-accent before:content-['→']">
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/tobacco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-accent-subtle"
              >
                WHO Tobacco Fact Sheet
              </a>
            </li>
            <li className="relative pl-8 before:absolute before:left-0 before:text-accent before:content-['→']">
              <a
                href="https://www.cdc.gov/tobacco/data_statistics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-accent-subtle"
              >
                CDC Tobacco Data & Statistics
              </a>
            </li>
            <li className="relative pl-8 before:absolute before:left-0 before:text-accent before:content-['→']">
              <a
                href="https://www.rauchfrei-info.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-accent-subtle"
              >
                Rauchfrei Info (BZgA)
              </a>
            </li>
          </ul>
        </section>

        <footer className="page-footer mt-16 border-t border-neutral-800 pt-8 text-center">
          <p className="text-text-secondary">
            Erstellt mit Next.js, D3.js, und GSAP. Inspiriert von The Pudding&apos;s Scrollytelling-Arbeiten.
          </p>
          <p className="mt-2 text-text-secondary">
            Alle Daten dienen Bildungszwecken und sind zum angegebenen Zeitpunkt korrekt.
          </p>
        </footer>
      </div>
    </main>
  );
}
