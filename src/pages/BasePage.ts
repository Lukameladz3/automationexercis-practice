import { expect, Locator, Page } from '@playwright/test';
import { NavigationMenu } from '../components/NavigationMenu';

export abstract class BasePage {
    readonly page: Page;
    readonly navigationMenu: NavigationMenu;
    readonly uniqueLocator?: Locator;

    constructor(page: Page, uniqueLocator?: Locator) {
        this.page = page;
        this.navigationMenu = new NavigationMenu(page);
        this.uniqueLocator = uniqueLocator;
        this.dismissAds();
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
        const message = customMessage ?? `Page should be opened (unique locator should be visible)`;
        return expect(this.uniqueLocator, message).toBeVisible();
    }

    async waitForLoadState(state: 'domcontentloaded' | 'load' | 'networkidle' = 'load') {
        return this.page.waitForLoadState(state);
    }

    private dismissAds(): void {
        const pageContext = this.page as Record<string, any>;
        if (pageContext._adsHandled) return;
        pageContext._adsHandled = true;

        this.page.context().on('page', async (popup) => {
            await popup.close();
        });

        const removeAdOverlay = async () => {
            await this.page
                .evaluate(() => {
                    const adIframe = document.querySelector<HTMLElement>(
                        'iframe[id^="aswift"], iframe[id^="google_ads"], div#ad_position_box',
                    );
                    if (adIframe) adIframe.remove();
                })
                .catch(() => {});
        };

        this.page.on('load', removeAdOverlay);
        this.page.on('domcontentloaded', removeAdOverlay);

        const adModalInterval = setInterval(async () => {
            try {
                const closeButton = this.page.getByText('Close', { exact: true });
                if (await closeButton.isVisible({ timeout: 0 })) {
                    await closeButton.click({ timeout: 0 });
                }
            } catch {}
        }, 500);

        this.page.on('close', () => clearInterval(adModalInterval));
    }
}
