import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('File Upload & Download', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/file-download');
  });

  test('File Download', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#file_download').click()
    ]);

    const path = 'downloads/' + download.suggestedFilename();
    await download.saveAs(path);
    
    expect(fs.existsSync(path)).toBeTruthy();
  });
  test('File Upload',async({page})=>{
    
  })
});






