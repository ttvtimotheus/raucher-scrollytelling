'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface QuizOption {
  label: string;
  value: number | string;
}

interface QuizMomentProps {
  question: string;
  options: QuizOption[];
  correctAnswer: number | string;
  explanation: string;
}

export function QuizMoment({ question, options, correctAnswer, explanation }: QuizMomentProps) {
  const [selected, setSelected] = useState<number | string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  useEffect(() => {
    if (revealed && resultRef.current) {
      gsap.from(resultRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [revealed]);

  const isCorrect = selected === correctAnswer;
  const correctOption = options.find((o) => o.value === correctAnswer);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h3 className="text-balance text-center text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight text-white/95">
          {question}
        </h3>
      </div>

      {!revealed ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelected(option.value)}
                className={`rounded-xl border-2 px-6 py-6 text-lg font-medium transition ${
                  selected === option.value
                    ? 'border-accent bg-accent/20 shadow-[0_0_20px_rgba(255,107,107,0.3)]'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                } text-white/90`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleReveal}
            disabled={selected === null}
            className="mx-auto block rounded-full bg-accent px-12 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:bg-accent-subtle hover:shadow-[0_4px_20px_rgba(255,107,107,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Antwort zeigen
          </button>
        </>
      ) : (
        <div ref={resultRef} className="space-y-6 text-center">
          <div className="flex flex-col items-center gap-4">
            {isCorrect ? (
              <>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-green-400"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-2xl font-bold">Richtig!</p>
              </>
            ) : (
              <>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <p className="text-2xl font-bold">Nicht ganz...</p>
              </>
            )}
          </div>

          <div className="rounded-xl bg-white/5 px-8 py-6">
            <p className="mb-2 text-sm uppercase tracking-widest text-white/60">Die richtige Antwort ist:</p>
            <p className="text-3xl font-bold text-accent">{correctOption?.label}</p>
          </div>

          <div className="text-lg leading-relaxed text-white/85">
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizMoment;
