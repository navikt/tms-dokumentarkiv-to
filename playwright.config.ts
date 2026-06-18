import { defineConfig, devices } from "@playwright/test";

const PORT = 4321;
const origin = `http://localhost:${PORT}`;
const baseURL = `${origin}/dokumentarkiv`;

// The React islands fetch documents from the mock API (mine-saker-api) when
// running locally. Wait for this endpoint before starting the dev server.
const MOCK_READY_URL =
  "http://localhost:3000/mine-saker-api/v2/journalposter/alle";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: origin,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "pnpm mock",
      url: MOCK_READY_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    {
      command: `pnpm dev --port ${PORT}`,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
});
