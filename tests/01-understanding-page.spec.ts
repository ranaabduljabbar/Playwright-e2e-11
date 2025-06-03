import { chromium,test } from "@playwright/test";


test('Setting apage', async()=> {
   const browser = await chromium.launch();
   const context = await browser.newContext();
   const page = await context.newPage();

    await page.goto('https://www.techglobal-training.com/mock-interviews/javascript/mock-interview-1');

const newPage = await context .newPage()
await newPage.goto('https://playwright.dev/dec/api/class-page')
})

test('Visiting a page', async({ page})=>{
    await page.goto('https://www.techglobal-training.com/mock-interviews/javascript/mock-interview-1');
});
