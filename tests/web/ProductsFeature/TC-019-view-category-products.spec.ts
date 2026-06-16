import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';
import { TEST_DATA } from '@constants/TestData';

test.describe('TC-019: View & Cart Brand Products', () => {
    let randomBrand1: string;

    test('should navigate through different brands and view their products', async ({
        page,
        homePage,
        productsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Navigate to products page', async () => {
            await homePage.navigationMenu.clickProducts();
            return productsPage.verifyPageOpened();
        });

        await test.step('Verify brands are visible', async () => {
            return expect(
                productsPage.brandsSidebar,
                'Brands sidebar should be visible',
            ).toBeVisible();
        });

        await test.step(`Click on a random brand and verify brand page and products`, async () => {
            randomBrand1 = await productsPage.selectRandomBrand();

            await expect(productsPage.productsTitle).toContainText(randomBrand1);
            const productCount = await productsPage.productItems.count();
            return expect(productCount, 'Should have products displayed').toBeGreaterThan(0);
        });

        await test.step(`Click on another random brand and verify brand page and products`, async () => {
            const randomBrand2 = await productsPage.selectRandomBrand([randomBrand1]);

            await expect(productsPage.productsTitle).toContainText(randomBrand2);
            const productCount = await productsPage.productItems.count();
            return expect(productCount, 'Should have products displayed').toBeGreaterThan(0);
        });
    });
});
