import { expect, test } from '@fixtures/index';
import { DataFactory } from '@utils/DataFactory';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';
import { User } from '@models/UserModels';
import { TEST_DATA } from '@constants/TestData';

test.describe('TC-AUTH-005: Register User with existing email', () => {
    let user: User;

    test.beforeEach(async ({ page, homePage, signUpLogInPage, signupPage, accountCreatedPage }) => {
        user = DataFactory.generateUser();

        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to signup page', async () => {
            await homePage.navigationMenu.clickSignupLogin();
            return expect(
                signUpLogInPage.newUserHeader,
                'New User Signup! header should be visible',
            ).toBeVisible();
        });

        await test.step('Enter signup credentials', async () => {
            return signUpLogInPage.signup(user);
        });

        await test.step('Verify account information page loaded', async () => {
            return expect(
                signupPage.accountInfoHeading,
                'Enter Account Information heading should be visible',
            ).toBeVisible();
        });

        await test.step('Fill complete account information', async () => {
            return signupPage.fillAccountDetails(user);
        });

        await test.step('Submit account creation', async () => {
            return signupPage.clickCreateAccount();
        });

        await test.step('Verify account created successfully', async () => {
            return expect(
                accountCreatedPage.successMessage,
                'ACCOUNT CREATED! message should be displayed',
            ).toHaveText(TEST_DATA.AUTH.SUCCESS_MESSAGES.ACCOUNT_CREATED);
        });

        await test.step('Continue to homepage and clear session', async () => {
            await accountCreatedPage.clickContinue();
            return BrowserUtils.clearSession(page);
        });
    });

    test('should show error message when registering with an already registered email', async ({
        page,
        homePage,
        signUpLogInPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to signup page', async () => {
            await homePage.navigationMenu.clickSignupLogin();
            return expect(
                signUpLogInPage.newUserHeader,
                'New User Signup! header should be visible',
            ).toBeVisible();
        });

        await test.step('Enter already registered email', async () => {
            return signUpLogInPage.signup(user);
        });

        await test.step('Verify duplicate email error message', async () => {
            return expect(
                signUpLogInPage.duplicateEmailError,
                'Error message for duplicate email should be visible',
            ).toBeVisible();
        });
    });
});
