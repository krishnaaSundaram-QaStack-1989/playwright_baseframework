import { Locator, Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { testInputs } from "@testDatas/testData";
let i;
require("dotenv").config();

/**
 * array to handle the conditional operation
 */

let webActions: WebActions;

export class juliemr {
  readonly page: Page;
  readonly title: Locator;
  readonly textBox1: Locator;
  readonly textBox2: Locator;
  readonly goButton: Locator;
  readonly addition: Locator;
  readonly modulo: Locator;
  readonly multiplication: Locator;
  readonly subtraction: Locator;
  readonly division: Locator;

  constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
    this.title = page.locator("text=Super Calculator");
    this.textBox1 = page.locator('input[type="text"]').first();
    this.textBox2 = page.locator('input[type="text"]').nth(1);
    this.goButton = page.locator("text=Go!");
    this.addition = page.locator("select");
    this.division = page.locator("select");
    this.multiplication = page.locator("select");
    this.subtraction = page.locator("select");
    this.modulo = page.locator("select");
  }

  async enterTwoNumbers(operation: string): Promise<void> {
    await webActions.confirmElementIsReadyForInteraction(this.textBox1);

    await webActions.confirmElementIsReadyForInteraction(this.textBox2);

    await this.textBox1.fill("100");

    await this.textBox2.fill("20");

    if (operation === "ADDITION") {
      await this.addition.selectOption(testInputs.operations[0]);
    } else if (operation === "SUBTRACTION") {
      await this.addition.selectOption(testInputs.operations[1]);
    } else if (operation === "MULTIPLICATION") {
      await this.addition.selectOption(testInputs.operations[2]);
    } else if (operation === "DIVISION") {
      await this.addition.selectOption(testInputs.operations[3]);
    } else if (operation === "MODULO") {
      await this.addition.selectOption(testInputs.operations[4]);
    }

    await webActions.confirmElementIsReadyForInteraction(this.goButton);

    await this.goButton.click({ timeout: 50000 });
  }

  /**
   * We change the i value only from 1 to 5 for all 5 rows of results
   * 1 of 3
   * 2 of 3
   * 3 of 3
   * 4 of 3
   * 5 of 3
   */

  async checkResultRowsAreDisplayed(i: number): Promise<void> {
    let resultRows = await this.page.locator(
      `tbody tr:nth-child(${i}) td:nth-child(3)`
    );

    await resultRows.waitFor({ state: "attached" });
    await resultRows.waitFor({ state: "visible" });
  }
}
