import {test, expect} from '@playwright/test'
import { title } from 'process'

test('Validate Todo List App UI',async ({page})=>{
     await page.goto('https://techglobal-training.com/frontend/todo-list')

    await expect(page.locator('.panel-heading.has-text-white')).toBeVisible
    await expect(page.locator('.panel-heading.has-text-white')).toHaveText('My Tasks')

    await expect(page.locator('#input-add')).toBeVisible()
    await expect(page.locator('#input-add')).toBeEnabled()
    
    await expect(page.locator('#add-btn')).toBeEnabled()
    await expect(page.locator('#search')).toBeEnabled()

    await expect(page.locator('.panel-block. todo-item ml-1. has-text-danger')).toBeVisible()
    await expect(page.locator('.panel-block .todo-item ml-1 .has-text-danger')).toHaveText('No tasks found')
    
    // Case 2

    await page.fill('#input-add', 'New Project')
    await page.click('#add-btn')

    await expect(page.locator('.panel-icon ')).toHaveText('New Project')

    await expect(page.locator('.panel-icon ')).toHaveCount(1)
    
    await page.locator('#input-add').click()

   const checkbox = page.locator('.panel-icon  input[type="checkbox"]', { hasText: 'New Project' });
    await expect(checkbox).toBeChecked()

    await page.locator('#clear').click()

    await page.click('.todo-item .delete')

   await page.locator('.todo-item .delete').click()

   const emptyMessage = page.locator('.todo-item'); 
await expect(emptyMessage).toHaveCount(0)

})

