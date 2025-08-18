// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  // Always retry failed tests (2 times)
  retries: 3,

  // Workers - parallel locally, single worker in CI
  workers: process.env.CI ? 1 : undefined,

  // Reporters: Console + HTML + JUnit + JSON (optional for CI/CD integration)
  reporter: [
    ['list'],  // console progress
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // generate HTML report
    ['junit', { outputFile: 'results.xml' }], // useful in CI tools like Jenkins/GitLab
    ['json', { outputFile: 'results.json' }]  // optional JSON report
  ],

  use: {
    screenshot: 'only-on-failure',   // take screenshot only if test fails
    video: 'retain-on-failure',      // keep video only on failure
    trace: 'retain-on-failure',      // keep trace only on failure
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
  ]
});
