'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface InterludeProps {
  quote: string;
  author?: string;
  type?: 'quote' | 'reflection' | 'fade';
}

export function Interlude({ quote, author, type = 'quote' }: InterludeProps) {
  const interludeRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!interludeRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: interludeRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: true,
        },
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
      });

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: interludeRef.current,
          start: 'center center',
          end: 'bottom 20%',
          scrub: true,
        },
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
      });
    }, interludeRef);

    return () => ctx.revert();
  }, []);

  const bgClass =
    type === 'quote'
      ? 'bg-black'
      : type === 'reflection'
        ? 'bg-gradient-to-b from-bg-dark via-bg-section to-bg-dark'
        : 'bg-[#050505]';

  return (
    <section ref={interludeRef} className={`relative flex min-h-screen items-center justify-center px-8 py-16 ${bgClass}`}>
      <div ref={contentRef} className="w-full max-w-4xl text-center">
        {type === 'quote' && (
          <blockquote className="space-y-8">
            <p className="text-balance text-[clamp(2rem,5vw,4rem)] font-light italic leading-tight text-white/95 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.9)]">
              {quote}
            </p>
            {author && (
              <cite className="block text-[clamp(1.25rem,2vw,1.75rem)] font-normal not-italic text-white/60">
                — {author}
              </cite>
            )}
          </blockquote>
        )}

        {type === 'reflection' && (
          <div className="reflection-text">
            <p className="text-balance text-[clamp(1.5rem,3.5vw,2.75rem)] font-normal leading-relaxed text-white/90 drop-shadow-[2px_2px_6px_rgba(0,0,0,0.8)]">
              {quote}
            </p>
          </div>
        )}

        {type === 'fade' && (
          <div className="fade-text">
            <p className="text-balance text-[clamp(1.25rem,2.5vw,2rem)] font-medium uppercase leading-relaxed tracking-widest text-white/70 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.9)]">
              {quote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Interlude;
