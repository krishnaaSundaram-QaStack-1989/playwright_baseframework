import { test, Page } from "@playwright/test";
import { pom } from "@pages/pom";
import { WebActions } from "@lib/WebActions";
import { testInputs } from "@testDatas/testData";
import { timeSheet } from "@pages/timeSheet";

test.describe.configure({ mode: "serial" });
let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test("Test case 1 - @login : open engage url in browser  @fast ", async () => {
  const pomPageActions = new pom(page);
  await pomPageActions.navigateToApp();
});

test("Test case 2 - @login : login to application  @fast ", async () => {
  const pomPageActions = new pom(page);
  await pomPageActions.loginToApplication();
});

test("Test case 3 - @login : verify dashboard URL  @fast ", async () => {
  const actions = new WebActions(page);
  await actions.checkCurrentPageUrlOrTitle(
    testInputs.engageUrl,
    "url",
    "URL incorrect for homepage dashboard"
  );
  await actions.checkCurrentPageUrlOrTitle(
    testInputs.dashBoardUrl,
    "url",
    "URL incorrect for homepage dashboard"
  );
});

test.skip("Test case 4 - @login : timesheet testscripts in progress  @fast ", async () => {
  const actions = new WebActions(page);
  const timeSheets = new timeSheet(page);
  const todoItems = page.locator('ul li a img[alt="Side Menu - Timesheets"]');
  await actions.elementVisibilityCheck(todoItems);
  await todoItems.click({ timeout: testInputs.extendedLongWaits });

  await actions.checkCurrentPageUrlOrTitle(
    testInputs.timesheetUrl,
    "url",
    "URL incorrect for timesheet page"
  );

  const todoItems1 = page.locator(".mb-0.mx-3.text-center");
  await actions.verifyElementContainsText(
    todoItems1,
    testInputs.timesheetPage.timeSheetTitle
  );

  await timeSheets.uploadTimeSheetOrExpenses();
});
