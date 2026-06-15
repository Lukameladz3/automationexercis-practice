import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';

test.describe('TC-017: Remove Products From Cart', () => {
    let productName: string;

    test('should remove product from cart', async ({ page, homePage, cartPage, productsPage }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Add product to the cart and verify cart page opened', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.verifyPageOpened();
            productName = await productsPage.getProductName();
            await productsPage.addProductToCart({ productName: productName });
            await productsPage.clickContinueShopping();
            await productsPage.navigationMenu.clickCart();
            return cartPage.verifyPageOpened();
        });

        await test.step('Remove product from cart', async () => {
            return cartPage.removeProductByName(productName);
        });
    });
});
