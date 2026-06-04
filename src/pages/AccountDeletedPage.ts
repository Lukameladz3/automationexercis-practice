import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountDeletedPage extends BasePage {
    readonly accountDeletedHeading: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(
            page,
            page.getByRole("heading", { name: /account deleted/i }).describe("Account deleted heading")
        );
        this.accountDeletedHeading = this.uniqueLocator!;
        this.continueButton = this.page
            .getByRole("link", { name: /continue/i })
            .describe("Continue button");
    }

    async verifyAccountDeleted() {
        return expect(
            this.accountDeletedHeading,
            "Account deleted heading should be visible"
        ).toBeVisible();
    }

    async clickContinue() {
        return this.continueButton.click();
    }
}
