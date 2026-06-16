import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';

test.describe('TC-013: Verify Product Quantity in Cart', () => {
    const PRODUCT_QUANTITY: number = 4;
    let productName: string;

    test('should reflect the correct quantity in cart when set from the product detail page', async ({
        page,
        homePage,
        cartPage,
        productsPage,
        productDetailPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Go to Products page and open a product detail page', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.verifyPageOpened();
            await productsPage.clickViewProduct();
            return productDetailPage.verifyPageOpened();
        });

        await test.step(`Set quantity to ${PRODUCT_QUANTITY}, add to cart and continue shopping`, async () => {
            productName = await productDetailPage.getProductName();
            await productDetailPage.setQuantity(PRODUCT_QUANTITY);
            await productDetailPage.addToCart();
            return productDetailPage.clickContinueShopping();
        });

        await test.step(`Open cart and verify product quantity is exactly ${PRODUCT_QUANTITY}`, async () => {
            await productDetailPage.navigationMenu.clickCart();
            await cartPage.verifyPageOpened();
            const productQuantityInCart = await cartPage.getProductQuantity(productName);
            return expect(
                productQuantityInCart,
                `Cart quantity for "${productName}" should equal ${PRODUCT_QUANTITY}`,
            ).toBe(PRODUCT_QUANTITY);
        });
    });
});
