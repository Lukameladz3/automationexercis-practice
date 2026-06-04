import { Page } from '@playwright/test';

export class BrowserUtils {
    static async goto(page: Page, url: string): Promise<void> {
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
    }
}
