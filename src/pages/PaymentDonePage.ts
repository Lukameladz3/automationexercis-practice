import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TEST_DATA } from '@constants/TestData';

export class PaymentDonePage extends BasePage {
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page, page.locator("[data-qa='order-placed']").describe('Order placed message'));

        this.successMessage = this.page
            .locator("[data-qa='order-placed'] b")
            .describe('Order placed success message');
    }

    async verifyOrderSuccess() {
        await expect(this.successMessage, 'Order success message should be visible').toBeVisible();

        const messageText = await this.successMessage.textContent();
        return expect(
            messageText?.trim().toUpperCase(),
            `Success message should contain '${TEST_DATA.ORDERS.SUCCESS_MESSAGES.PLACED}'`,
        ).toContain(TEST_DATA.ORDERS.SUCCESS_MESSAGES.PLACED);
    }
}
