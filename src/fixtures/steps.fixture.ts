import { PageFixtures } from './page.fixture';
import { CheckoutSteps } from '../steps/CheckoutSteps';

export type StepsFixtures = {
    checkoutSteps: CheckoutSteps;
};

export const stepsFixtures = {
    checkoutSteps: async (
        { cartPage, checkoutPage, homePage, paymentDonePage, paymentPage }: PageFixtures,
        use: (r: CheckoutSteps) => Promise<CheckoutSteps>,
    ) => {
        await use(
            new CheckoutSteps(homePage, cartPage, checkoutPage, paymentPage, paymentDonePage),
        );
    },
};
