import { expect, test } from '@fixtures/page.fixture';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';

test.describe('TC-008: Verify All Products and Product Detail Page', () => {
    test('should display all products and show correct product detail information', async ({
        page,
        homePage,
        productsPage,
        productDetailPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to Products page', async () => {
            await homePage.navigationMenu.clickProducts();
            return productsPage.verifyPageOpened(
                'After clicking Products in navigation, Products page should be open',
            );
        });

        await test.step('Verify products list is displayed', async () => {
            await expect(productsPage.productsList).toBeVisible();
            const productsCount = await productsPage.getProductCount();
            expect(productsCount).toBeGreaterThan(0);
        });

        await test.step('Click View Product on the first product', async () => {
            await productsPage.clickViewProduct(0);
            return productDetailPage.verifyPageOpened('Product detail page should be open');
        });

        await test.step('Verify product detail information is displayed', async () => {
            return productDetailPage.verifyProductDetailVisible();
        });
    });
});
