import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly subscriptionHeading: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscriptionButton: Locator;
    readonly subscriptionSuccessMessage: Locator;

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
}
