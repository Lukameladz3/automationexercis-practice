import { expect, Locator, Page } from "@playwright/test";
import { NavigationMenu } from "../components/NavigationMenu";
import { Routes } from "../constants/Routes";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly navigation: NavigationMenu;
  readonly loggedInText: Locator;

  constructor(page: Page, navigation: NavigationMenu) {
    super(page, page.locator("h1, h2").first().describe("Home page heading"));
    this.navigation = navigation;

    this.loggedInText = page
      .locator("li")
      .filter({ hasText: "Logged in as" })
      .describe("Logged in text");
  }

  async goto(): Promise<void> {
    await super.goto(Routes.WEB.HOME);
  }

  async clickSignupLogin(): Promise<void> {
    await this.navigation.clickSignupLogin();
  }

  async clickDeleteAccount(): Promise<void> {
    await this.navigation.clickDeleteAccount();
  }

  async verifyLoggedInVisible(): Promise<void> {
    await expect(
      this.loggedInText,
      "Logged in text should be visible",
    ).toBeVisible();
  }

  async verifyLoggedInNotVisible(): Promise<void> {
    await expect(
      this.loggedInText,
      "Logged in text should not be visible",
    ).not.toBeVisible();
  }
}
