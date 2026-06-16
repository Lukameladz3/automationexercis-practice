import { expect, test } from '@fixtures/index';
import { DataFactory } from '@utils/DataFactory';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';

test.describe('TC-AUTH-003: Login User with incorrect email and password', () => {
    test('should show error message when logging in with invalid credentials', async ({
        page,
        homePage,
        signUpLogInPage,
    }) => {
        const user = DataFactory.generateUser();

        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to login page', async () => {
            await homePage.navigationMenu.clickSignupLogin();
            return expect(
                signUpLogInPage.newUserHeader,
                'New User Signup! header should be visible',
            ).toBeVisible();
        });

        await test.step('Enter incorrect credentials', async () => {
            return signUpLogInPage.login(user);
        });

        await test.step('Verify error message is displayed', async () => {
            return expect(
                signUpLogInPage.invalidCredentialsError,
                'Entering incorrect credentials should give error',
            ).toBeVisible();
        });
    });
});
