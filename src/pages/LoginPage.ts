import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly newUserHeader: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupBtn: Locator;

    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.newUserHeader = this.page.getByRole('heading', { name: 'New User Signup!' }).describe('New User Header');
        this.signupNameInput = this.getByDataQa('signup-name', 'Signup name input');
        this.signupEmailInput = this.getByDataQa('signup-email', 'Signup email input');
        this.signupBtn = this.getByDataQa('signup-button', 'Signup button');
        this.loginEmailInput = this.getByDataQa('login-email', 'Login email input');
        this.loginPasswordInput = this.getByDataQa('login-password', 'Login password input');
        this.loginBtn = this.getByDataQa('login-button', 'Login button');
    }

    async signup(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        return this.signupBtn.click();
    }

    async login(email: string, pass: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(pass);
        return this.loginBtn.click();
    }
}
