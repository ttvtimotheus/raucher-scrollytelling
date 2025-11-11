import { writable } from 'svelte/store';

export const birthYear = writable<number | null>(null);

export function getBirthYearHint(year: number | null, decadeStart: number): string | null {
	if (!year) return null;
	
	if (year >= 1995 && year <= 2005 && decadeStart === 1990) {
		return `Für dich geboren ${year}: Diese Kurve zeigt deine Generation.`;
	}
	
	if (year >= 2005 && year <= 2015 && decadeStart === 2010) {
		return `Für dich geboren ${year}: Das ist deine Zeit. Die Vapes kamen, als du jung warst.`;
	}
	
	return null;
}
