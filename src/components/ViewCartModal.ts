import { Locator, Page } from '@playwright/test';

export class ViewCartModal {
    readonly page: Page;
    readonly modal: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = this.page.locator('.modal-content').describe('View cart modal');
        this.continueShoppingButton = this.modal
            .getByRole('button', { name: /continue shopping/i })
            .describe('Continue shopping button');
        this.viewCartButton = this.modal
            .getByRole('link', { name: /view cart/i })
            .describe('View cart button in modal');
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
        return this.modal.waitFor({ state: 'hidden' });
    }

    async clickViewCart() {
        return this.viewCartButton.click();
    }

    async waitForVisible() {
        return this.modal.waitFor({ state: 'visible' });
    }
}
