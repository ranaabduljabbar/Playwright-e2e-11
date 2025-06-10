/*
Go to https://www.wikipedia.org/
Search for "Playwright"
Validate the url contains "Playwright"
Validate the title contains "Playwright"
Validate the main heading is "Playwright"
*/

import { test, expect, chromium } from '@playwright/test';

test('Search for Playwright on Wikipedia', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  await page.fill('input[name="search"]', 'playwright');
  await page.press('input[name="search"]', 'Enter');

  await expect(page).toHaveTitle(/Playwright/);

  const heading = await page.locator('#firstHeading');
  await expect(heading).toHaveText(/Playwright/);
});