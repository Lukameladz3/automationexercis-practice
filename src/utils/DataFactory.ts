import { ContactData } from '@models/ContactModel';
import { USER_DEFAULTS } from '../constants/UserDefaults';
import { User } from '../models/UserModels';
import { RandomDataGenerator } from './RandomDataGenerator';
import { PaymentDetails } from '@models/PaymentModels';

export class DataFactory {
    static generateUser(): User {
        const firstName = RandomDataGenerator.firstName();
        const lastName = RandomDataGenerator.lastName();

        return {
            address1: RandomDataGenerator.streetAddress(),
            address2: RandomDataGenerator.secondaryAddress(),
            birthDay: String(
                RandomDataGenerator.integer(
                    USER_DEFAULTS.BIRTH_DAY_MIN,
                    USER_DEFAULTS.BIRTH_DAY_MAX,
                ),
            ),
            birthMonth: RandomDataGenerator.monthName(),
            birthYear: String(
                RandomDataGenerator.integer(
                    USER_DEFAULTS.BIRTH_YEAR_MIN,
                    USER_DEFAULTS.BIRTH_YEAR_MAX,
                ),
            ),
            city: RandomDataGenerator.city(),
            company: RandomDataGenerator.companyName(),
            country: USER_DEFAULTS.COUNTRY,
            email: RandomDataGenerator.uniqueEmail(firstName, lastName),
            firstName,
            lastName,
            mobileNumber: RandomDataGenerator.phoneNumber(),
            name: `${firstName} ${lastName}`,
            password: RandomDataGenerator.password(USER_DEFAULTS.PASSWORD_LENGTH),
            state: RandomDataGenerator.state(),
            title: RandomDataGenerator.arrayElement([...USER_DEFAULTS.TITLES]),
            zipcode: RandomDataGenerator.zipCode(),
        };
    }

    static generateContactData(): ContactData {
        const email = RandomDataGenerator.email();
        const firstName = RandomDataGenerator.firstName();
        const lastName = RandomDataGenerator.lastName();

        return {
            email: email,
            message: RandomDataGenerator.wordsGenerator(5),
            name: `${firstName} ${lastName}`,
            subject: RandomDataGenerator.wordsGenerator(2),
        };
    }

    static generatePaymentDetails(): PaymentDetails {
        return {
            cardNumber: RandomDataGenerator.creditCardNumber(),
            cvc: RandomDataGenerator.creditCardCVV(),
            expiryMonth: RandomDataGenerator.paddedNumber(RandomDataGenerator.integer(1, 12), 2),
            expiryYear: String(RandomDataGenerator.integer(2025, 2030)),
            nameOnCard: RandomDataGenerator.fullName(),
        };
    }
}
