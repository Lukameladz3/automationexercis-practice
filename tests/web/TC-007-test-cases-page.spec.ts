import { test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';

test.describe('TC-007: Test Cases Page', () => {
    test('should successfully navigate to the Test Cases page', async ({
        page,
        homePage,
        testCasesPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
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
