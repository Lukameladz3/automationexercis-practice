import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
    readonly successMessage: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.successMessage = this.page.getByText('Account Created!').describe('Success message');
        this.continueBtn = this.getByDataQa('continue-button', 'Continue button');
    }

    async clickContinue() {
        return this.continueBtn.click();
    }
}
