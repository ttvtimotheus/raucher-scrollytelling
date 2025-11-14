'use client';

import { useEffect, useState } from 'react';

import type { DecadeSection as DecadeSectionType } from '@/lib/data/decades';
import { getBirthYearHint, useBirthYear } from '@/lib/context/BirthYearContext';
import ChartWrapper from './ChartWrapper';

interface DecadeSectionProps {
  section: DecadeSectionType;
  layout?: 'left' | 'right' | 'full' | 'stacked';
  colorTheme?: '1950' | '1970' | '1980' | '1990' | '2000' | '2010' | '2020';
}

export function DecadeSection({ section, layout = 'left', colorTheme = '1950' }: DecadeSectionProps) {
  const { birthYear } = useBirthYear();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const hint = getBirthYearHint(birthYear, parseInt(section.decade.split('er')[0], 10));

  const bgClass = colorTheme === '1950' || colorTheme === '1980' || colorTheme === '2000' ? 'bg-[#0f0f0f]' : 'bg-[#050505]';

  return (
    <section
      id={section.id}
      data-decade={colorTheme}
      className={`decade-section relative min-h-screen ${bgClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`section-grid mx-auto grid min-h-screen max-w-[1400px] items-center gap-8 p-8 lg:gap-16 ${
          layout === 'right'
            ? 'lg:grid-cols-[1.2fr_1fr]'
            : layout === 'full' || layout === 'stacked'
              ? 'lg:grid-cols-1'
              : 'lg:grid-cols-2'
        }`}
      >
        <div className={`narrative-column relative ${layout === 'right' ? 'lg:order-2' : ''}`}>
          <div className="sticky-content rounded-xl border border-neutral-800 bg-bg-section/80 p-8 backdrop-blur">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
              {section.decade}
            </span>
            <h2 className="mb-2 text-[clamp(2rem,4vw,3rem)] font-bold">{section.title}</h2>
            <h3 className="mb-8 text-[clamp(1.25rem,2vw,1.5rem)] font-normal text-text-secondary">
              {section.subtitle}
            </h3>

            <div className="narrative-text space-y-6">
              {section.narrative.map((paragraph, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-neutral-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {hint && (
              <div
                role="note"
                className="mt-8 flex items-start gap-4 rounded border-l-4 border-accent bg-accent/10 p-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mt-1 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-accent-subtle">{hint}</p>
              </div>
            )}
          </div>
        </div>

        <div className={`media-column flex items-center justify-center ${layout === 'right' ? 'lg:order-1' : ''}`}>
          <div className="chart-container w-full">
            <p className="mb-8 rounded-lg border-l-4 border-accent bg-bg-section/60 p-6 text-lg leading-relaxed text-neutral-300">
              {section.chartExplainer}
            </p>
            <div className="chart-wrapper rounded-xl border border-neutral-800 bg-bg-section p-8">
              <ChartWrapper section={section} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DecadeSection;
