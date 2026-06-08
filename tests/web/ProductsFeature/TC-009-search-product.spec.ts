import { expect, test } from '@fixtures/page.fixture';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';
import { TestData } from '@constants/TestData';

test.describe('TC-009: Search Product', () => {
    const searchTerm = TestData.SEARCH.VALID_TERM_1;

    test('should display matching products when searching by keyword', async ({
        page,
        homePage,
        productsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to Products page and verify products list is displayed', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.verifyPageOpened(
                'After clicking Products in navigation, Products page should be open',
            );
            await expect(productsPage.productsList).toBeVisible();
            const productsCount = await productsPage.getProductCount();
            return expect(productsCount).toBeGreaterThan(0);
        });

        await test.step(`Search for "${searchTerm}" and verify results are displayed`, async () => {
            await productsPage.search(searchTerm);
            await expect(productsPage.searchedProductsHeading).toBeVisible();
            const productCount = await productsPage.productItems.count();
            return expect(productCount, `Should have products matching "${searchTerm}"`).toBeGreaterThan(
                0,
            );
        });
    });
});
