import { test, expect } from "@fixtures/page.fixture";
import { DataFactory } from "@utils/DataFactory";
import { TestData } from "@constants/TestData";
import { BrowserUtils } from "@utils/BrowserUtils";
import { Routes } from "@constants/Routes";

test.describe("TC-AUTH-001: Register User", () => {
  test("should successfully register a new user and verify account creation", async ({
    page,
    homePage,
    loginPage,
    signupPage,
    accountCreatedPage,
    accountDeletedPage,
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

    await test.step("Enter signup credentials", async () => {
      await loginPage.signup(user);
    });

    await test.step("Verify account information page loaded", async () => {
      await expect(
        signupPage.accountInfoHeading,
        "Enter Account Information heading should be visible",
      ).toBeVisible();
    });

    await test.step("Fill complete account information", async () => {
      await signupPage.fillAccountDetails(user);
    });


    await test.step("Submit account creation", async () => {
      await signupPage.clickCreateAccount();
    });

    await test.step("Verify account created successfully", async () => {
      await expect(
        accountCreatedPage.successMessage,
        "ACCOUNT CREATED! message should be displayed",
      ).toHaveText(TestData.AUTH.SUCCESS_MESSAGES.ACCOUNT_CREATED);
    });

    await test.step("Continue to homepage", async () => {
      await accountCreatedPage.clickContinue();
    });

    await test.step("Verify user is logged in", async () => {
      await expect(
        homePage.loggedInText,
        "Logged in status should be visible",
      ).toBeVisible();
      await expect(
        homePage.loggedInText,
        `Should show logged in as ${user.name}`,
      ).toContainText(user.name);
    });

    await test.step("Delete Account and verify", async() => {
      await homePage.navigationMenu.clickDeleteAccount()
      await accountDeletedPage.verifyAccountDeleted();
      await accountDeletedPage.clickContinue();
      await homePage.verifyPageOpened("After Clicking continue button on account delete page, home page should be visible");
    })
  });
});
