import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';
import { DataFactory } from '@utils/DataFactory';
import { User } from '@models/UserModels';
import { PaymentDetails } from '@models/PaymentModels';
import { TestData } from '@constants/TestData';

test.describe('TC-015: Place Order: Register Before Checkout', () => {
    let user: User;
    const paymentData: PaymentDetails = DataFactory.generatePaymentDetails();

    test('should allow a pre-registered user to complete an order', async ({
        page,
        homePage,
        cartPage,
        productsPage,
        productDetailPage,
        signUpLogInPage,
        checkoutSteps,
        checkoutPage,
        paymentPage,
        paymentDonePage,
        accountDeletedPage,
        signupPage,
        accountCreatedPage,
    }) => {
        user = DataFactory.generateUser();

        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Open the Signup / Login page', async () => {
            await homePage.navigationMenu.clickSignupLogin();
            return expect(
                signUpLogInPage.newUserHeader,
                'New User Signup! header should be visible',
            ).toBeVisible();
        });

        await test.step('Fill in signup details and create the account', async () => {
            await signUpLogInPage.signup(user);
            await expect(
                signupPage.accountInfoHeading,
                'Enter Account Information heading should be visible',
            ).toBeVisible();
            await signupPage.fillAccountDetails(user);
            return signupPage.clickCreateAccount();
        });

        await test.step('Verify account created and confirm the user is logged in', async () => {
            await expect(
                accountCreatedPage.successMessage,
                'ACCOUNT CREATED! message should be displayed',
            ).toHaveText(TestData.AUTH.SUCCESS_MESSAGES.ACCOUNT_CREATED);
            await accountCreatedPage.clickContinue();
            await homePage.verifyPageOpened();
            await expect(homePage.loggedInText, 'Logged in status should be visible').toBeVisible();
            return expect(
                homePage.loggedInText,
                `Logged in banner should contain the username "${user.name}"`,
            ).toContainText(user.name);
        });

        await test.step('Add a product to the cart and proceed to checkout', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.clickViewProduct();
            await productDetailPage.verifyPageOpened();
            await productDetailPage.waitForLoadState('load');
            await productDetailPage.addToCart();
            await productDetailPage.clickViewCart();
            await cartPage.verifyPageOpened();
            return cartPage.clickProceedToCheckout();
        });

        await test.step('Verify Address Details and Review Your Order', async () => {
            await checkoutSteps.verifyDeliveryAddress(user);
            return checkoutSteps.verifyBillingAddress(user);
        });

        await test.step('Leave a comment and place the order', async () => {
            const itemDescription = await checkoutPage.getOrderItemDescriptions();
            await checkoutPage.enterComment(itemDescription);
            return checkoutPage.clickPlaceOrder();
        });

        await test.step('Fill in payment details and confirm the order', async () => {
            await paymentPage.verifyPaymentPageVisible();
            await paymentPage.fillPaymentDetails(paymentData);
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
