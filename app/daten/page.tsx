import type { Metadata } from 'next';
import Link from 'next/link';

import { decades } from '@/lib/data/decades';

export const metadata: Metadata = {
  title: 'Daten und Methodik | Wie du zum Raucher wurdest',
  description: 'Datenquellen und Methodik der Scrollytelling-Erfahrung über Tabakwerbung.',
};

export default function DatenPage() {
  return (
    <main className="data-page relative min-h-screen overflow-hidden bg-gradient-to-b from-bg-dark via-bg-section to-bg-dark px-8 py-16 text-text-primary">
      {/* Background Effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-smoke-500/5 blur-3xl" style={{ animationDuration: '8s' }} />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-era-80s/5 blur-3xl" style={{ animationDuration: '10s' }} />
      </div>

      <div className="container-narrow relative">
        <header className="mb-16">
          <Link href="/" className="group mb-8 inline-flex items-center gap-2 text-text-secondary transition hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Zurück zur Geschichte</span>
          </Link>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-smoke-500" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-smoke-400">Transparenz</span>
            </div>
            <h1 className="font-headline text-[clamp(3rem,8vw,5rem)] font-bold leading-tight tracking-tighter">
              Daten und Methodik
            </h1>
          </div>
        </header>

        <section className="intro mb-20">
          <div className="glass-panel rounded-2xl border-l-4 border-smoke-500 p-8">
            <p className="text-xl leading-relaxed text-white/90">
              Diese Scrollytelling-Erfahrung basiert auf historischen Daten über Tabakkonsum, Werbung und
              gesundheitliche Auswirkungen von den 1950er Jahren bis heute. Jede Zahl, jedes Diagramm
              erzählt eine Geschichte von Manipulation, Profit und menschlichem Leid.
            </p>
          </div>
        </section>

        <section className="methodology mb-20">
          <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3rem)] font-bold">Datenquellen</h2>
          <p className="mb-8 text-lg leading-relaxed text-neutral-300">Die verwendeten Daten stammen aus folgenden vertrauenswürdigen Quellen:</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel group rounded-xl p-6 transition-all hover:border-smoke-500/50">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-smoke-500/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white/95">WHO Tobacco Control Database</h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-300">
                Weltweite Statistiken zu Tabakkonsum und tabakbedingten Todesfällen
              </p>
            </div>

            <div className="glass-panel group rounded-xl p-6 transition-all hover:border-smoke-500/50">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-smoke-500/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400">
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9M13 17V5M8 17v-3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white/95">OECD Health Statistics</h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-300">
                Langzeitdaten zum Zigarettenkonsum in Industrieländern
              </p>
            </div>

            <div className="glass-panel group rounded-xl p-6 transition-all hover:border-smoke-500/50">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-smoke-500/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white/95">US Surgeon General Reports</h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-300">
                Historische Berichte zu gesundheitlichen Auswirkungen des Rauchens
              </p>
            </div>

            <div className="glass-panel group rounded-xl p-6 transition-all hover:border-smoke-500/50">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-smoke-500/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white/95">Tobacco Advertising Expenditure</h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-300">
                Daten zu Werbeausgaben der Tabakindustrie über Jahrzehnte
              </p>
            </div>
          </div>
        </section>

        <section className="chart-descriptions mb-20">
          <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3rem)] font-bold">
            Diagrammerklärungen
          </h2>

          <div className="space-y-6">
            {decades.map((decade, idx) => (
              <article key={decade.id} className="glass-panel group rounded-2xl border-l-4 border-smoke-500 p-8 transition-all hover:bg-white/5">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-smoke-400">{decade.decade}</span>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white/95">
                      {decade.title}
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-smoke-500/10 font-headline text-xl font-bold text-smoke-400">
                    {idx + 1}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-wider text-white/60">Was das Diagramm zeigt</p>
                    <p className="text-lg leading-relaxed text-neutral-300">{decade.chartExplainer}</p>
                  </div>
                  
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-wider text-white/60">Kontext</p>
                    <div className="space-y-3">
                      {decade.narrative.map((paragraph, pIdx) => (
                        <p key={pIdx} className="leading-relaxed text-neutral-300">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="accessibility mb-20">
          <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3rem)] font-bold">
            Barrierefreiheit
          </h2>
          <div className="glass-panel rounded-2xl p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-era-80s/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-era-80s">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-white/95">Inklusives Design</h3>
            </div>
            <div className="space-y-3 text-neutral-300">
              <p className="leading-relaxed">
                Alle Diagramme enthalten ARIA-Labels und ausführliche Beschreibungen für Screenreader.
              </p>
              <p className="leading-relaxed">
                Bei aktivierter Einstellung für reduzierte Bewegung (<code className="rounded bg-white/10 px-2 py-1 font-mono text-sm">prefers-reduced-motion</code>) werden Animationen minimiert.
              </p>
              <p className="leading-relaxed">
                Alle interaktiven Elemente sind per Tastatur navigierbar.
              </p>
            </div>
          </div>
        </section>

        <section className="sources mb-20">
          <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3rem)] font-bold">
            Weiterführende Quellen
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/tobacco"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel group rounded-xl p-6 transition-all hover:border-smoke-500/50 hover:bg-white/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white/95">WHO Fact Sheet</h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-neutral-400">Weltgesundheitsorganisation</p>
            </a>

            <a
              href="https://www.cdc.gov/tobacco/data_statistics/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel group rounded-xl p-6 transition-all hover:border-smoke-500/50 hover:bg-white/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white/95">CDC Statistics</h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-neutral-400">US Gesundheitsbehörde</p>
            </a>

            <a
              href="https://www.rauchfrei-info.de"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel group rounded-xl p-6 transition-all hover:border-smoke-500/50 hover:bg-white/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white/95">Rauchfrei Info</h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-neutral-400">BZgA Deutschland</p>
            </a>
          </div>
        </section>

        <footer className="page-footer mt-20 glass-panel rounded-2xl p-8 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-smoke-500" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-smoke-500" />
          </div>
          
          <p className="mb-3 text-neutral-300">
            Erstellt mit Next.js, D3.js, und GSAP. Inspiriert von The Pudding&apos;s Scrollytelling-Arbeiten.
          </p>
          <p className="text-sm text-text-secondary">
            Alle Daten dienen Bildungszwecken und sind zum angegebenen Zeitpunkt korrekt.
          </p>
        </footer>
      </div>
    </main>
  );
}
