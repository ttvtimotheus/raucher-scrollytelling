'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type BirthYear = number | null;

interface BirthYearContextValue {
  birthYear: BirthYear;
  setBirthYear: (year: BirthYear) => void;
  resetBirthYear: () => void;
}

const BirthYearContext = createContext<BirthYearContextValue | undefined>(undefined);

export function BirthYearProvider({ children }: { children: React.ReactNode }) {
  const [birthYear, setBirthYearState] = useState<BirthYear>(null);

  const setBirthYear = useCallback((year: BirthYear) => {
    setBirthYearState(year);
  }, []);

  const resetBirthYear = useCallback(() => {
    setBirthYearState(null);
  }, []);

  const value = useMemo(
    () => ({
      birthYear,
      setBirthYear,
      resetBirthYear,
    }),
    [birthYear, resetBirthYear, setBirthYear],
  );

  return <BirthYearContext.Provider value={value}>{children}</BirthYearContext.Provider>;
}

export function useBirthYear(): BirthYearContextValue {
  const context = useContext(BirthYearContext);
  if (!context) {
    throw new Error('useBirthYear must be used within a BirthYearProvider');
  }
  return context;
}

export function getBirthYearHint(year: BirthYear, decadeStart: number): string | null {
  if (year == null) return null;

  if (year >= 1995 && year <= 2005 && decadeStart === 1990) {
    return `Für dich geboren ${year}: Diese Kurve zeigt deine Generation.`;
  }

  if (year >= 2005 && year <= 2015 && decadeStart === 2010) {
    return `Für dich geboren ${year}: Das ist deine Zeit. Die Vapes kamen, als du jung warst.`;
  }

  return null;
}
