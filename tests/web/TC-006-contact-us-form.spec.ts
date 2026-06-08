import { test } from '@fixtures/page.fixture';
import { DataFactory } from '@utils/DataFactory';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';
import { TestData } from '@constants/TestData';

test.describe('TC-006: Contact Us Form', () => {
    const contactData = DataFactory.generateContactData();

    test('should successfully submit the contact us form with file attachment', async ({
        page,
        homePage,
        contactUsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to Contact Us page', async () => {
            await homePage.navigationMenu.clickContactUs();
            return contactUsPage.verifyPageOpened(
                'After clicking Contact Us in navigation, Contact Us page should be open',
            );
        });

        await test.step('Fill in contact form and upload file attachment', async () => {
            await contactUsPage.verifyFormContentVisible();
            await contactUsPage.fillContactForm(contactData);
            return contactUsPage.uploadFile(TestData.FILES.CONTACT_FORM_ATTACHMENT);
        });

        await test.step('Submit contact form and verify success message', async () => {
            await contactUsPage.submitForm();
            return contactUsPage.verifySuccessMessage();
        });

        await test.step('Click Home button and verify that landed to home page successfully', async () => {
            await contactUsPage.clickHomeButton();
            return homePage.verifyPageOpened();
        });
    });
});
