import { test, expect } from '@playwright/test';

test.describe('Playwright Actions', () => {
  test.beforeEach( async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/html-elements');
  });

  test('Hover - uncheck checkboxes', async({ page }) => {
  })
});
