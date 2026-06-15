import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { Routes } from '@constants/Routes';
import { TestData } from '@constants/TestData';

test.describe('TC-019: View Category Products', () => {
    const poloBrand = TestData.BRANDS.POLO.name;
    const hAndMBrand = TestData.BRANDS.H_AND_M.name;

    test('should navigate through different brands and view their products', async ({
        page,
        homePage,
        productsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, Routes.WEB.HOME);
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

        await test.step(`Click on ${poloBrand} brand and verify brand page and products`, async () => {
            await productsPage.selectBrand(poloBrand);

            await expect(productsPage.productsTitle).toContainText(poloBrand);
            const productCount = await productsPage.productItems.count();
            return expect(productCount, 'Should have products displayed').toBeGreaterThan(0);
        });

        await test.step(`Click on ${hAndMBrand} brand and verify brand page and products`, async () => {
            await productsPage.selectBrand(hAndMBrand);

            await expect(productsPage.productsTitle).toContainText(hAndMBrand);
            const productCount = await productsPage.productItems.count();
            return expect(productCount, 'Should have products displayed').toBeGreaterThan(0);
        });
    });
});
