import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RegExpUtils } from '@utils/RegExpUtils';

export interface CartItem {
    name: string;
    price: string;
    quantity: string;
    total: string;
}

export class CartPage extends BasePage {
    readonly subscriptionHeading: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscriptionButton: Locator;
    readonly subscriptionSuccessMessage: Locator;
    readonly cartTable: Locator;
    readonly cartTableRows: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly registerLoginModalLink: Locator;
    readonly registerLogInModal: Locator;

    private readonly cartRowByProductName = (productName: string): Locator =>
        this.cartTableRows.filter({
            hasText: RegExpUtils.productNameToLooseRegExp(productName),
        });

    constructor(page: Page) {
        super(page, page.locator('#cart_info_table').describe('Cart info table'));

        this.subscriptionHeading = this.page
            .getByRole('heading', { name: /subscription/i })
            .describe('Subscription heading');
        this.subscriptionEmailInput = this.page
            .locator('#susbscribe_email')
            .describe('Subscription email input');
        this.subscriptionButton = this.page
            .locator('#subscribe')
            .describe('Subscription submit button');
        this.subscriptionSuccessMessage = this.page
            .locator('.alert-success.alert')
            .describe('Subscription success message');
        this.cartTable = this.page.locator('#cart_info_table').describe('Cart info table');
        this.cartTableRows = this.cartTable.locator('tbody tr').describe('Cart table rows');
        this.proceedToCheckoutButton = this.page
            .getByText('Proceed To Checkout')
            .describe('Proceed to checkout button');
        this.registerLogInModal = this.page
            .locator('.modal-content')
            .describe('Register / Log In Modal');
        this.registerLoginModalLink = this.registerLogInModal
            .getByRole('link', { name: /register.*login/i })
            .describe('Register/Login link in checkout modal');
    }

    async subscribeWithEmail(email: string) {
        await this.subscriptionEmailInput.scrollIntoViewIfNeeded();
        await this.subscriptionEmailInput.fill(email);
        return this.subscriptionButton.click();
    }

    async verifySubscriptionVisible() {
        return expect(
            this.subscriptionHeading,
            'Subscription heading should be visible',
        ).toBeVisible();
    }

    async verifySubscriptionSuccess() {
        return expect(
            this.subscriptionSuccessMessage,
            'Subscription success message should be visible',
        ).toContainText('You have been successfully subscribed!');
    }

    async getCartItems(): Promise<CartItem[]> {
        await this.cartTable.waitFor({ state: 'attached' });

        const items: CartItem[] = [];
        const count = await this.cartTableRows.count();

        for (let i = 0; i < count; i++) {
            const row = this.cartTableRows.nth(i);

            const name = await row.locator('.cart_description h4 a').textContent();
            const price = await row.locator('.cart_price p').textContent();
            const quantity = await row.locator('.cart_quantity button').textContent();
            const total = await row.locator('.cart_total_price').textContent();

            items.push({
                name: name?.trim() || '',
                price: price?.trim() || '',
                quantity: quantity?.trim() || '',
                total: total?.trim() || '',
            });
        }

        return items;
    }

    async getProductQuantity(productName: string): Promise<number> {
        const row = this.cartRowByProductName(productName);

        const quantityText = await row.locator('.cart_quantity button').textContent();
        return parseInt(quantityText?.trim() || '0', 10);
    }

    async clickProceedToCheckout() {
        return this.proceedToCheckoutButton.click();
    }

    async clickRegisterLoginFromModal() {
        return this.registerLoginModalLink.click();
    }
}
