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
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Progress Indicator */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-smoke-500" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-smoke-400">
          Wissenstest
        </span>
      </div>

      {/* Question Card - Glassmorphism */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg-elevated/80 to-bg-section/80 p-12 backdrop-blur-2xl">
        {/* Animated Background */}
        <div className="absolute -inset-40 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(240,82,82,0.1),transparent_50%)]" />
        </div>

        <div className="relative space-y-8">
          <h3 className="font-display text-balance text-center text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-white/95">
            {question}
          </h3>

          {!revealed ? (
            <>
              <div className="grid gap-4">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelected(option.value)}
                    className={`shine-effect group/option relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all duration-300 ${
                      selected === option.value
                        ? 'border-smoke-500 bg-smoke-500/10 shadow-lg shadow-smoke-500/20 scale-[1.02]'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span className="relative text-lg font-medium text-white/90">{option.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleReveal}
                disabled={selected === null}
                className="magnetic-button mx-auto block rounded-full bg-gradient-to-r from-smoke-500 to-smoke-600 px-12 py-6 text-lg font-semibold text-white shadow-2xl shadow-smoke-500/50 transition-all hover:scale-105 hover:shadow-smoke-500/70 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 mt-8"
              >
                Antwort zeigen
              </button>
            </>
          ) : (
            <div ref={resultRef} className="space-y-8 text-center">
              <div className="flex flex-col items-center gap-4">
                {isCorrect ? (
                  <>
                    <div className="rounded-full bg-green-500/20 p-6">
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
                    </div>
                    <p className="font-headline text-3xl font-bold text-green-400">Richtig!</p>
                  </>
                ) : (
                  <>
                    <div className="rounded-full bg-smoke-500/20 p-6">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-smoke-400"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </div>
                    <p className="font-headline text-3xl font-bold text-smoke-400">Nicht ganz...</p>
                  </>
                )}
              </div>

              <div className="glass-panel rounded-2xl px-8 py-6">
                <p className="mb-3 font-mono text-sm uppercase tracking-widest text-white/60">Die richtige Antwort ist:</p>
                <p className="font-headline text-4xl font-bold text-smoke-400">{correctOption?.label}</p>
              </div>

              <div className="text-xl leading-relaxed text-white/85">
                <p>{explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizMoment;
