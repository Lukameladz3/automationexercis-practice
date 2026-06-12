import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RandomNumberGenerator } from '@utils/RandomNumberGenerator';

export class ProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedProductsHeading: Locator;
    readonly productsList: Locator;
    readonly productItems: Locator;
    readonly viewCartModal: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartButton: Locator;

    constructor(page: Page) {
        super(
            page,
            page.getByRole('heading', { name: /all products/i }).describe('All Products heading'),
        );

        this.searchInput = this.page.locator('#search_product').describe('Search product input');
        this.searchButton = this.page.locator('#submit_search').describe('Search submit button');
        this.searchedProductsHeading = this.page
            .getByRole('heading', { name: /searched products/i })
            .describe('Searched Products heading');
        this.productsList = this.page
            .locator('.features_items')
            .describe('Products list container');
        this.productItems = this.productsList
            .locator('.col-sm-4')
            .describe('Individual product items');
        this.viewCartModal = this.page.locator('.modal-content').describe('View cart modal');
        this.continueShoppingButton = this.viewCartModal
            .getByRole('button', { name: /continue shopping/i })
            .describe('Continue shopping button');
        this.viewCartModal = this.page.locator('.modal-content').describe('View cart modal');
        this.viewCartButton = this.viewCartModal
            .getByRole('link', { name: /view cart/i })
            .describe('View cart button in modal');
    }

    async search(keyword: string) {
        await this.searchInput.fill(keyword);
        return this.searchButton.click();
    }

    async getProductCount(): Promise<number> {
        return this.productItems.count();
    }

    async clickViewProduct(index?: number) {
        const productIndex =
            index !== undefined
                ? index
                : RandomNumberGenerator.getRandomArbitrary(0, await this.getProductCount());

        const viewProductLink = this.productItems
            .nth(productIndex)
            .getByRole('link', { name: /view product/i });

        await viewProductLink.scrollIntoViewIfNeeded();
        return viewProductLink.click();
    }

    async addProductToCart(index: number): Promise<void> {
        const product = this.productItems.nth(index);
        await product.hover();
        return product.locator('.add-to-cart').first().click();
    }

    async clickContinueShopping(): Promise<void> {
        return this.continueShoppingButton.click();
    }

    async clickViewCart(): Promise<void> {
        return this.viewCartButton.click();
    }
}
