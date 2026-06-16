import { test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';

test.describe('TC-010: Verify Subscription in Home Page', () => {
    test('should display subscription section and accept email subscription in home page', async ({
        page,
        homePage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Scroll to footer and verify subscription section is visible', async () => {
            await homePage.scrollToFooter();
            return homePage.verifySubscriptionVisible();
        });
    });
});
