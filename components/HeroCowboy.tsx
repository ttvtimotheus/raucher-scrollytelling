'use client';

import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import VideoLooper from './VideoLooper';

gsap.registerPlugin(ScrollTrigger);

export function HeroCowboy() {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const videoBackgroundRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLParagraphElement | null>(null);
  const line2Ref = useRef<HTMLParagraphElement | null>(null);
  const line3Ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroSectionRef.current || !videoBackgroundRef.current || !heroContentRef.current) {
        return;
      }

      const tl = gsap.timeline({ delay: 0.5 });
      if (line1Ref.current) {
        tl.from(line1Ref.current, {
          opacity: 0,
          y: 30,
          filter: 'blur(10px)',
          duration: 1.2,
          ease: 'power3.out',
        });
      }
      if (line2Ref.current) {
        tl.from(
          line2Ref.current,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)',
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.6',
        );
      }
      if (line3Ref.current) {
        tl.from(
          line3Ref.current,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)',
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.6',
        );
      }

      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (videoBackgroundRef.current) {
            gsap.to(videoBackgroundRef.current, {
              opacity: 1 - progress,
              filter: `blur(${progress * 20}px) brightness(${1 - progress * 0.5})`,
              scale: 1 + progress * 0.2,
              duration: 0,
              overwrite: 'auto',
            });
          }
          if (heroContentRef.current) {
            gsap.to(heroContentRef.current, {
              opacity: 1 - progress * 1.5,
              y: -progress * 100,
              duration: 0,
              overwrite: 'auto',
            });
          }
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = useCallback(() => {
    const nextSection = document.querySelector('#birth-year-section');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        scrollToNext();
      }
    },
    [scrollToNext],
  );

  return (
    <section
      id="hero-cowboy"
      ref={heroSectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-10 text-center md:px-12"
    >
      <div ref={videoBackgroundRef} className="absolute inset-0 z-[1]">
        <VideoLooper
          videoSlug="smoking_commercial_website_intro"
          poster="/video/smoking_commercial_website_intro_poster.jpg"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80" />
        <a
          href="https://www.industrydocuments.ucsf.edu/docs/ljwl0154/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-6 z-[2] inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/80 backdrop-blur transition hover:bg-black/75 hover:text-white"
          aria-label="Video source: UCSF Industry Documents Library"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>Quelle: UCSF (1955–1970) • 08:00–09:00</span>
        </a>
      </div>

      <div ref={heroContentRef} className="relative z-[3] w-full max-w-[1100px] space-y-8">
        <div className="voice-over space-y-4 text-white drop-shadow-[2px_2px_20px_rgba(0,0,0,0.6)]">
          <p
            ref={line1Ref}
            className="text-balance text-[clamp(1.5rem,3vw,2.25rem)] font-medium italic text-white/95"
          >
            Er war stark. Frei. Unabhängig.
          </p>
          <p
            ref={line2Ref}
            className="text-balance text-[clamp(1.5rem,3vw,2.25rem)] font-medium italic text-white/95"
          >
            Und er war nie echt.
          </p>
        </div>

        <h1
          ref={line3Ref}
          className="hero-title text-balance text-[clamp(3rem,12vw,7rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-[3px_3px_25px_rgba(0,0,0,0.4)]"
        >
          <span className="block whitespace-nowrap">Der Marlboro Mann</span>
          <span className="block whitespace-nowrap">war eine Lüge</span>
        </h1>

        <div
          role="button"
          tabIndex={0}
          onClick={scrollToNext}
          onKeyDown={handleKeyDown}
          className="mx-auto inline-flex cursor-pointer flex-col items-center gap-2 uppercase tracking-[0.4em] text-white/60 transition hover:text-white focus:outline-none"
        >
          <span>Scroll</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default HeroCowboy;
