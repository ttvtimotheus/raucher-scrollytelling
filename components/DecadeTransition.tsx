'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DecadeTransitionProps {
  decade: string;
  theme?: 'smoke' | 'dark';
}

export function DecadeTransition({ decade, theme = 'smoke' }: DecadeTransitionProps) {
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const decadeRef = useRef<HTMLDivElement | null>(null);
  const smokeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!transitionRef.current) return;

    const ctx = gsap.context(() => {
      // Decade Number Animation
      if (decadeRef.current) {
        gsap.from(decadeRef.current, {
          scrollTrigger: {
            trigger: transitionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.8,
          y: 40,
        });
      }

      // Smoke Lines Animation
      if (smokeRef.current) {
        const lines = smokeRef.current.querySelectorAll('.smoke-line');
        lines.forEach((line, index) => {
          gsap.from(line, {
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 60%',
              end: 'center center',
              scrub: 1,
            },
            scaleX: 0,
            opacity: 0,
            delay: index * 0.1,
          });
        });
      }
    }, transitionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={transitionRef}
      className={`decade-transition relative flex min-h-[70vh] items-center justify-center overflow-hidden ${
        theme === 'dark' ? 'bg-black' : 'bg-gradient-to-b from-bg-dark via-bg-section to-bg-dark'
      } px-8 py-32`}
    >
      {/* Smoke Effect Lines */}
      <div ref={smokeRef} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8">
        <div className="smoke-line h-[1px] w-32 bg-gradient-to-r from-transparent via-smoke-500/30 to-transparent" />
        <div className="smoke-line h-[1px] w-24 bg-gradient-to-r from-transparent via-smoke-500/20 to-transparent" />
        <div className="smoke-line h-[1px] w-40 bg-gradient-to-r from-transparent via-smoke-500/30 to-transparent" />
      </div>

      {/* Decade Number */}
      <div ref={decadeRef} className="relative text-center">
        <div className="mb-4 flex items-center justify-center gap-4">
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-smoke-500/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-smoke-400">Kapitel</span>
          <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-smoke-500/50" />
        </div>
        
        <h2 className="font-headline text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-tighter text-white/90">
          {decade}
        </h2>
        
        <div className="mt-8 h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-smoke-500/30 to-transparent" />
      </div>

      {/* Subtle Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-smoke-500/5 blur-3xl" />
      </div>
    </section>
  );
}

export default DecadeTransition;
