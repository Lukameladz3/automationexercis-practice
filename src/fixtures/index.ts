import { test as base } from '@playwright/test';
import { PageFixtures, pageFixtures } from './page.fixture';
import { StepsFixtures, stepsFixtures } from './steps.fixture';

export const test = base.extend<PageFixtures & StepsFixtures>({
    ...pageFixtures,
    ...stepsFixtures,
});

export { expect } from '@playwright/test';
