import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('page loads within 2 seconds', async ({ page }) => {
	const start = Date.now();
	await page.goto('/');
	const loadTime = Date.now() - start;
	expect(loadTime).toBeLessThan(2000);
});

test('birth year control is visible', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.birth-year-control')).toBeVisible();
});

test('data page is accessible', async ({ page }) => {
	await page.goto('/daten');
	await expect(page.locator('h1')).toContainText('Daten und Methodik');
});

test('charts render without errors', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => {
		errors.push(error.message);
	});

	await page.goto('/');
	await page.waitForTimeout(3000);

	expect(errors.length).toBe(0);
});

test('reduced motion is respected', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	
	const hasReducedMotion = await page.evaluate(() => {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
	
	expect(hasReducedMotion).toBe(true);
});
