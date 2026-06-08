import { Locator, Page } from '@playwright/test';

export class NavigationMenu {
    readonly page: Page;

    readonly productsLink: Locator;
    readonly signupLoginLink: Locator;
    readonly contactUsLink: Locator;
    readonly cartLink: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;
    readonly testCasesLink: Locator;

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
        this.testCasesLink = page
            .getByRole('link', { name: ' Test Cases', exact: true })
            .describe('Test Cases link');
    }

    async clickSignupLogin() {
        return this.signupLoginLink.click();
    }

    async clickDeleteAccount() {
        return this.deleteAccountLink.click();
    }

    async clickLogout() {
        return this.logoutLink.click();
    }

    async clickTestCases() {
        return this.testCasesLink.click();
    }

    async clickProducts() {
        return this.productsLink.click();
    }

    async clickCart() {
        await this.cartLink.click();
    }
}
