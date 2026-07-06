import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://mb.io/en-AE';

export default defineConfig({
  testDir: './tests/specs',
  timeout: 45_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'en-AE'
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 }
      }
    },
    {
      name: 'mobile',
      testMatch: /edge-cases\.spec\.ts/,
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium'
      }
    }
  ]
});
