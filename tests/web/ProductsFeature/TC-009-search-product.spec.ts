import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';
import { TEST_DATA } from '@constants/TestData';

test.describe('TC-009: Search Product', () => {
    const SEARCH_TERM = TEST_DATA.SEARCH.VALID_TERM_1;

    test('should display matching products when searching by keyword', async ({
        page,
        homePage,
        productsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
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

        await test.step(`Search for "${SEARCH_TERM}" and verify results are displayed`, async () => {
            await productsPage.search(SEARCH_TERM);
            await expect(productsPage.searchedProductsHeading).toBeVisible();
            const productCount = await productsPage.productItems.count();
            return expect(
                productCount,
                `Should have products matching "${SEARCH_TERM}"`,
            ).toBeGreaterThan(0);
        });
    });
});
