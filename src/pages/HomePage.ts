import { expect, Locator, Page, Response } from "@playwright/test";
import { NavigationMenu } from "../components/NavigationMenu";
import { Routes } from "../constants/Routes";
import { BrowserUtils } from "../utils/BrowserUtils";
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

  async goto(): Promise<Response | null> {
    return BrowserUtils.goto(this.page, Routes.WEB.HOME);
  }

  async verifyLoggedInVisible() {
    return expect(
      this.loggedInText,
      "Logged in text should be visible",
    ).toBeVisible();
  }

  async verifyLoggedInNotVisible() {
    return expect(
      this.loggedInText,
      "Logged in text should not be visible",
    ).not.toBeVisible();
  }
}
