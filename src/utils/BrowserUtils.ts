import { expect, Locator, Page, Response } from '@playwright/test';

export class BrowserUtils {
    static async goto(page: Page, url: string): Promise<Response | null> {
        return page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
    }

    static clearSession(page: Page) {
        return page.context().clearCookies();
    }

    static async verifyVisible(locator: Locator, message?: string) {
        const defaultMessage = 'Element should be visible';
        return expect(locator, message ?? defaultMessage).toBeVisible();
    }

    static dismissAds(page: Page): void {
        page.context().on('page', async (popup) => {
            await popup.close();
        });

        const removeAdOverlay = async () => {
            await page
                .evaluate(() => {
                    const adIframe = document.querySelector<HTMLElement>(
                        'iframe[id^="aswift"], iframe[id^="google_ads"], div#ad_position_box',
                    );
                    if (adIframe) adIframe.remove();
                })
                .catch(() => {});
        };

        page.on('load', removeAdOverlay);
        page.on('domcontentloaded', removeAdOverlay);

        const adModalInterval = setInterval(async () => {
            try {
                const closeButton = page.getByText('Close', { exact: true });
                if (await closeButton.isVisible({ timeout: 0 })) {
                    await closeButton.click({ timeout: 0 });
                }
            } catch {}
        }, 500);

        page.on('close', () => clearInterval(adModalInterval));
    }
}
