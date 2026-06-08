import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedProductsHeading: Locator;
    readonly productsList: Locator;
    readonly productItems: Locator;

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
    }

    async search(keyword: string): Promise<void> {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }

    async getProductCount(): Promise<number> {
        return this.productItems.count();
    }

    async clickViewProduct(index: number) {
        const viewProductLink = this.productItems
            .nth(index)
            .getByRole('link', { name: /view product/i });

        await viewProductLink.scrollIntoViewIfNeeded();
        await viewProductLink.click();
    }
}
