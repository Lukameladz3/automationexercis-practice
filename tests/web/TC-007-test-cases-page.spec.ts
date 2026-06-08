import { test } from '@fixtures/page.fixture';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';

test.describe('TC-007: Test Cases Page', () => {
    test('should successfully navigate to the Test Cases page', async ({
        page,
        homePage,
        testCasesPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Click Test Cases in navigation menu', async () => {
            await homePage.navigationMenu.clickTestCases();
            return testCasesPage.verifyPageOpened(
                'After clicking Test Cases in navigation menu, Test Cases page should be open',
            );
        });
    });
});
