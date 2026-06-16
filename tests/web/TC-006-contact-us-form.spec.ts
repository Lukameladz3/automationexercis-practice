import { test } from '@fixtures/index';
import { DataFactory } from '@utils/DataFactory';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';
import { TEST_DATA } from '@constants/TestData';

test.describe('TC-006: Contact Us Form', () => {
    const CONTACT_DATA = DataFactory.generateContactData();

    test('should successfully submit the contact us form with file attachment', async ({
        page,
        homePage,
        contactUsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
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
            await contactUsPage.fillContactForm(CONTACT_DATA);
            await contactUsPage.uploadFile(TEST_DATA.FILES.CONTACT_FORM_ATTACHMENT);
            await page.pause();
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
