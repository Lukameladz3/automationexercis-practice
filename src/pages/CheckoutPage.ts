import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly deliveryAddressSection: Locator;
    readonly billingAddressSection: Locator;
    readonly orderReviewTable: Locator;
    readonly orderCommentTextarea: Locator;
    readonly placeOrderButton: Locator;
    readonly checkoutHeading: Locator;
    readonly orderItemName: Locator;

    constructor(page: Page) {
        super(page, page.locator('#cart_info').describe('Order review table'));

        this.deliveryAddressSection = this.page
            .locator('#address_delivery')
            .describe('Delivery address section');
        this.billingAddressSection = this.page
            .locator('#address_invoice')
            .describe('Billing address section');
        this.orderReviewTable = this.page.locator('#cart_info').describe('Order review table');
        this.orderCommentTextarea = this.page
            .locator('textarea.form-control')
            .describe('Order comment textarea');
        this.placeOrderButton = this.page
            .getByRole('link', { name: /place order/i })
            .describe('Place order button');
        this.checkoutHeading = this.page
            .getByRole('heading', { name: /review your order/i })
            .describe('Checkout heading');
        this.orderItemName = this.orderReviewTable
            .locator('td.cart_description h4 a')
            .describe('Order item name link');
    }

    async getDeliveryAddressText(): Promise<string> {
        const text = await this.deliveryAddressSection.textContent();
        return text?.trim() || '';
    }

    async getBillingAddressText(): Promise<string> {
        const text = await this.billingAddressSection.textContent();
        return text?.trim() || '';
    }

    async getOrderItemDescriptions(): Promise<string> {
        const text = await this.orderItemName.textContent();
        return text?.trim() || '';
    }

    async enterComment(comment: string) {
        return this.orderCommentTextarea.fill(comment);
    }

    async clickPlaceOrder() {
        return this.placeOrderButton.click();
    }
}
