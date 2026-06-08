import { test, expect } from '@fixtures/page.fixture';
import { DataFactory } from '@utils/DataFactory';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';
import { User } from '@models/UserModels';
import { TestData } from '@constants/TestData';

test.describe('TC-AUTH-005: Register User with existing email', () => {
    let user: User;

    test.beforeEach(async ({ page, homePage, loginPage, signupPage, accountCreatedPage }) => {
        user = DataFactory.generateUser();

        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to signup page', async () => {
            await homePage.navigationMenu.clickSignupLogin();
            return expect(
                loginPage.newUserHeader,
                'New User Signup! header should be visible',
            ).toBeVisible();
        });

        await test.step('Enter signup credentials', async () => {
            return loginPage.signup(user);
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
            ).toHaveText(TestData.AUTH.SUCCESS_MESSAGES.ACCOUNT_CREATED);
        });

        await test.step('Continue to homepage and clear session', async () => {
            await accountCreatedPage.clickContinue();
            return BrowserUtils.clearSession(page);
        });
    });

    test('should show error message when registering with an already registered email', async ({
        page,
        homePage,
        loginPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to signup page', async () => {
            await homePage.navigationMenu.clickSignupLogin();
            return expect(
                loginPage.newUserHeader,
                'New User Signup! header should be visible',
            ).toBeVisible();
        });

        await test.step('Enter already registered email', async () => {
            return loginPage.signup(user);
        });

        await test.step('Verify duplicate email error message', async () => {
            return expect(
                loginPage.duplicateEmailError,
                'Error message for duplicate email should be visible',
            ).toBeVisible();
        });
    });
});
