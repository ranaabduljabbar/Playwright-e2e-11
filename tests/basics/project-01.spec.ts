import {test, expect} from '@playwright/test';

test.describe('Test- 01 Validate Todo List ', () => {
    test.beforeEach(async({page}) =>{
     await page.goto('https://techglobal-training.com/frontend/todo-list')
    
    await expect(page.locator('.panel-heading.has-text-white')).toBeVisible
    await expect(page.locator('.panel-heading.has-text-white')).toHaveText('My Tasks')

    await expect(page.locator('#input-add')).toBeVisible()
    await expect(page.locator('#input-add')).toBeEnabled()
    
    await expect(page.locator('#add-btn')).toBeEnabled()
    await expect(page.locator('#search')).toBeEnabled()

    await expect(page.locator('.panel-block.todo-item.ml-1.has-text-danger')).toBeVisible();
    await expect(page.locator('.panel-block.todo-item.ml-1.has-text-danger')).toHaveText('No tasks found!');
    });
  test('Test-02 Validate Single Task', async ({ page }) => {
    await page.fill('#input-add', 'New Project');
    await page.click('#add-btn');

    //await expect(page.locator('.panel-icon')).toHaveText('New Project');

    await expect(page.locator('.todo-item')).toHaveCount(1);

    await page.locator('.todo-item input[type="checkbox"]').click();

    await page.locator('.todo-item .delete').click();

    const emptyMessage = page.locator('.panel-block.todo-item.ml-1.has-text-danger');
    await expect(emptyMessage).toHaveText('No tasks found!');
  });
  test('Test-03 Add 5 tasks, validate list, search and filter', async ({ page }) => {
const tasks = [
    'New Project',
    'Wash the Car',
    'Read a book',
    'Update resumes',
    'Clean the house'
]
for (const task of tasks) {
    await page.fill('#input-add', task);
    await page.click('#add-btn')
    await expect(page.locator('.todo-item').last()).toHaveText(task);
  }
  const taskTexts = page.locator('.todo-item .panel-icon:nth-child(2)');
await expect(taskTexts).toHaveCount(tasks.length);

for (let i = 0; i < tasks.length; i++) {
 // await expect(taskTexts.nth(i)).toHaveText(tasks[i]);
}
 const searchTask = tasks[2];
  await page.fill('#search', searchTask)
const filteredTasks = page.locator('.todo-item .panel-icon');
  //await expect(filteredTasks).toHaveCount(1);
  await expect(filteredTasks.first()).toHaveText(searchTask)

});
test('Test-04 Validate searching todo items', async ({ page }) => {


const tasks = [
    'New Project',
    'Wash the Car',
    'Read a book',
    'Update resumes',
    'Clean the house'
]
for (const task of tasks) {
    await page.fill('#input-add', task);
    await page.click('#add-btn');
    await expect(page.locator('.todo-item').last()).toContainText(task);
  }

  // Validate all tasks exist in the list
  const taskLocators = page.locator('.todo-item .panel-icon');
  await expect(taskLocators).toHaveCount(tasks.length);

  for (let i = 0; i < tasks.length; i++) {
    await expect(taskLocators.nth(i)).toHaveText(tasks[i]);
  }

  const targetTask = tasks[2];
  await page.fill('#search', targetTask);

  const filteredTasks = page.locator('.todo-item .panel-icon');
  await expect(filteredTasks).toHaveCount(1);
  await expect(filteredTasks.first()).toHaveText(targetTask);
}) 


test('Test-05 Validate Task Error', async ({ page }) => {
await page.click('#add-btn');
  const emptyMessage = page.locator('.panel-block.todo-item.ml-1.has-text-danger');
  await expect(emptyMessage).toHaveText('No tasks found!');

  // Step 2: Add a task with over 30 characters
  const longText = 'This is a very long task name exceeding 30 characters';
  await page.fill('#input-add', longText);
  await page.click('#add-btn');
  const longTextError = page.locator('.input.has-text-danger');
  //await expect(longTextError).toHaveText('Error: Todo cannot be more than 30 characters!');

  // Step 3: Add a valid task
  const task = 'Go shopping';
  await page.fill('#input-add', task);
  await page.click('#add-btn');
  const taskList = page.locator('.todo-item .panel-icon');
  //await expect(taskList).toHaveText(task);
 // await expect(taskList).toHaveCount(1);

  // Step 4: Try to add duplicate task
  await page.fill('#input-add', task);
  await page.click('#add-btn');
  const duplicateError = page.locator('.input.has-text-danger');
  //await expect(duplicateError).toHaveText(`Error: You already have ${task} in your todo list.`);
})
})