import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ContactData } from '@models/ContactModel';

export class ContactUsPage extends BasePage {
    readonly getInTouchHeading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageTextarea: Locator;
    readonly fileUploadInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        super(
            page,
            page.getByRole('heading', { name: /get in touch/i }).describe('Get in touch heading'),
        );

        this.getInTouchHeading = this.uniqueLocator!;
        this.nameInput = this.page.getByTestId('name').describe('Name input');
        this.emailInput = this.page.getByTestId('email').describe('Email input');
        this.subjectInput = this.page.getByTestId('subject').describe('Subject input');
        this.messageTextarea = this.page.getByTestId('message').describe('Message textarea');
        this.fileUploadInput = this.page
            .locator("input[name='upload_file']")
            .describe('File upload input');
        this.submitButton = this.page.getByTestId('submit-button').describe('Submit button');
        this.successMessage = this.page
            .locator('.status.alert.alert-success')
            .describe('Success message');
        this.homeButton = this.page
            .locator('.btn.btn-success')
            .filter({ hasText: /home/i })
            .describe('Home button');
    }

    async fillContactForm(data: ContactData) {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.subjectInput.fill(data.subject);
        return this.messageTextarea.fill(data.message);
    }

    async uploadFile(filePath: string) {
        await this.fileUploadInput.setInputFiles(filePath);
    }

    async submitForm() {
        this.page.once('dialog', (dialog) => {
            dialog.accept();
        });

        return this.submitButton.click();
    }

    async verifySuccessMessage() {
        return expect(
            this.successMessage,
            'Success message element should be attached after contact form submission',
        ).toBeAttached();
    }

    async clickHomeButton() {
        return this.homeButton.click();
    }

    async verifyFormContentVisible() {
        await expect(
            this.getInTouchHeading,
            'Get in touch heading should be visible',
        ).toBeVisible();
        await expect(this.nameInput, 'Name input should be visible').toBeVisible();
        return expect(this.submitButton, 'Submit button should be visible').toBeVisible();
    }
}
