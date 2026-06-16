import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '@models/UserModels';
import { TEST_DATA } from '@constants/TestData';

export class LoginPage extends BasePage {
    readonly newUserHeader: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupBtn: Locator;

    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginBtn: Locator;
    readonly invalidCredentialsError: Locator;
    readonly duplicateEmailError: Locator;

    constructor(page: Page) {
        super(page);

        this.newUserHeader = this.page
            .getByRole('heading', { name: 'New User Signup!' })
            .describe('New User Header');
        this.signupNameInput = this.getByDataQa('signup-name', 'Signup name input');
        this.signupEmailInput = this.getByDataQa('signup-email', 'Signup email input');
        this.signupBtn = this.getByDataQa('signup-button', 'Signup button');
        this.loginEmailInput = this.getByDataQa('login-email', 'Login email input');
        this.loginPasswordInput = this.getByDataQa('login-password', 'Login password input');
        this.loginBtn = this.getByDataQa('login-button', 'Login button');
        this.invalidCredentialsError = this.page
            .getByText(TEST_DATA.AUTH.ERROR_MESSAGES.INVALID_CREDENTIALS)
            .describe('Invalid credentials error message');
        this.duplicateEmailError = this.page
            .getByText(TEST_DATA.AUTH.ERROR_MESSAGES.DUPLICATE_EMAIL)
            .describe('Duplicate email error message');
    }

    async signup(user: User) {
        await this.signupNameInput.fill(user.name);
        await this.signupEmailInput.fill(user.email);
        return this.signupBtn.click();
    }

    async login(user: User) {
        await this.loginEmailInput.fill(user.email);
        await this.loginPasswordInput.fill(user.password);
        return this.loginBtn.click();
    }
}
