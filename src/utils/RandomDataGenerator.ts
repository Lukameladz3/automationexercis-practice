import { faker } from "@faker-js/faker";

export class RandomDataGenerator {

  static firstName(): string {
    return faker.person.firstName();
  }

  static lastName(): string {
    return faker.person.lastName();
  }

  static email(
    firstName?: string,
    lastName?: string,
    provider?: string,
  ): string {
    return faker.internet.email({ firstName, lastName, provider });
  }

  static uniqueEmail(firstName?: string, lastName?: string): string {
    const uniqueSuffix = faker.string.alphanumeric(8);
    return this.email(firstName, lastName, `test${uniqueSuffix}.com`);
  }

  static password(length: number = 10): string {
    return faker.internet.password({ length });
  }

  static companyName(): string {
    return faker.company.name();
  }

  static streetAddress(): string {
    return faker.location.streetAddress();
  }

  static secondaryAddress(): string {
    return faker.location.secondaryAddress();
  }

  static state(): string {
    return faker.location.state();
  }

  static city(): string {
    return faker.location.city();
  }

  static zipCode(): string {
    return faker.location.zipCode();
  }

  static phoneNumber(): string {
    return faker.phone.number();
  }

  static monthName(): string {
    return faker.date.month();
  }

  static integer(min: number, max: number): number {
    return faker.number.int({ max, min });
  }

  static arrayElement<T>(array: T[]): T {
    return faker.helpers.arrayElement(array);
  }
}
