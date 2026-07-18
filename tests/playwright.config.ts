import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end config. The smoke suite runs the real frontend against mock.shop
 * (no env needed — the Storefront layer defaults to mock.shop). Browsers must
 * be installed once with `pnpm exec playwright install chromium`.
 */
const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm --filter @exclusive-wear/frontend dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
