import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ViewCartModal } from '../components/ViewCartModal';

export class ProductDetailPage extends BasePage {
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productCategory: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly quantityInput: Locator;
    readonly viewCartModal: ViewCartModal;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page, page.locator('.product-information h2'));

        this.productName = this.page.locator('.product-information h2').describe('Product name');
        this.productPrice = this.page
            .locator('.product-information span span')
            .describe('Product price');
        this.productCategory = this.page
            .locator('.product-information p')
            .filter({ hasText: /category/i })
            .describe('Product category');
        this.productAvailability = this.page
            .locator('.product-information p')
            .filter({ hasText: /availability/i })
            .describe('Product availability');
        this.productCondition = this.page
            .locator('.product-information p')
            .filter({ hasText: /condition/i })
            .describe('Product condition');
        this.productBrand = this.page
            .locator('.product-information p')
            .filter({ hasText: /brand/i })
            .describe('Product brand');
        this.quantityInput = this.page.locator('#quantity').describe('Quantity input');
        this.viewCartModal = new ViewCartModal(this.page);
        this.addToCartButton = this.page.locator('button.cart').describe('Add to cart button');
        this.productName = this.page.locator('.product-information h2').describe('Product name');
    }

    async verifyProductDetailVisible() {
        await expect(
            this.productName,
            'Product name should be visible on detail page',
        ).toBeVisible();
        await expect(
            this.productCategory,
            'Product category should be visible on detail page',
        ).toBeVisible();
        await expect(
            this.productPrice,
            'Product price should be visible on detail page',
        ).toBeVisible();
        await expect(
            this.productAvailability,
            'Product availability should be visible on detail page',
        ).toBeVisible();
        await expect(
            this.productCondition,
            'Product condition should be visible on detail page',
        ).toBeVisible();
        return expect(
            this.productBrand,
            'Product brand should be visible on detail page',
        ).toBeVisible();
    }

    async setQuantity(quantity: number) {
        await this.quantityInput.clear();
        return this.quantityInput.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartButton.click();
        return this.viewCartModal.waitForVisible();
    }

    async clickContinueShopping() {
        return this.viewCartModal.clickContinueShopping();
    }

    async getProductName(): Promise<string> {
        const name = await this.productName.textContent();
        return name?.trim() ?? '';
    }

    async clickViewCart() {
        return this.viewCartModal.clickViewCart();
    }
}
