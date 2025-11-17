'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EmotionalInterludeProps {
  text: string;
}

export function EmotionalInterlude({ text }: EmotionalInterludeProps) {
  const interludeRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!interludeRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: interludeRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
      });
    }, interludeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={interludeRef}
      className="emotional-interlude relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-bg-dark via-bg-section to-bg-dark px-8 py-20"
    >
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-smoke-500/10 blur-3xl" />
      </div>

      {/* Text */}
      <div className="relative max-w-3xl text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-smoke-500/50" />
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-smoke-500/50" />
        </div>

        <p
          ref={textRef}
          className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-light italic leading-relaxed text-white/90"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
        >
          {text}
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-smoke-500/50" />
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-smoke-500/50" />
        </div>
      </div>
    </section>
  );
}

export default EmotionalInterlude;
