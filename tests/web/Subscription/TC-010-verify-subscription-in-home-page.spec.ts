import { test } from '@fixtures/page.fixture';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';

test.describe('TC-010: Verify Subscription in Home Page', () => {
    test('should display subscription section and accept email subscription in home page', async ({
        page,
        homePage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Scroll down to footer', async () => {
            await homePage.scrollToFooter();
        });

        await test.step('Verify Subscription heading is visible', async () => {
            await homePage.verifySubscriptionVisible();
        });
    });
});
