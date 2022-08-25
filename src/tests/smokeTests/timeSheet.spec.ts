import { test, Page } from "@playwright/test";
import { pom } from "@pages/pom";
import { WebActions } from "@lib/WebActions";
import { testInputs } from "@testDatas/testData";
import { timeSheet } from "@pages/timeSheet";
import { homepage } from "@pages/homePage";

test.describe.configure({ mode: "serial" });
let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test("Test case 1 - @timesheet : open app url in browser  ", async () => {
  const pomPageActions = new pom(page);
  await pomPageActions.navigateToApp();
});

test("Test case 2 - @timesheet : login to application  ", async () => {
  const pomPageActions = new pom(page);
  await pomPageActions.loginToApplication();
});

test("Test case 3 - @timesheet : verify dashboard URL  ", async () => {
  const actions = new WebActions(page);
  const homepageActions = new homepage(page);
  await actions.checkCurrentPageUrlOrTitle(
    testInputs.appURL,
    "url",
    "URL incorrect for homepage dashboard"
  );
  await actions.checkCurrentPageUrlOrTitle(
    testInputs.dashBoardUrl,
    "url",
    "URL incorrect for homepage dashboard"
  );

  await actions.elementVisibilityCheck(homepageActions.closeIconInFrame);

  await homepageActions.closePopUpWindow();
});

test("Test case 4 - @timesheet : upload the timesheet or expenses ", async () => {
  const homePage = new homepage(page);
  const actions = new WebActions(page);
  const homepageActions = new homepage(page);

  if (
    (await homepageActions.closeIconInFrame.isVisible({
      timeout: testInputs.extendedLongWaits,
    })) == true
  ) {
    try {
      console.log("we are closing the pop up window in homepage");
      await homepageActions.closePopUpWindow();
    } catch (error) {
      console.log("homepage popup window close icon not available in homepage");
    }
  }

  await homePage.openTimesheetModule();

  await actions.checkCurrentPageUrlOrTitle(
    testInputs.timesheetUrl,
    "url",
    "URL verification for timesheet page"
  );

  const todoItems1 = page.locator(".mb-0.mx-3.text-center");
  await actions.verifyElementContainsText(
    todoItems1,
    testInputs.timesheetPage.timeSheetTitle
  );
});

test("Test case 5 - @timesheet : upload the timesheet or expenses ", async () => {
  const timeSheets = new timeSheet(page);

  await timeSheets.uploadTimeSheetOrExpenses();

  await timeSheets.waitForUploadCompletion();
});

test("Test case 6 - @timesheet : open and confirm uploaded timesheet or expenses ", async () => {
  const timeSheets = new timeSheet(page);
  await timeSheets.verifyUploadedFiles();
});
