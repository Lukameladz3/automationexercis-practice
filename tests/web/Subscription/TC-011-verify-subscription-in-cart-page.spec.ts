import { test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';
import { RandomDataGenerator } from '@utils/RandomDataGenerator';

test.describe('TC-011: Verify Subscription in Cart Page', () => {
    test('should display subscription section and accept email subscription in cart page', async ({
        page,
        homePage,
        cartPage,
    }) => {
        const TEST_EMAIL = RandomDataGenerator.email();

        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to Cart page and verify subscription section is visible', async () => {
            await homePage.navigationMenu.clickCart();
            return cartPage.verifySubscriptionVisible();
        });

        await test.step('Subscribe with email and verify success message', async () => {
            await cartPage.subscribeWithEmail(TEST_EMAIL);
            return cartPage.verifySubscriptionSuccess();
        });
    });
});
