import { expect, Locator, Page } from '@playwright/test';
import { NavigationMenu } from '../components/NavigationMenu';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly navigationMenu: NavigationMenu;
    readonly loggedInText: Locator;
    readonly subscriptionText: Locator;
    readonly footer: Locator;

    constructor(page: Page, navigation: NavigationMenu) {
        super(page, page.locator('h1, h2').first().describe('Home page heading'));
        this.navigationMenu = navigation;

        this.loggedInText = page
            .locator('li')
            .filter({ hasText: 'Logged in as' })
            .describe('Logged in text');
        this.footer = page.getByRole('contentinfo').describe('Footer');
        this.subscriptionText = page
            .getByRole('heading', { name: 'Subscription', exact: true })
            .describe('Subscription heading');
    }

    async verifyLoggedInVisible() {
        return expect(this.loggedInText, 'Logged in text should be visible').toBeVisible();
    }

    async scrollToFooter() {
        this.footer.scrollIntoViewIfNeeded();
    }

    async verifySubscriptionVisible() {
        await expect(this.subscriptionText, 'Subscription text should be visible').toBeVisible();
    }
}
