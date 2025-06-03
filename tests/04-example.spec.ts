import { test, expect } from '@playwright/test';
/*
Go to https://www.techglobal-training.com/frontend/actions
Click on "Click on me" button
Validate "You clicked on a button!" text is visible
*/
test('Click on button and validate message', async ({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/actions');

  // Click the button with text "Click on me"
  await page.getByRole('button', { name: 'Click on me', exact: true  }).click();

  // Validate the message is visible
  expect(await page.locator('#click_result').innerText()).toBe('You clicked on a button!')
  
});