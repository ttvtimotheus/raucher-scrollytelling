'use client';

import { useEffect, useRef, useState } from 'react';

import type { DecadeSection } from '@/lib/data/decades';
import { createSectionScroll } from '@/lib/gsap/scrollOrchestrator';
import { initChart1950 } from '@/lib/charts/chart1950';
import { initChart1970 } from '@/lib/charts/chart1970';
import { initChart1990 } from '@/lib/charts/chart1990';
import { initChart2000 } from '@/lib/charts/chart2000';
import { initChart2010 } from '@/lib/charts/chart2010';
import { initWorldDeaths } from '@/lib/charts/worldDeaths';

import series1950 from '@/lib/data/series1950.json';
import series1970 from '@/lib/data/series1970.json';
import series1990 from '@/lib/data/series1990.json';
import series2000 from '@/lib/data/series2000.json';
import series2010 from '@/lib/data/series2010.json';
import worldDeaths from '@/lib/data/deaths_world.json';

interface ChartWrapperProps {
  section: DecadeSection;
}

export function ChartWrapper({ section }: ChartWrapperProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<{ update?: (progress: number) => void; destroy?: () => void } | null>(null);
  const scrollTriggerRef = useRef<{ kill: () => void } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const initChart = async () => {
      try {
        const container = chartContainerRef.current;
        if (!container) return;

        switch (section.chartType) {
          case '1950':
            chartInstanceRef.current = initChart1950(container, series1950.data);
            break;
          case '1970':
            chartInstanceRef.current = initChart1970(container, series1970.data);
            break;
          case '1980':
            chartInstanceRef.current = initChart1970(container, series1970.data);
            break;
          case '1990':
            chartInstanceRef.current = initChart1990(container, series1990.data);
            break;
          case '2000':
            chartInstanceRef.current = initChart2000(container, series2000.data);
            break;
          case '2010':
            chartInstanceRef.current = initChart2010(container, series2010.data);
            break;
          case 'world':
            chartInstanceRef.current = await initWorldDeaths(container, worldDeaths);
            break;
        }

        if (chartInstanceRef.current) {
          scrollTriggerRef.current = createSectionScroll(
            section.id,
            (progress) => {
              if (chartInstanceRef.current?.update) {
                chartInstanceRef.current.update(progress);
              }
            },
            true,
          );
        }
      } catch (err) {
        console.error('Chart initialization failed:', err);
        setError('Chart konnte nicht geladen werden');
      }
    };

    initChart();

    return () => {
      if (chartInstanceRef.current?.destroy) {
        chartInstanceRef.current.destroy();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [section.chartType, section.id]);

  if (error) {
    return <div className="flex min-h-[400px] items-center justify-center text-text-secondary">{error}</div>;
  }

  return <div ref={chartContainerRef} className="chart-element min-h-[400px] w-full" />;
}

export default ChartWrapper;
