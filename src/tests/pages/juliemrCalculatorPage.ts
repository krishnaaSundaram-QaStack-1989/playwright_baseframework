  import { Locator, Page } from "@playwright/test";
  import { testInputs } from "../testDatas/testData";
  import { WebActions } from "@lib/WebActions";

  let webActions: WebActions;

  export class homepage {
    readonly page: Page;
    readonly inputBox1: Locator;
    readonly inputBox2: Locator;
    /** we can also have string values in it  
     *  readonly inputBox1: string;
    readonly inputBox2: string;
     */
    readonly popUpFrame_1: string;
    readonly popUpFrame_1_closeIcon: string;
    readonly iframeExample: Locator;


    constructor(page: Page) {
      this.page = page;
      webActions = new WebActions(this.page);
      this.inputBox1 = page.locator('this.popUpFrame_1_closeIcon'); //  to be updated
      this.inputBox2 = page.locator('this.popUpFrame_1_closeIcon'); // to be updated
      this.popUpFrame_1 = "#wfx-frame-popup";
      this.popUpFrame_1_closeIcon =
        '[aria-label="Click on Close Icon to close the popup"]';
      this.iframeExample = page
        .frameLocator(this.popUpFrame_1)
        .locator(this.popUpFrame_1_closeIcon);
      
    }

    async closePopUpWindow(): Promise<void> {
      await webActions.confirmElementIsReadyForInteraction(this.closeIconInFrame);
      await this.closeIconInFrame.click({
        timeout: testInputs.extendedLongWaits,
      });
    }

    async openTimesheetModule(): Promise<void> {
      await webActions.confirmElementIsReadyForInteraction(this.timeSheetModule);
      await this.timeSheetModule.click({ timeout: testInputs.mediumWaits });
    }
  }
