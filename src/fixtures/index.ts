import { test as base } from '@playwright/test';
import { PageFixtures, pageFixtures } from './page.fixture';
import { StepsFixtures, stepsFixtures } from './steps.fixture';
import { BrowserUtils } from '@utils/BrowserUtils';

export const test = base.extend<PageFixtures & StepsFixtures>({
    page: async ({ page }, use) => {
        await BrowserUtils.blockAds(page);
        await use(page);
    },
    ...pageFixtures,
    ...stepsFixtures,
});

export { expect } from '@playwright/test';
