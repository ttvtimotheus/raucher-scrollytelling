'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AdPoster {
  id: string;
  image: string;
  year: string;
  brand: string;
  technique: string;
  impact: string;
}

interface AdPosterShowcaseProps {
  decade: string;
  posters: AdPoster[];
  learningPoints: string[];
}

export function AdPosterShowcase({ decade, posters, learningPoints }: AdPosterShowcaseProps) {
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const postersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!showcaseRef.current) return;

    const ctx = gsap.context(() => {
      postersRef.current.forEach((poster) => {
        if (!poster) return;

        gsap.from(poster, {
          scrollTrigger: {
            trigger: poster,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
        });
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={showcaseRef} className="ad-poster-showcase space-y-12 py-16">
      {/* Learning Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-era-80s" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-era-80s">
            Werbepsychologie {decade}
          </span>
        </div>

        <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-white/95">
          So manipulierte die Industrie
        </h3>

        {/* Learning Points */}
        <div className="space-y-4">
          {learningPoints.map((point, idx) => (
            <div
              key={idx}
              className="glass-panel flex items-start gap-4 rounded-xl p-6 transition-all hover:bg-white/10"
            >
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-era-80s/20">
                <span className="font-headline text-sm font-bold text-era-80s">{idx + 1}</span>
              </div>
              <p className="text-lg leading-relaxed text-white/85">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Poster Gallery */}
      <div className="space-y-8">
        <h4 className="font-display text-2xl font-semibold text-white/90">Typische Werbeplakate</h4>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              ref={(el) => {
                postersRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-bg-elevated to-bg-section transition-all hover:border-era-80s/50 hover:scale-[1.02]"
            >
              {/* Poster Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
                <Image
                  src={poster.image}
                  alt={`${poster.brand} Werbeplakat von ${poster.year}`}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Poster Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-era-80s">{poster.year}</span>
                  <span className="font-semibold text-white/90">{poster.brand}</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/60">Technik</p>
                    <p className="text-sm text-white/85">{poster.technique}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/60">Wirkung</p>
                    <p className="text-sm text-white/85">{poster.impact}</p>
                  </div>
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-era-80s/20 backdrop-blur">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-era-80s">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Techniques Breakdown */}
      <div className="glass-panel rounded-2xl border-l-4 border-era-80s p-8">
        <h4 className="mb-6 font-display text-xl font-semibold text-white/95">
          💡 Wichtig zu verstehen
        </h4>
        <p className="text-lg leading-relaxed text-white/80">
          Diese Werbung zielte nicht auf Information, sondern auf{' '}
          <span className="font-semibold text-era-80s">emotionale Manipulation</span>. Jedes Element
          war psychologisch getestet: Farben, Models, Slogans – alles designt, um Bedürfnisse zu
          wecken, die vorher nicht existierten.
        </p>
      </div>
    </div>
  );
}

export default AdPosterShowcase;
