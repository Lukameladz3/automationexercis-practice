import { Page } from '@playwright/test';
import { NavigationMenu } from '@components/NavigationMenu';
import { AccountCreatedPage } from '@pages/AccountCreatedPage';
import { AccountDeletedPage } from '@pages/AccountDeletedPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { ContactUsPage } from '@pages/ContactUsPage';
import { HomePage } from '@pages/HomePage';
import { SignUpLoginPage } from '@pages/SignUpLoginPage';
import { PaymentDonePage } from '@pages/PaymentDonePage';
import { PaymentPage } from '@pages/PaymentPage';
import { ProductDetailPage } from '@pages/ProductDetailPage';
import { ProductsPage } from '@pages/ProductsPage';
import { SignupPage } from '@pages/SignupPage';
import { TestCasesPage } from '@pages/TestCasesPage';

type Use<T> = (value: T) => Promise<void>;

export type PageFixtures = {
    accountCreatedPage: AccountCreatedPage;
    accountDeletedPage: AccountDeletedPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    contactUsPage: ContactUsPage;
    homePage: HomePage;
    signUpLogInPage: SignUpLoginPage;
    paymentDonePage: PaymentDonePage;
    paymentPage: PaymentPage;
    productDetailPage: ProductDetailPage;
    productsPage: ProductsPage;
    signupPage: SignupPage;
    testCasesPage: TestCasesPage;
};

export const pageFixtures = {
    accountCreatedPage: async ({ page }: { page: Page }, use: Use<AccountCreatedPage>) => {
        await use(new AccountCreatedPage(page));
    },

    accountDeletedPage: async ({ page }: { page: Page }, use: Use<AccountDeletedPage>) => {
        await use(new AccountDeletedPage(page));
    },

    cartPage: async ({ page }: { page: Page }, use: Use<CartPage>) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }: { page: Page }, use: Use<CheckoutPage>) => {
        await use(new CheckoutPage(page));
    },

    contactUsPage: async ({ page }: { page: Page }, use: Use<ContactUsPage>) => {
        await use(new ContactUsPage(page));
    },

    homePage: async ({ page }: { page: Page }, use: Use<HomePage>) => {
        const navigation = new NavigationMenu(page);
        await use(new HomePage(page, navigation));
    },

    signUpLogInPage: async ({ page }: { page: Page }, use: Use<SignUpLoginPage>) => {
        await use(new SignUpLoginPage(page));
    },

    paymentDonePage: async ({ page }: { page: Page }, use: Use<PaymentDonePage>) => {
        await use(new PaymentDonePage(page));
    },

    paymentPage: async ({ page }: { page: Page }, use: Use<PaymentPage>) => {
        await use(new PaymentPage(page));
    },

    productDetailPage: async ({ page }: { page: Page }, use: Use<ProductDetailPage>) => {
        await use(new ProductDetailPage(page));
    },

    productsPage: async ({ page }: { page: Page }, use: Use<ProductsPage>) => {
        await use(new ProductsPage(page));
    },

    signupPage: async ({ page }: { page: Page }, use: Use<SignupPage>) => {
        await use(new SignupPage(page));
    },

    testCasesPage: async ({ page }: { page: Page }, use: Use<TestCasesPage>) => {
        await use(new TestCasesPage(page));
    },
};
