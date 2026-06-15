import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RandomNumberGenerator } from '@utils/RandomNumberGenerator';
import { RegExpUtils } from '@utils/RegExpUtils';

interface AddToCartOptions {
    index?: number;
    productName?: string;
}

export class ProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedProductsHeading: Locator;
    readonly productsList: Locator;
    readonly productItems: Locator;
    readonly productAddedToTheCartModal: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartButton: Locator;
    readonly categorySidebar: Locator;
    readonly productsTitle: Locator;
    readonly brandsSidebar: Locator;

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
        this.productAddedToTheCartModal = this.page
            .locator('.modal-content')
            .describe('Product added to the cart modal');
        this.continueShoppingButton = this.productAddedToTheCartModal
            .getByRole('button', { name: /continue shopping/i })
            .describe('Continue shopping button');
        this.viewCartButton = this.productAddedToTheCartModal
            .getByRole('link', { name: /view cart/i })
            .describe('View cart button in modal');
        this.categorySidebar = this.page
            .locator('.left-sidebar .panel-group')
            .describe('Category sidebar');
        this.productsTitle = this.page.locator('.title.text-center').describe('Products title');
        this.brandsSidebar = this.page.locator('.brands_products').describe('Brands sidebar');
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

    async addProductToCart(options: AddToCartOptions = {}) {
        const { index, productName } = options;

        const productIndex =
            index !== undefined
                ? index
                : RandomNumberGenerator.getRandomArbitrary(0, await this.getProductCount());

        const product = productName
            ? this.productItems.filter({ hasText: productName })
            : this.productItems.nth(productIndex);

        await product.hover();
        return product.locator('.add-to-cart').first().click();
    }

    async clickContinueShopping() {
        return this.continueShoppingButton.click();
    }

    async clickViewCart() {
        return this.viewCartButton.click();
    }

    async getProductName(index?: number) {
        const count = await this.productItems.count();
        const productIndex =
            index !== undefined ? index : RandomNumberGenerator.getRandomArbitrary(0, count);

        let product = this.productItems.nth(productIndex);
        const productName = (await product.locator('.productinfo p').textContent()) || '';

        return productName;
    }

    async selectCategory(mainCategory: string, subCategory: string) {
        const mainCategoryLink = this.categorySidebar
            .getByRole('link')
            .filter({ hasText: RegExpUtils.exactMatchRegExp(mainCategory) })
            .first();
        await mainCategoryLink.click();

        const subCategoryLink = this.categorySidebar
            .locator('a[href*="category_products"]')
            .filter({ hasText: RegExpUtils.caseInsensitiveRegExp(subCategory) })
            .first();
        return subCategoryLink.click();
    }

    async selectBrand(brandName: string) {
        return this.brandsSidebar
            .getByRole('link', { name: RegExpUtils.caseInsensitiveRegExp(brandName) })
            .click();
    }
}
