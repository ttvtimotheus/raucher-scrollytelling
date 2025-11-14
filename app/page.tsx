'use client';

import { useEffect, useState } from 'react';

import AudioManager from '@/components/AudioManager';
import HeroCowboy from '@/components/HeroCowboy';
import BirthYearControl from '@/components/BirthYearControl';
import DecadeSection from '@/components/DecadeSection';
import NarrativeBridge from '@/components/NarrativeBridge';
import QuizMoment from '@/components/QuizMoment';
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

      <BirthYearControl />

      {mounted && (
        <>
          {/* 1950er: Visuelle Szene */}
          <DecadeSection section={decades[0]} layout="left" />

          {/* Bridge: 1950er Zusammenfassung */}
          <NarrativeBridge
            title="Die Geburt einer Ikone"
            body="<p>In den 1950ern stieg der Zigarettenkonsum dramatisch. Aber das war kein Zufall.</p><p>Die Tabakindustrie erschuf den <strong>Marlboro Mann</strong> – eine Figur, die Freiheit, Männlichkeit und Unabhängigkeit verkörperte. Was niemand wußte: <em>Jede dieser Werbefiguren starb später an Lungenkrebs</em>.</p>"
            highlight="Sie haben Freiheit versprochen. Und Abhängigkeit verkauft."
          />

          {/* 1970er: Daten */}
          <DecadeSection section={decades[1]} layout="right" colorTheme="1970" />

          {/* Bridge: 1970er Kontext */}
          <NarrativeBridge
            title="Die ersten Warnungen"
            body="<p>In den 1970ern begannen Gesundheitswarnungen auf Zigarettenpackungen zu erscheinen. Die Industrie reagierte nicht mit Rückzug, sondern mit <strong>noch aggressiverer Werbung</strong>.</p><p>Fast die Hälfte aller Erwachsenen rauchte regelmäßig. Zigaretten waren nicht nur ein Produkt – sie waren Teil der Identität.</p>"
            highlight="Die Zigarette versprach nicht nur einen Moment. Sie versprach, wer du sein könntest."
          />

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
            body="<p>Die 1980er brachten eine neue Zielgruppe: <strong>Frauen</strong>. 'You've Come a Long Way, Baby' war mehr als ein Slogan – es war eine Bewegung.</p><p>Die Industrie verkaufte Zigaretten als Symbol der Emanzipation. Der Anteil rauchender Frauen stieg dramatisch, während Männer langsam zurückgingen.</p>"
            highlight="Was wie Feminismus aussah, war Manipulation."
          />

          {/* 1990er: Daten */}
          <DecadeSection section={decades[3]} layout="right" colorTheme="1990" />

          {/* Bridge: 1990er Youth Culture */}
          <NarrativeBridge
            title="Die coole Rebellion"
            body="<p>In den 1990ern fokussierte sich die Werbung auf <strong>Teenager</strong>. Joe Camel wurde zur Ikone einer Generation – cool, rebellisch, unabhängig.</p><p>Die Zahlen sprechen für sich: <em>Jugendliche rauchten in Rekordzahlen</em>. Was als Rebellion gegen das System verkauft wurde, war genau das, was das System wollte.</p>"
            highlight="Jede Generation glaubt, sie wählt frei. Jede Generation wird gezielt manipuliert."
          />

          {/* 2000er: Visuelle Szene */}
          <DecadeSection section={decades[4]} layout="left" colorTheme="2000" />

          {/* Bridge: 2000er Wandel */}
          <NarrativeBridge
            title="Der Rückzug der Giganten"
            body="<p>Die 2000er markierten einen Wendepunkt. Werbeverbote wurden stärker, Raucherzahlen sanken, Werbebudgets schrumpften.</p><p>Aber die Industrie gab nicht auf. Sie veränderte nur ihre Strategie: <strong>Neue Produkte, neue Versprechen</strong>.</p>"
            highlight="Das Spiel blieb gleich. Nur die Regeln änderten sich."
          />

          {/* 2010er/2020er: Finale Daten */}
          <DecadeSection section={decades[5]} layout="right" colorTheme="2010" />
        </>
      )}

      <section className="finale-section flex min-h-screen items-center justify-center bg-gradient-to-b from-bg-dark to-[#1a1a2a] px-8 py-16 text-center">
        <div className="container-narrow space-y-12">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
            Es war nie deine Entscheidung allein.
          </h2>
          <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-accent">
            Aber du kannst sie dir zurückholen.
          </p>

          <div className="cta-buttons flex flex-wrap justify-center gap-6">
            <a href="/" className="button-secondary rounded-full border-2 border-neutral-700 bg-transparent px-12 py-5 text-lg font-semibold text-text-primary transition hover:border-accent hover:text-accent">
              Nochmal ansehen
            </a>
            <a
              href="https://www.rauchfrei-info.de"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary rounded-full bg-accent px-12 py-5 text-lg font-semibold text-white shadow-[0_10px_25px_rgba(255,107,107,0.3)] transition hover:-translate-y-1 hover:bg-accent-subtle"
            >
              Frei atmen
            </a>
          </div>

          <div className="data-link mt-8">
            <a href="/daten" className="text-text-secondary underline transition hover:text-text-primary">
              Daten und Methodik
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
