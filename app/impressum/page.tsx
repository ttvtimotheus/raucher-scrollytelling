import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum | Wie du zum Raucher wurdest',
  description: 'Impressum und rechtliche Angaben',
};

export default function ImpressumPage() {
  return (
    <main className="impressum-page relative min-h-screen overflow-hidden bg-gradient-to-b from-bg-dark via-bg-section to-bg-dark px-8 py-16 text-text-primary">
      {/* Background Effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 animate-pulse rounded-full bg-smoke-500/5 blur-3xl" style={{ animationDuration: '8s' }} />
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
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-smoke-400">Rechtliches</span>
            </div>
            <h1 className="font-headline text-[clamp(3rem,8vw,5rem)] font-bold leading-tight tracking-tighter">
              Impressum
            </h1>
          </div>
        </header>

        {/* Angaben gemäß § 5 TMG */}
        <section className="mb-12">
          <div className="glass-panel rounded-2xl border-l-4 border-smoke-500 p-8">
            <h2 className="mb-6 font-display text-2xl font-bold">Angaben gemäß § 5 TMG</h2>
            
            <div className="space-y-4 text-neutral-300">
              <div>
                <p className="font-semibold text-white/90">Herausgeber</p>
                <p>Timo Haseloff</p>
                <p>Breite Str. 7</p>
                <p>39288 Burg</p>
              </div>

              <div>
                <p className="font-semibold text-white/90">Kontakt</p>
                <p>E-Mail: timo@haseloff-solutions.de</p>
                <p>Telefon: +49 15258705975</p>
              </div>
            </div>
          </div>
        </section>

        {/* Verantwortlich für den Inhalt */}
        <section className="mb-12">
          <div className="glass-panel rounded-2xl p-8">
            <h2 className="mb-6 font-display text-2xl font-bold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            
            <div className="space-y-2 text-neutral-300">
              <p>Timo Haseloff</p>
              <p>Breite Str. 7</p>
              <p>39288 Burg</p>
            </div>
          </div>
        </section>

        {/* Haftungsausschluss */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold">Haftungsausschluss</h2>
          
          <div className="space-y-6">
            <div className="glass-panel rounded-xl p-6">
              <h3 className="mb-3 font-semibold text-white/95">Haftung für Inhalte</h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h3 className="mb-3 font-semibold text-white/95">Haftung für Links</h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                Seiten verantwortlich.
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h3 className="mb-3 font-semibold text-white/95">Urheberrecht</h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </section>

        {/* Datenschutz */}
        <section className="mb-12">
          <div className="glass-panel rounded-2xl border-l-4 border-era-80s p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-era-80s/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-era-80s">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold">Datenschutz</h2>
            </div>
            
            <div className="space-y-4 text-neutral-300">
              <p className="leading-relaxed">
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. 
                Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder 
                E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
              </p>
              <p className="leading-relaxed">
                Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
              </p>
              <p className="leading-relaxed">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation 
                per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem 
                Zugriff durch Dritte ist nicht möglich.
              </p>
            </div>
          </div>
        </section>

        {/* Bildnachweise */}
        <section className="mb-12">
          <div className="glass-panel rounded-2xl p-8">
            <h2 className="mb-6 font-display text-2xl font-bold">Bildnachweise</h2>
            
            <div className="space-y-3 text-neutral-300">
              <p className="leading-relaxed">
                Die auf dieser Website verwendeten historischen Werbeplakate dienen ausschließlich 
                Bildungszwecken und der kritischen Auseinandersetzung mit Tabakwerbung.
              </p>
              <p className="leading-relaxed">
                Alle Bildrechte liegen bei den jeweiligen Rechteinhabern. Die Verwendung erfolgt im 
                Rahmen des Zitatrechts (§ 51 UrhG) für wissenschaftliche und aufklärende Zwecke.
              </p>
            </div>
          </div>
        </section>

        <footer className="page-footer mt-16 glass-panel rounded-2xl p-8 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-smoke-500" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-smoke-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-smoke-500" />
          </div>
          
          <p className="text-sm text-text-secondary">
            Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
          </p>
        </footer>
      </div>
    </main>
  );
}
