import { expect } from '@playwright/test';
import { User } from '@models/UserModels';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { HomePage } from '@pages/HomePage';
import { PaymentDonePage } from '@pages/PaymentDonePage';
import { PaymentPage } from '@pages/PaymentPage';
import { step } from '@utils/StepDecorator';

export class CheckoutSteps {
    constructor(
        private homePage: HomePage,
        private cartPage: CartPage,
        private checkoutPage: CheckoutPage,
        private paymentPage: PaymentPage,
        private paymentDonePage: PaymentDonePage,
    ) {}

    @step('Verify delivery address matches user data')
    async verifyDeliveryAddress(userData: User) {
        const addressText = await this.checkoutPage.getDeliveryAddressText();

        expect(addressText, 'Delivery address should contain first name').toContain(
            userData.firstName,
        );
        expect(addressText, 'Delivery address should contain last name').toContain(
            userData.lastName,
        );
        expect(addressText, 'Delivery address should contain street address').toContain(
            userData.address1,
        );
        expect(addressText, 'Delivery address should contain city').toContain(userData.city);
        expect(addressText, 'Delivery address should contain state').toContain(userData.state);
        return expect(addressText, 'Delivery address should contain country').toContain(
            userData.country,
        );
    }

    @step('Verify billing address matches user data')
    async verifyBillingAddress(userData: User) {
        const addressText = await this.checkoutPage.getBillingAddressText();

        expect(addressText, 'Billing address should contain first name').toContain(
            userData.firstName,
        );
        expect(addressText, 'Billing address should contain last name').toContain(
            userData.lastName,
        );
        return expect(addressText, 'Billing address should contain street address').toContain(
            userData.address1,
        );
    }
}
