import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TestCasesPage extends BasePage {
    constructor(page: Page) {
        super(
            page,
            page
                .getByRole('heading', { name: 'Test Cases', exact: true })
                .describe('Test Cases page heading'),
        );
    }
}
