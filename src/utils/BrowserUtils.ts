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

}
