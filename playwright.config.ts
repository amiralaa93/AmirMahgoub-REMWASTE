import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

export default defineConfig({
  testDir: './e2e_UI',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'http://localhost:3000',
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',

		/* Record video only for failed tests */
		video: 'retain-on-failure',

		/* Each test is given 30 seconds */
		actionTimeout: 30000,

		/* Capture screenshot after each test's first failure */
		screenshot: 'on-first-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
  webServer: [
    {
      command: 'npm start',
      cwd: backendDir,
      port: 3001,
      timeout: 240000, // 4 minutes
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      stderr: 'pipe',
      env: {
        NODE_ENV: 'test',
        PORT: '3001',
      }
    },
    {
      command: 'npm start',
      url: 'http://localhost:3000',
      cwd: frontendDir,
      timeout: 240000, // 4 minutes
      reuseExistingServer: true,
      stdout: 'ignore',
      stderr: 'pipe',
      env: {
        NODE_ENV: 'test',
        BROWSER: 'none',
        PORT: '3000'
      }
    }
  ],
});