import {test, expect} from '@playwright/test'

test.describe('', ()=>{
    test.beforeEach(async({page}) =>{
        await page.goto('')
    })
    test('', async({page})=>{
       await expect(page.locator('dsjkhsgs')).toBeVisible()
        
    })
})
