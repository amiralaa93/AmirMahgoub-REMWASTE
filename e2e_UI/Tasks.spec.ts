import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/tasks');
    await expect(page.locator('text=Your Tasks')).toBeVisible();
  });

  test('01_Should Create a New Task', async ({ page }) => {

    // Verify task management page is loaded
    await expect(page).toHaveURL('http://localhost:3000/tasks');

    // Create new task
    const taskText = 'Create Test Task';
    
    await page.fill('input[placeholder="Enter new task"]', taskText);
    await page.click('button:has-text("Add Task")');
    
    // Verify success message
    await expect(page.locator('.success-message')).toContainText('Task added successfully');
    // Verify the task is displayed in the task list
    await expect(page.locator('.task-list')).toContainText(taskText);
  });

  test('02_Should Edit an Existing Task', async ({ page }) => {
    await page.waitForTimeout(1500);

    // Create test task to edit it later
    const editedTaskText = 'Task to edit';
    await page.getByRole('textbox', { name: 'Enter new task' }).fill(editedTaskText);
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Verify task exists
    await page.waitForTimeout(1500); 
    await expect(page.locator(`text=${editedTaskText}`)).toBeVisible();
    
    // Edit the task
    await page.getByRole('button', { name: 'Edit' }).nth(1).click();  
    await page.getByRole('list').getByRole('textbox').fill('Edited task');
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Verify changes
    await expect(page.locator('.task-list')).toContainText('Edited task');
    await expect(page.locator('.success-message')).toContainText('Task updated successfully');
  });

  test('03_Should Delete a Task', async ({ page }) => {
    await page.waitForTimeout(1500);

    // Create test task to delete it later
    const deletedTaskText = 'This task will be deleted';
    await page.fill('input[placeholder="Enter new task"]', deletedTaskText);
    await page.click('button:has-text("Add Task")');
    
    // Verify task exists
    await page.waitForTimeout(1500); 
    await expect(page.locator(`text=${deletedTaskText}`)).toBeVisible();
    
    // Delete the task
    await page.getByRole('button', { name: 'Delete' }).nth(2).click();
    
    // Verify deletion
    await expect(page.locator(`text=${deletedTaskText}`)).not.toBeVisible();
    await expect(page.locator('.success-message')).toContainText('Task deleted successfully');  
  });
});