import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    timeout: 60_000,
    use: {
        trace: 'on',
        testIdAttribute: "data-qa",
        navigationTimeout: 60_000,
        baseURL: process.env.BASE_URL || "https://www.automationexercise.com",
        actionTimeout: 15_000
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

    ],
});
