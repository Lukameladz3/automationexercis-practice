import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';

test.describe('TC-013: Verify Product Quantity in Cart', () => {
    const productQuantity: number = 4;
    let productName: string;

    test('should reflect the correct quantity in cart when set from the product detail page', async ({
        page,
        homePage,
        cartPage,
        productsPage,
        productDetailPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Go to Products page and open a product detail page', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.verifyPageOpened();
            await productsPage.clickViewProduct();
            return productDetailPage.verifyPageOpened();
        });

        await test.step(`Set quantity to ${productQuantity}, add to cart and continue shopping`, async () => {
            productName = await productDetailPage.getProductName();
            await productDetailPage.setQuantity(productQuantity);
            await productDetailPage.addToCart();
            return productDetailPage.clickContinueShopping();
        });

        await test.step(`Open cart and verify product quantity is exactly ${productQuantity}`, async () => {
            await productDetailPage.navigationMenu.clickCart();
            await cartPage.verifyPageOpened();
            const productQuantityInCart = await cartPage.getProductQuantity(productName);
            return expect(
                productQuantityInCart,
                `Cart quantity for "${productName}" should equal ${productQuantity}`,
            ).toBe(productQuantity);
        });
    });
});
