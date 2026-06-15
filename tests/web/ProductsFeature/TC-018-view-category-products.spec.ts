import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';
import { TestData } from '@constants/TestData';

test.describe('TC-018: View Category Products', () => {
    const womenDressCategory = TestData.CATEGORIES.WOMEN_DRESS;
    const menJeansCategory = TestData.CATEGORIES.MEN_JEANS;

    test('should navigate through categories and verify products', async ({
        page,
        homePage,
        productsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Verify categories are visible', async () => {
            return expect(
                homePage.page.locator('.left-sidebar .panel-group'),
                'Categories sidebar should be visible',
            ).toBeVisible();
        });

        await test.step(`Navigate to ${womenDressCategory.category} > ${womenDressCategory.subcategory} and verify it opened correct category`, async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.selectCategory(
                womenDressCategory.category,
                womenDressCategory.subcategory,
            );
            return expect(productsPage.productsTitle).toContainText(womenDressCategory.expectedTitle);
        });

        await test.step(`Navigate to ${menJeansCategory.category} > ${menJeansCategory.subcategory} and verify it opened correct category`, async () => {
            await productsPage.selectCategory(
                menJeansCategory.category,
                menJeansCategory.subcategory,
            );
            return expect(productsPage.productsTitle).toContainText(menJeansCategory.expectedTitle);
        });
    });
});
