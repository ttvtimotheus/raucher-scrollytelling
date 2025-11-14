'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NarrativeBridgeProps {
  title?: string;
  body: string;
  highlight?: string;
}

export function NarrativeBridge({ title, body, highlight }: NarrativeBridgeProps) {
  const bridgeRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bridgeRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: bridgeRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: bridgeRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 40,
      });
    }, bridgeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bridgeRef} className="relative flex min-h-screen items-center justify-center bg-bg-dark px-8 py-16">
      <div ref={contentRef} className="w-full max-w-3xl">
        {title && (
          <h3 className="mb-8 text-[clamp(1.5rem,3vw,2.5rem)] font-bold uppercase tracking-wider text-accent">
            {title}
          </h3>
        )}

        <div
          className="prose prose-invert mb-8 text-[clamp(1.25rem,2.5vw,1.75rem)] leading-relaxed text-white/90"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        {highlight && (
          <p className="mt-12 border-t border-accent/30 pt-8 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold italic leading-snug text-accent-subtle">
            {highlight}
          </p>
        )}
      </div>
    </section>
  );
}

export default NarrativeBridge;
