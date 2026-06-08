import { Page, Response } from '@playwright/test';

export class BrowserUtils {
    static async goto(page: Page, url: string): Promise<Response | null> {
        return page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
    }

    static clearSession(page: Page) {
        return page.context().clearCookies();
    }
}
