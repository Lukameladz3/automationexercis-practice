import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';

test.describe('TC-012: Add Products in Cart', () => {
    test('should add two products to cart and verify their details', async ({
        page,
        homePage,
        cartPage,
        productsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Add two products to cart one by one, then open the cart', async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.verifyPageOpened();
            await productsPage.addProductToCart({ index: 0 });
            await productsPage.clickContinueShopping();
            await productsPage.addProductToCart({ index: 1 });
            return productsPage.clickViewCart();
        });

        await test.step('Verify both products are added to cart', async () => {
            const items = await cartPage.getCartItems();
            return expect(items, 'Cart should contain exactly 2 products').toHaveLength(2);
        });

        await test.step('Verify prices, quantity and total for each cart item', async () => {
            const items = await cartPage.getCartItems();

            const allItemsHaveRequiredFields = items.every(
                (item) => item.price && item.quantity && item.total,
            );
            expect(
                allItemsHaveRequiredFields,
                'Every cart item should have price, quantity, and total filled in',
            ).toBe(true);

            const allQuantitiesAreOne = items.every((item) => parseInt(item.quantity) === 1);
            return expect(
                allQuantitiesAreOne,
                'Every product added should have a quantity of 1',
            ).toBe(true);
        });
    });
});
