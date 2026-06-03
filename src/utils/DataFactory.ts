import { User } from "../models/UserModels";
import { RandomDataGenerator } from "./RandomDataGenerator";

export class DataFactory {
  static generateUser(): User {
    const firstName = RandomDataGenerator.firstName();
    const lastName = RandomDataGenerator.lastName();

    return {
      address1: RandomDataGenerator.streetAddress(),
      address2: RandomDataGenerator.secondaryAddress(),
      birthDay: String(RandomDataGenerator.integer(1, 28)),
      birthMonth: RandomDataGenerator.monthName(),
      birthYear: String(RandomDataGenerator.integer(1980, 2000)),
      city: RandomDataGenerator.city(),
      company: RandomDataGenerator.companyName(),
      country: "United States",
      email: RandomDataGenerator.uniqueEmail(firstName, lastName),
      firstName, lastName,
      mobileNumber: RandomDataGenerator.phoneNumber(),
      name: `${firstName} ${lastName}`,
      password: RandomDataGenerator.password(10),
      state: RandomDataGenerator.state(),
      title: RandomDataGenerator.arrayElement(["Mr", "Mrs"]),
      zipcode: RandomDataGenerator.zipCode(),
    };
  }
}
