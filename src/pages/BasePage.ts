import { expect, Locator, Page } from '@playwright/test';
import { NavigationMenu } from '../components/NavigationMenu';

export abstract class BasePage {
    readonly page: Page;
    readonly navigation: NavigationMenu;
    readonly uniqueLocator?: Locator;

    constructor(page: Page, uniqueLocator?: Locator) {
        this.page = page;
        this.navigation = new NavigationMenu(page);
        this.uniqueLocator = uniqueLocator;
    }

    protected getByDataQa(name: string, description: string): Locator {
        return this.page.getByTestId(name).describe(description);
    }

    async verifyPageOpened(customMessage?: string) {
        if (!this.uniqueLocator) {
            throw new Error(
                'Cannot verify page opened: uniqueLocator not defined in page object constructor',
            );
        }

        const message = customMessage || `Page should be opened (unique locator should be visible)`;
        return expect(this.uniqueLocator, message).toBeVisible();
    }
}
