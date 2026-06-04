import { Locator, Page } from '@playwright/test';

export class NavigationMenu {
    readonly page: Page;

    readonly productsLink: Locator;
    readonly signupLoginLink: Locator;
    readonly contactUsLink: Locator;
    readonly cartLink: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productsLink = page.getByRole('link', { name: 'Products' }).describe('Products link');
        this.cartLink = page.getByText(' Cart', { exact: true }).describe('Cart link');
        this.signupLoginLink = page
            .getByRole('link', { name: 'Signup / Login' })
            .describe('Signup / Login link');
        this.contactUsLink = page
            .getByRole('link', { name: 'Contact us' })
            .describe('Contact us link');
        this.logoutLink = page.getByRole('link', { name: 'Logout' }).describe('Logout link');
        this.deleteAccountLink = page
            .getByRole('link', { name: ' Delete Account' })
            .describe('Delete Account link');
    }

    async clickSignupLogin() {
        return this.signupLoginLink.click();
    }

    async clickDeleteAccount() {
        return this.deleteAccountLink.click();
    }
}
