import { test } from '@fixtures/page.fixture';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';
import { RandomDataGenerator } from '@utils/RandomDataGenerator';

test.describe('TC-011: Verify Subscription in Cart Page', () => {
    test('should display subscription section and accept email subscription in cart page', async ({
        page,
        homePage,
        cartPage,
    }) => {
        const testEmail = RandomDataGenerator.email();

        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to Cart page', async () => {
            await homePage.navigationMenu.clickCart();
        });

        await test.step('Scroll to subscription section in footer', async () => {
            await cartPage.subscriptionEmailInput.scrollIntoViewIfNeeded();
        });

        await test.step('Verify Subscription heading is visible', async () => {
            await cartPage.verifySubscriptionVisible();
        });

        await test.step('Enter email and submit subscription', async () => {
            await cartPage.subscribeWithEmail(testEmail);
        });

        await test.step('Verify subscription success message is displayed', async () => {
            await cartPage.verifySubscriptionSuccess();
        });
    });
});
