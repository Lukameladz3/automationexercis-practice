import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly newUserHeader: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.newUserHeader = this.page.getByRole('heading', { name: 'New User Signup!' }).describe('New User Header');
        this.signupNameInput = this.getByDataQa('signup-name', 'Signup name input');
        this.signupEmailInput = this.getByDataQa('signup-email', 'Signup email input');
        this.signupBtn = this.getByDataQa('signup-button', 'Signup button');
    }

    async signup(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupBtn.click();
    }
}
