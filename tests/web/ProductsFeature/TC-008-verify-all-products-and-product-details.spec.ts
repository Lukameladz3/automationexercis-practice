import { expect, test } from '@fixtures/index';
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

        await test.step('Navigate to Products page and verify products list is displayed', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.verifyPageOpened(
                'After clicking Products in navigation, Products page should be open',
            );
            await expect(productsPage.productsList).toBeVisible();
            const productsCount = await productsPage.getProductCount();
            return expect(productsCount).toBeGreaterThan(0);
        });

        await test.step('Open first product and verify product details are displayed', async () => {
            await productsPage.clickViewProduct(0);
            await productDetailPage.verifyPageOpened('Product detail page should be open');
            return productDetailPage.verifyProductDetailVisible();
        });
    });
});
