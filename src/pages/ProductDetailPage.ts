import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productCategory: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly quantityInput: Locator;
    readonly viewCartModal: Locator;
    readonly addToCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartButton: Locator;

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
        this.quantityInput = this.page.locator('#quantity').describe('Quantity input');
        this.viewCartModal = this.page.locator('.modal-content').describe('View cart modal');
        this.continueShoppingButton = this.viewCartModal
            .getByRole('button', { name: /continue shopping/i })
            .describe('Continue shopping button');
        this.addToCartButton = this.page.locator('button.cart').describe('Add to cart button');
        this.productName = this.page.locator('.product-information h2').describe('Product name');
        this.viewCartButton = this.viewCartModal
            .getByRole('link', { name: /view cart/i })
            .describe('View cart button in modal');
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

    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput.clear();
        return this.quantityInput.fill(String(quantity));
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        return this.viewCartModal.waitFor({ state: 'visible' });
    }

    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
        return this.viewCartModal.waitFor({ state: 'hidden' });
    }

    async getProductName(): Promise<string> {
        const name = await this.productName.textContent();
        return name?.trim() || '';
    }

    async clickViewCart(): Promise<void> {
        return this.viewCartButton.click();
    }
}
