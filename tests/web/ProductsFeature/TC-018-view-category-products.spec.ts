import { expect, test } from '@fixtures/index';
import { BrowserUtils } from '@utils/BrowserUtils';
import { ROUTES } from '@constants/Routes';
import { TEST_DATA } from '@constants/TestData';

test.describe('TC-018: View Category Products', () => {
    const WOMEN_DRESS_CATEGORY = TEST_DATA.CATEGORIES.WOMEN_DRESS;
    const MEN_JEANS_CATEGORY = TEST_DATA.CATEGORIES.MEN_JEANS;

    test('should navigate through categories and verify products', async ({
        page,
        homePage,
        productsPage,
    }) => {
        await test.step('Navigate to homepage', async () => {
            await BrowserUtils.goto(page, ROUTES.WEB.HOME);
            return homePage.verifyPageOpened();
        });

        await test.step('Verify categories are visible', async () => {
            return expect(
                homePage.page.locator('.left-sidebar .panel-group'),
                'Categories sidebar should be visible',
            ).toBeVisible();
        });

        await test.step(`Navigate to ${WOMEN_DRESS_CATEGORY.category} > ${WOMEN_DRESS_CATEGORY.subcategory} and verify it opened correct category`, async () => {
            await homePage.navigationMenu.clickProducts();
            await productsPage.selectCategory(
                WOMEN_DRESS_CATEGORY.category,
                WOMEN_DRESS_CATEGORY.subcategory,
            );
            return expect(productsPage.productsTitle).toContainText(WOMEN_DRESS_CATEGORY.expectedTitle);
        });

        await test.step(`Navigate to ${MEN_JEANS_CATEGORY.category} > ${MEN_JEANS_CATEGORY.subcategory} and verify it opened correct category`, async () => {
            await productsPage.selectCategory(
                MEN_JEANS_CATEGORY.category,
                MEN_JEANS_CATEGORY.subcategory,
            );
            return expect(productsPage.productsTitle).toContainText(MEN_JEANS_CATEGORY.expectedTitle);
        });
    });
});
