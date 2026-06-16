import { PageFixtures } from './page.fixture';
import { CheckoutSteps } from '../steps/CheckoutSteps';

type Use<T> = (value: T) => Promise<void>;

export type StepsFixtures = {
    checkoutSteps: CheckoutSteps;
};

export const stepsFixtures = {
    checkoutSteps: async (
        { cartPage, checkoutPage, homePage, paymentDonePage, paymentPage }: PageFixtures,
        use: Use<CheckoutSteps>,
    ) => {
        await use(
            new CheckoutSteps(homePage, cartPage, checkoutPage, paymentPage, paymentDonePage),
        );
    },
};
