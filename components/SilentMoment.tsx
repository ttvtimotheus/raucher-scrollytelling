'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SilentMomentProps {
  line1: string;
  line2?: string;
  duration?: 'short' | 'medium' | 'long';
}

export function SilentMoment({ line1, line2, duration = 'medium' }: SilentMomentProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLParagraphElement | null>(null);
  const line2Ref = useRef<HTMLParagraphElement | null>(null);

  const heightClass = 
    duration === 'short' ? 'min-h-[80vh]' :
    duration === 'long' ? 'min-h-[150vh]' :
    'min-h-screen';

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Line 1 Animation
      if (line1Ref.current) {
        gsap.from(line1Ref.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
          opacity: 0,
          y: 60,
        });
      }

      // Line 2 Animation (delayed)
      if (line2Ref.current) {
        gsap.from(line2Ref.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'center center',
            scrub: 1,
          },
          opacity: 0,
          y: 40,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`silent-moment relative flex ${heightClass} items-center justify-center bg-black px-8`}
    >
      {/* Pure Silence */}
      <div className="max-w-4xl text-center">
        <p
          ref={line1Ref}
          className="font-headline text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight tracking-tight text-white"
        >
          {line1}
        </p>
        
        {line2 && (
          <p
            ref={line2Ref}
            className="mt-8 font-headline text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight tracking-tight text-white/90"
          >
            {line2}
          </p>
        )}
      </div>
    </section>
  );
}

export default SilentMoment;
