import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';
import { DataFactory } from '@utils/DataFactory';
import { User } from '@models/UserModels';
import { PaymentDetails } from '@models/PaymentModels';

test.describe('TC-014: Place Order: Register During Checkout', () => {
    const USER: User = DataFactory.generateUser();
    const PAYMENT_DATA: PaymentDetails = DataFactory.generatePaymentDetails();

    test('should allow a guest user to register during checkout and complete an order', async ({
        page,
        homePage,
        cartPage,
        productsPage,
        productDetailPage,
        signUpLogInPage,
        signupPage,
        accountCreatedPage,
        checkoutSteps,
        checkoutPage,
        paymentPage,
        paymentDonePage,
        accountDeletedPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Add a product to the cart and open the cart page', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.waitForLoadState('load');
            await productsPage.clickViewProduct(0);
            await productDetailPage.waitForLoadState('load');
            await productDetailPage.addToCart();
            await productDetailPage.clickViewCart();
            return cartPage.verifyPageOpened();
        });

        await test.step('Proceed to checkout and click Register / Login', async () => {
            await cartPage.clickProceedToCheckout();
            return cartPage.clickRegisterLoginFromModal();
        });

        await test.step('Fill in signup details and create the account', async () => {
            await signUpLogInPage.signup(USER);
            await signupPage.fillAccountDetails(USER);
            return signupPage.clickCreateAccount();
        });

        await test.step('Verify account created, confirm login, go back to cart and proceed to checkout', async () => {
            await expect(accountCreatedPage.successMessage).toBeVisible();
            await accountCreatedPage.clickContinue();
            await homePage.verifyLoggedInVisible();
            await homePage.navigationMenu.clickCart();
            return cartPage.clickProceedToCheckout();
        });

        await test.step('Verify Address Details and Review Your Order', async () => {
            await checkoutSteps.verifyDeliveryAddress(USER);
            return checkoutSteps.verifyBillingAddress(USER);
        });

        await test.step('Leave a comment and place the order', async () => {
            const itemDescription = await checkoutPage.getOrderItemDescriptions();
            await checkoutPage.enterComment(itemDescription);
            return checkoutPage.clickPlaceOrder();
        });

        await test.step('Fill in payment details and confirm the order', async () => {
            await paymentPage.verifyPaymentPageVisible();
            await paymentPage.fillPaymentDetails(PAYMENT_DATA);
            return paymentPage.clickPayAndConfirm();
        });

        await test.step('Verify order success, delete the account and return to home page', async () => {
            await paymentDonePage.verifyOrderSuccess();
            await homePage.navigationMenu.clickDeleteAccount();
            await accountDeletedPage.verifyAccountDeleted();
            await accountDeletedPage.clickContinue();
            return homePage.verifyPageOpened();
        });
    });
});
