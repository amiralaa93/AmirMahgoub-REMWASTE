import { test, expect } from '@playwright/test';

let username = `testuser_${Date.now()}`;
const password = 'testpass123';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('01_Should Show an Error Message in Register inCase Empty Credentials', async ({ page }) => {
    // Navigate to register page
    await page.click('text=Register');
    
    // Click on Register button in registration form without filling in credentials
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Verify error message
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();

    await page.waitForTimeout(2000); // Wait for navigation to complete
    await expect(page).toHaveURL('http://localhost:3000/register');
  });

  test('02_Should Register a New User', async ({ page }) => {
    // Navigate to register page
    await page.click('text=Register');
    
    // Fill in registration form
    await page.fill('input[type="text"]', username);
    await page.fill('input[type="password"]', password);
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Verify successful registration
    await expect(page.getByText('Registration successful!')).toBeVisible();

    await page.waitForTimeout(2000); // Wait for navigation to complete
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('03_Should Show an Error Message in Login inCase Empty Credentials', async ({ page }) => {
    // Navigate to register page
    await page.click('text=Login');
    
    // Click on Login button in login form without filling in credentials
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();

    await page.waitForTimeout(2000); // Wait for navigation to complete
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('04_Should Show an Error Message inCase Entering Invalid Credentials', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Login');
    
    // Fill in invalid credentials
    await page.fill('input[type="text"]', 'wronguser');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button:has-text("Login")');
    
    // Verify error message
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });

  test('05_Should Login with Valid credentials and Save it', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Login');
    
    // Fill in valid credentials
    await page.fill('input[type="text"]', username);
    await page.fill('input[type="password"]', password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify successful login
    await page.waitForTimeout(3000); // Wait for navigation to complete
    await expect(page).toHaveURL('http://localhost:3000/tasks');
    await expect(page.locator('text=Your Tasks')).toBeVisible();

    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    console.log('Authentication state saved to playwright/.auth/user.json');
  });
});