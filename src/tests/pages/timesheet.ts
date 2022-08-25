import { Locator, Page } from "@playwright/test";
import { testInputs } from "../testDatas/testData";
import { WebActions } from "@lib/WebActions";
require("dotenv").config();
let webActions: WebActions;

export class timeSheet {
  readonly page: Page;
  readonly timeSheet: Locator;
  readonly uploadFile: Locator;
  readonly dragDropSection: Locator;
  readonly fileUploadSection: Locator;
  readonly addUploadedFile: Locator;
  readonly uploadedFiles: Locator;
  readonly uploadedFilesCloseButton: Locator;
  readonly newTimesheetRows: Locator;
  readonly removeButton: Locator;
  readonly uploadedImage: Locator;
  readonly uploadedImageSection: Locator;
  readonly uploadedFile: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
    this.dragDropSection = page.locator(
      "text=Drag and drop your files here Click here to upload"
    );
    this.timeSheet = page.locator('button[type="submit"]');
    this.uploadedFiles = page.locator(".filename.clickable");
    this.uploadedFilesCloseButton = page.locator("#file-view-close");
    this.newTimesheetRows = page.locator("span[class$='new']");
    this.uploadFile = page.locator("button", {
      hasText: "Upload timesheet/expenses",
    });
    this.fileUploadSection = page.locator('input[name="file"]');
    this.addUploadedFile = page.locator('button:has-text("ADD")');
    this.removeButton = page.locator(
      "span.col-3.text-button.text-primary.clickable"
    );
    this.uploadedImage = page.locator("img[alt='Uploaded File']");
    this.uploadedImageSection = page.locator("div[class='file-upload my-3']");
    this.uploadedFile = page.locator("span.filename.clickable");
    this.addButton = page.locator("button[id='file-upload-submit']");
  }

  async uploadTimeSheetOrExpenses(): Promise<void> {
    await this.newTimesheetRows
      .first()
      .click({ timeout: testInputs.longWaits });

    await webActions.elementVisibilityCheck(this.uploadFile);
    await this.uploadFile.click({ timeout: testInputs.longWaits });

    if ((await this.dragDropSection.isEnabled({ timeout: 30000 })) == true) {
      this.page
        .locator('input[name="file"]')
        .waitFor({ state: "attached", timeout: 30000 });

      await this.page
        .locator('input[name="file"]')
        .setInputFiles("src/attachments/Test evidence.png");
    }
  }

  async waitForUploadCompletion() {
    await webActions.confirmElementIsReadyForInteraction(this.removeButton);

    await webActions.confirmElementIsReadyForInteraction(this.uploadedImage);

    await webActions.confirmElementIsReadyForInteraction(
      this.uploadedImageSection
    );

    await webActions.confirmElementIsReadyForInteraction(this.addButton);

    await webActions.confirmElementIsReadyForInteraction(this.removeButton);

    await this.addButton.click({ timeout: testInputs.mediumWaits });

    await webActions.waitForElementInvisibility(this.addButton);
    await webActions.waitForElementInvisibility(this.uploadedImageSection);

    await webActions.confirmElementIsReadyForInteraction(this.uploadedFile);
  }

  async verifyUploadedFiles() {
    await webActions.confirmElementIsReadyForInteraction(this.uploadedFiles);
    await webActions.clickElement(this.uploadedFiles);
    await this.page.screenshot({
      path: "srcscreenshots/screenshotSaved.png",
      fullPage: true,
    });
    await webActions.confirmElementIsReadyForInteraction(
      this.uploadedFilesCloseButton
    );
    await webActions.clickElement(this.uploadedFilesCloseButton);
  }
}
