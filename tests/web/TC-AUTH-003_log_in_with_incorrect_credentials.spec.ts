import { test, expect } from "@fixtures/page.fixture";
import { DataFactory } from "@utils/DataFactory";
import { BrowserUtils } from "@utils/BrowserUtils";
import { Routes } from "@constants/Routes";

test.describe("TC-AUTH-003: Login User with incorrect email and password", () => {
  test("should show error message when logging in with invalid credentials", async ({
    page,
    homePage,
    loginPage,
  }) => {
    const user = DataFactory.generateUser();

    await test.step("Navigate to homepage", async () => {
      await BrowserUtils.goto(page, Routes.WEB.HOME);
      await homePage.verifyPageOpened();
    });

    await test.step("Navigate to signup page", async () => {
      await homePage.navigationMenu.clickSignupLogin();
      await expect(
        loginPage.newUserHeader,
        "New User Signup! header should be visible",
      ).toBeVisible();
    });

    await test.step("Enter incorrect credentials", async () => {
      await loginPage.login(user);
    });

    await test.step("Verify account information page loaded", async () => {
      await expect(
        loginPage.invalidCredentialsError,
        "Entering incorrect credentials should give error",
      ).toBeVisible();
    });
  });
});
