import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RandomNumberGenerator } from '@utils/RandomNumberGenerator';
import { RegExpUtils } from '@utils/RegExpUtils';
import { ViewCartModal } from '../components/ViewCartModal';

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
    readonly viewCartModal: ViewCartModal;
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
        this.viewCartModal = new ViewCartModal(this.page);
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
        const productIndex = await this.resolveProductIndex(index);

        const viewProductLink = this.productItems
            .nth(productIndex)
            .getByRole('link', { name: /view product/i });

        await viewProductLink.scrollIntoViewIfNeeded();
        return viewProductLink.click();
    }

    async addProductToCart(options: AddToCartOptions = {}) {
        const { index, productName } = options;

        const productIndex = await this.resolveProductIndex(index);

        const product = productName
            ? this.productItems.filter({ hasText: productName })
            : this.productItems.nth(productIndex);

        await product.hover();
        return product.locator('.add-to-cart').first().click();
    }

    async clickContinueShopping() {
        return this.viewCartModal.clickContinueShopping();
    }

    async clickViewCart() {
        return this.viewCartModal.clickViewCart();
    }

    async getProductName(index?: number) {
        const productIndex = await this.resolveProductIndex(index);

        let product = this.productItems.nth(productIndex);
        const productName = (await product.locator('.productinfo p').textContent()) ?? '';

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

    async selectRandomBrand(excludeBrands: string[] = []): Promise<string> {
        const brandLinks = this.brandsSidebar.locator('li a');
        await brandLinks.first().waitFor({ state: 'visible' });

        const validBrands = await brandLinks.evaluateAll((els, exclude) => {
            return els
                .map((el, index) => {
                    let text = '';
                    for (const child of el.childNodes) {
                        if (child.nodeType === Node.TEXT_NODE) {
                            text += child.textContent;
                        }
                    }
                    return { index, name: text.trim() };
                })
                .filter((b) => !exclude.some((e) => e.toLowerCase() === b.name.toLowerCase()));
        }, excludeBrands);

        if (validBrands.length === 0) {
            throw new Error('No available brands found after exclusion');
        }

        const randomIndexIdx = RandomNumberGenerator.getRandomArbitrary(0, validBrands.length);
        const selected = validBrands[randomIndexIdx];

        await brandLinks.nth(selected.index).click();
        return selected.name;
    }

    async selectBrand(brandName: string) {
        return this.brandsSidebar
            .getByRole('link', { name: RegExpUtils.caseInsensitiveRegExp(brandName) })
            .click();
    }

    private async resolveProductIndex(index?: number): Promise<number> {
        return index !== undefined
            ? index
            : RandomNumberGenerator.getRandomArbitrary(0, await this.getProductCount());
    }
}
