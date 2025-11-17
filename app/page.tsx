'use client';

import { useEffect, useState } from 'react';

import AudioManager from '@/components/AudioManager';
import HeroCowboy from '@/components/HeroCowboy';
import DecadeSection from '@/components/DecadeSection';
import NarrativeBridge from '@/components/NarrativeBridge';
import QuizMoment from '@/components/QuizMoment';
import EmotionalInterlude from '@/components/EmotionalInterlude';
import SilentMoment from '@/components/SilentMoment';
import { decades } from '@/lib/data/decades';
import { initScrollOrchestrator } from '@/lib/gsap/scrollOrchestrator';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initScrollOrchestrator();
      setMounted(true);
    }
  }, []);

  return (
    <main className="scrollytelling-container bg-bg-dark text-text-primary">
      <AudioManager />
      <HeroCowboy />

      {mounted && (
        <>
          {/* Opening Thought */}
          <EmotionalInterlude text="Es begann mit einem Cowboy. Der nie existierte. Und acht Millionen Toten." />

          {/* 1950er: Visuelle Szene */}
          <DecadeSection section={decades[0]} layout="left" />

          {/* Bridge: 1950er Zusammenfassung */}
          <NarrativeBridge
            title="Die Geburt einer Ikone"
            body="<p>Eine Zigarette sah nicht mehr nach Tabak aus. Sie sah nach Freiheit aus.</p><p>Der <strong>Marlboro Mann</strong> verkörperte alles: Männlichkeit. Unabhängigkeit. Weite. Ein Cowboy, den es nie gab. Ein Traum, der tödlich war.</p><p>Jeder Marlboro Mann starb an Lungenkrebs. <em>Jeder einzelne</em>.</p>"
            highlight="Sie haben Freiheit versprochen. Und Abhängigkeit verkauft."
          />

          {/* Silent Moment: The Reality */}
          <SilentMoment 
            line1="Acht Millionen Tote."
            line2="Und alles begann mit einem Cowboy."
            duration="medium"
          />

          {/* 1970er: Daten */}
          <DecadeSection section={decades[1]} layout="right" colorTheme="1970" />

          {/* Bridge: 1970er Kontext */}
          <NarrativeBridge
            title="Die ersten Warnungen"
            body="<p>Die Wahrheit stand auf jeder Packung. Klein. Gedruckt. Ignoriert.</p><p>Worte verblassen. Bilder brennen sich ein. Die Industrie machte die Cowboys cooler. Die Lügen schöner. Die Versprechen größer.</p><p>Die Hälfte aller Erwachsenen rauchte. Die Zigarette war nicht Produkt. Sie war Identität.</p>"
            highlight="Die Zigarette versprach nicht nur einen Moment. Sie versprach, wer du sein könntest."
          />

          <EmotionalInterlude text="Werbung informiert nicht. Werbung erschafft. Bedürfnisse, die nie da waren. Sehnsüchte, die nie echt waren." />

          {/* Quiz: Werbeverbot */}
          <QuizMoment
            question="Wann wurde Tabakwerbung im deutschen Fernsehen verboten?"
            options={[
              { label: '1975', value: 1975 },
              { label: '1989', value: 1989 },
              { label: '2007', value: 2007 },
              { label: '2021', value: 2021 },
            ]}
            correctAnswer={2007}
            explanation="Erst 2007 wurde Tabakwerbung im deutschen Fernsehen vollständig verboten – später als in den meisten anderen europäischen Ländern. Außenwerbung (Plakate) war sogar bis 2021 erlaubt."
          />

          {/* 1980er: Visuelle Szene */}
          <DecadeSection section={decades[2]} layout="left" colorTheme="1980" />

          {/* Bridge: 1980er Strategie */}
          <NarrativeBridge
            title="Die Emanzipation als Marketingstrategie"
            body="<p>Sie nahmen eine Revolution. Und verkauften sie in Schachteln.</p><p>'You've Come a Long Way, Baby' – das klang nach Befreiung. Nach Gleichberechtigung. Nach Fortschritt. Was sie verkauften: Dieselbe Sucht. Neue Verpackung.</p><p>Rauchende Frauen: verdoppelt. Nicht aus Wahl. Aus Manipulation.</p>"
            highlight="Was wie Feminismus aussah, war Manipulation."
          />

          {/* 1990er: Daten */}
          <DecadeSection section={decades[3]} layout="right" colorTheme="1990" />

          {/* Bridge: 1990er Youth Culture */}
          <NarrativeBridge
            title="Die coole Rebellion"
            body="<p>Ein Cartoon-Kamel besiegte Mickey Mouse. Das war Absicht.</p><p>Joe Camel war überall. Lässig. Cool. Unbesiegbar. Kinder liebten ihn. Kinder wollten sein wie er. Kinder rauchten.</p><p><em>Jugendliche in Rekordzahlen</em>. Sie dachten: Rebellion. Sie dachten: Freiheit. Sie bekamen: Design. Ihre Coolness war gekauft. Ihre Zukunft verkauft.</p>"
            highlight="Jede Generation glaubt, sie wählt frei. Jede Generation wird gezielt manipuliert."
          />

          {/* Silent Moment: The Pattern */}
          <SilentMoment 
            line1="Jede Dekade."
            line2="Dieselbe Lüge in neuen Farben."
            duration="short"
          />

          {/* 2000er: Visuelle Szene */}
          <DecadeSection section={decades[4]} layout="left" colorTheme="2000" />

          {/* Bridge: 2000er Wandel */}
          <NarrativeBridge
            title="Der Rückzug der Giganten"
            body="<p>Die Werbung verstummte. Die Cowboys verschwanden. Das Spiel endete.</p><p>Nein. Es bekam neue Regeln.</p><p><strong>E-Zigaretten. Vapes. Heat-not-burn.</strong> Neue Namen. Neue Farben. Neue Generation. Alte Sucht.</p><p>Das Versprechen: identisch. Freiheit im Taschenformat. Coolness zum Inhalieren.</p>"
            highlight="Das Spiel blieb gleich. Nur die Regeln änderten sich."
          />

          {/* 2010er/2020er: Finale Daten */}
          <DecadeSection section={decades[5]} layout="right" colorTheme="2010" />

          {/* Silent Moment: The Choice */}
          <SilentMoment 
            line1="Es war nie deine Wahl."
            duration="long"
          />

          <EmotionalInterlude text="Deine Entscheidung war nie deine. Ab jetzt kann sie es sein." />
        </>
      )}

      <section className="finale-section relative min-h-screen overflow-hidden bg-gradient-to-b from-bg-dark via-[#1a1a2a] to-bg-dark">
        {/* Cinematic Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Floating Particles */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative flex min-h-screen flex-col items-center justify-center px-8 py-16 text-center">
          <div className="max-w-4xl space-y-12">
            {/* Main Message */}
            <h2 className="font-headline text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.95] tracking-tighter">
              <span className="block text-white/90">
                Es war nie
              </span>
              <span className="block bg-gradient-to-r from-white via-smoke-400 to-white bg-clip-text text-transparent">
                deine Entscheidung.
              </span>
            </h2>
            
            {/* Subtext */}
            <p className="font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold text-smoke-400">
              Aber du kannst sie dir zurückholen.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="https://www.rauchfrei-info.de"
                target="_blank"
                rel="noopener noreferrer"
                className="shine-effect group relative overflow-hidden rounded-full bg-gradient-to-r from-smoke-500 to-smoke-600 px-12 py-6 font-semibold text-white shadow-2xl shadow-smoke-500/50 transition-all hover:scale-105 hover:shadow-smoke-500/70"
              >
                <span className="relative z-10 text-lg">Frei atmen</span>
              </a>
              
              <a 
                href="/" 
                className="glass-panel rounded-full px-12 py-6 text-lg font-semibold text-white/90 transition-all hover:bg-white/10"
              >
                Nochmal ansehen
              </a>
            </div>

            {/* Footer Links */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
              <a 
                href="/daten" 
                className="group inline-flex items-center gap-2 font-mono uppercase tracking-wider text-text-secondary transition hover:text-text-primary"
              >
                <span>Daten und Methodik</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              
              <span className="text-text-secondary">•</span>
              
              <a 
                href="/impressum" 
                className="font-mono uppercase tracking-wider text-text-secondary transition hover:text-text-primary"
              >
                Impressum
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
