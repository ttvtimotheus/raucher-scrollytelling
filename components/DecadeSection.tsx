'use client';

import { useEffect, useState } from 'react';

import type { DecadeSection as DecadeSectionType } from '@/lib/data/decades';
import { getBirthYearHint, useBirthYear } from '@/lib/context/BirthYearContext';
import ChartWrapper from './ChartWrapper';
import AdPosterShowcase from './AdPosterShowcase';
import { advertisingData } from '@/lib/data/adPosters';

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
  const adData = advertisingData[colorTheme];

  const bgClass = colorTheme === '1950' || colorTheme === '1980' || colorTheme === '2000' ? 'bg-[#0f0f0f]' : 'bg-[#050505]';

  return (
    <section
      id={section.id}
      data-decade={colorTheme}
      className={`decade-section relative min-h-screen ${bgClass} ${isVisible ? 'opacity-100' : 'opacity-0'} py-20`}
    >
      {/* Spotlight Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] bg-gradient-radial from-smoke-500/5 to-transparent blur-3xl" />
      </div>

      <div
        className={`section-grid relative mx-auto grid min-h-screen max-w-[1400px] items-center gap-8 p-8 lg:gap-16 ${
          layout === 'right'
            ? 'lg:grid-cols-[1.2fr_1fr]'
            : layout === 'full' || layout === 'stacked'
              ? 'lg:grid-cols-1'
              : 'lg:grid-cols-2'
        }`}
      >
        <div className={`narrative-column relative ${layout === 'right' ? 'lg:order-2' : ''}`}>
          <div className="sticky-content glass-panel rounded-2xl p-10">
            {/* Era Badge */}
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-smoke-500" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-smoke-400">
                {section.decade}
              </span>
            </div>
            
            <h2 className="mb-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">{section.title}</h2>
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
                className="mt-8 flex items-start gap-4 rounded-xl border border-smoke-500/30 bg-smoke-500/10 p-6 backdrop-blur"
              >
                <div className="rounded-full bg-smoke-500/20 p-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-smoke-400">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-smoke-400">{hint}</p>
              </div>
            )}
          </div>
        </div>

        <div className={`media-column flex items-center justify-center ${layout === 'right' ? 'lg:order-1' : ''}`}>
          <div className="chart-container w-full space-y-6">
            {/* Chart Context */}
            <div className="glass-panel rounded-xl border-l-4 border-smoke-500 p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-smoke-400 mb-3">
                Die Daten zeigen
              </p>
              <p className="text-lg leading-relaxed text-neutral-300">
                {section.chartExplainer}
              </p>
            </div>
            
            {/* Chart */}
            <div className="glass-panel rounded-2xl p-8">
              <ChartWrapper section={section} />
            </div>
          </div>
        </div>
      </div>

      {/* Ad Poster Showcase */}
      {adData && (
        <div className="relative mx-auto max-w-[1400px] px-8">
          <AdPosterShowcase
            decade={adData.decade}
            posters={adData.posters}
            learningPoints={adData.learningPoints}
          />
        </div>
      )}
    </section>
  );
}

export default DecadeSection;
