import { expect, Locator, Page } from "@playwright/test";
import { testInputs } from "@testDatas/testData";

export class WebActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(url: string): Promise<void> {
    await this.page.goto(url, {
      timeout: testInputs.extendedLongWaits,
      waitUntil: "domcontentloaded",
    });
  }

  async clickElement(locator: any): Promise<void> {
    await this.elementVisibilityCheck(locator);
    await locator.click({ timeout: testInputs.longWaits });
  }

  async checkElementPresence(locator: string): Promise<void> {
    await this.page
      .locator(locator)
      .waitFor({ state: "attached", timeout: testInputs.mediumWaits });
  }

  async enterElementText(locator: any, text: string): Promise<void> {
    await this.elementVisibilityCheck(locator);
    await locator.fill(text, { timeout: testInputs.mediumWaits });
  }

  async elementVisibilityCheck(locator: any): Promise<void> {
    await expect(locator).toBeVisible({
      timeout: testInputs.extendedLongWaits,
    });
  }

  async checkCurrentPageUrlOrTitle(
    text: string | RegExp,
    assertionType: "url" | "title",
    customeMessage: string
  ): Promise<void> {
    if ((assertionType = "url")) {
      await expect.soft(this.page, customeMessage).toHaveURL(text);
    } else if ((assertionType = "title")) {
      await expect.soft(this.page, customeMessage).toHaveTitle(text);
    }
  }
  async confirmElementIsReadyForInteraction(locator: any | Locator) {
    await locator.waitFor({
      state: "attached",
      timeout: testInputs.mediumWaits,
    });

    await locator.waitFor({
      state: "visible",
      timeout: testInputs.mediumWaits,
    });
  }

  async waitForElementInvisibility(locator: any | Locator) {
    await locator.waitFor({
      state: "detached",
      timeout: testInputs.mediumWaits,
    });
  }

  async verifyElementContainsText(locator: any, text: string): Promise<void> {
    await this.elementVisibilityCheck(locator);
    await expect(locator).toContainText(text);
  }

  async goToFrameAndPerformOperations(
    frameLocator: string,
    locator: string,
    operation: "click" | "input values",
    inputValues: string | null,
    timeTowait: number
  ) {
    if (operation == "click") {
      await this.page
        .frameLocator(frameLocator)
        .locator(locator)
        .click({ timeout: timeTowait });
    } else if (operation == "input values" && inputValues == null) {
      await this.page
        .frameLocator(frameLocator)
        .locator(locator)
        //@ts-expect-error
        .fill(inputValues);
    }
  }
}
