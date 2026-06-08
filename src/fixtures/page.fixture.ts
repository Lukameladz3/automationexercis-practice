import { test as base, expect } from '@playwright/test';
import { NavigationMenu } from '@components/NavigationMenu';
import { AccountCreatedPage } from '@pages/AccountCreatedPage';
import { AccountDeletedPage } from '@pages/AccountDeletedPage';
import { HomePage } from '@pages/HomePage';
import { LoginPage } from '@pages/LoginPage';
import { SignupPage } from '@pages/SignupPage';

export type PageFixtures = {
    accountCreatedPage: AccountCreatedPage;
    accountDeletedPage: AccountDeletedPage;
    homePage: HomePage;
    loginPage: LoginPage;
    signupPage: SignupPage;
    testCasesPage: TestCasesPage;
    productsPage: ProductsPage;
    productDetailPage: ProductDetailPage;
    cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
    accountCreatedPage: async ({ page }, use) => {
        await use(new AccountCreatedPage(page));
    },

    homePage: async ({ page }, use) => {
        const navigation = new NavigationMenu(page);
        await use(new HomePage(page, navigation));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    accountDeletedPage: async ({ page }, use) => {
        await use(new AccountDeletedPage(page));
    },

    testCasesPage: async ({ page }, use) => {
        await use(new TestCasesPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

export { expect };
