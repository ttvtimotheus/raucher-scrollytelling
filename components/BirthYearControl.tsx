'use client';

import { FormEvent, useState } from 'react';

import { useBirthYear } from '@/lib/context/BirthYearContext';

export function BirthYearControl() {
  const { setBirthYear, resetBirthYear } = useBirthYear();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const year = parseInt(inputValue, 10);
    if (!Number.isNaN(year) && year >= 1950 && year <= 2010) {
      setBirthYear(year);
    }
  };

  return (
    <section
      id="birth-year-section"
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-bg-dark to-bg-section px-4 py-16"
    >
      <div className="container-narrow space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-balance text-[clamp(2rem,5vw,3rem)] font-bold">Wann wurdest du geboren?</h2>
          <p className="text-lg text-text-secondary">
            Erzähl uns dein Geburtsjahr. Wir zeigen dir, welche Werbung dich prägte.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-4">
          <input
            type="number"
            min={1950}
            max={2010}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="z.B. 1995"
            aria-label="Geburtsjahr eingeben"
            className="rounded-lg border-2 border-neutral-700 bg-neutral-800 px-6 py-4 text-center text-xl text-text-primary transition focus:border-accent focus:outline-none placeholder:text-neutral-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-4 text-lg font-semibold text-white transition hover:bg-accent-subtle"
          >
            Weiter zur Geschichte
          </button>
        </form>

        <button
          type="button"
          onClick={resetBirthYear}
          className="text-sm text-text-secondary underline-offset-4 transition hover:text-text-primary"
        >
          Ohne Jahrgang weitermachen
        </button>
      </div>
    </section>
  );
}

export default BirthYearControl;
