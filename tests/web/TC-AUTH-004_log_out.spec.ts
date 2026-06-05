import { test, expect } from "@fixtures/page.fixture";
import { DataFactory } from "@utils/DataFactory";
import { BrowserUtils } from "@utils/BrowserUtils";
import { Routes } from "@constants/Routes";
import { User } from "@models/UserModels";
import { TestData } from "@constants/TestData";

test.describe("TC-AUTH-004: Logout User", () => {
  let user:User
  
  test.beforeEach(async ({
    page,
    homePage,
    loginPage,
    signupPage,
    accountCreatedPage,
  }) => {
    user = DataFactory.generateUser()
    
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

    await test.step("Continue to homepage and clear session", async () => {
      await accountCreatedPage.clickContinue();
      await BrowserUtils.clearSession(page);
    });
  })

  test("should successfully log out", async ({
    page,
    homePage,
    loginPage,
  }) => {
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

    await test.step("Enter correct credentials", async () => {
      await loginPage.login(user);
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

    await test.step("Logout from account", async () => {
      await homePage.navigationMenu.clickLogout()
    })

    await test.step("Verify that user is navigated to login page after logging out", async () => {
      await homePage.verifyPageOpened("after logging out, home page should be displayed")
    })

  });
});
