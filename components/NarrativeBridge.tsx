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
    <section ref={bridgeRef} className="relative min-h-screen bg-bg-dark">
      {/* Parallax Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 h-96 w-96 animate-pulse rounded-full bg-smoke-500/5 blur-3xl" />
        <div 
          className="absolute -bottom-1/2 left-0 h-96 w-96 animate-pulse rounded-full bg-era-80s/5 blur-3xl" 
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-8 py-16">
        <div ref={contentRef} className="w-full max-w-4xl space-y-12">
          {title && (
            <>
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-smoke-500" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-smoke-400">
                  Kapitel
                </span>
              </div>

              {/* Main Title */}
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight tracking-tight text-white/95">
                {title}
              </h2>
            </>
          )}

          {/* Body Text */}
          <div
            className="prose prose-invert prose-lg max-w-none space-y-6 text-xl leading-relaxed text-white/80"
            dangerouslySetInnerHTML={{ __html: body }}
          />

          {/* Pull Quote */}
          {highlight && (
            <div className="relative mt-12 border-l-2 border-smoke-500 pl-8">
              <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-smoke-500/20 backdrop-blur" />
              <p className="font-display text-2xl font-semibold italic leading-relaxed text-smoke-400">
                &ldquo;{highlight}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default NarrativeBridge;
