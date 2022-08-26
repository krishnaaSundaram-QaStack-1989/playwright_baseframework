import { test, Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { pom } from "@pages/pom";
import { juliemr } from "@pages/julieCalculatorPage";
import { testInputs } from "@testDatas/testData";

test.describe.configure({ mode: "serial" });
let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test("Test case 1 - open juliemr calculator url in browser @githubaction ", async () => {
  const pomPageActions = new pom(page);
  await pomPageActions.navigateToURL(process.env.juliemrCalc_URL);
});

test("Test case 2 - verify url of page  @githubaction ", async () => {
  const actions = new WebActions(page);
  await actions.checkCurrentPageUrlOrTitle(
    testInputs.julemrCalcUrl,
    "url",
    "url check for the page juliemr calculator"
  );
});

test("Test case 3 - enter and submit no for addition  @githubaction ", async () => {
  const juliemrCalc = new juliemr(page);
  await juliemrCalc.enterTwoNumbers(testInputs.operations[0]);
  await juliemrCalc.checkResultRowsAreDisplayed(1);
});

test("Test case 4 - enter and submit no for subtraction  @githubaction ", async () => {
  const juliemrCalc = new juliemr(page);
  await juliemrCalc.enterTwoNumbers(testInputs.operations[1]);
  await juliemrCalc.checkResultRowsAreDisplayed(2);
});

test("Test case 5 - enter and submit no for multiplication  @githubaction ", async () => {
  const juliemrCalc = new juliemr(page);
  await juliemrCalc.enterTwoNumbers(testInputs.operations[2]);
  await juliemrCalc.checkResultRowsAreDisplayed(3);
});

test("Test case 6 - enter and submit no for division  @githubaction ", async () => {
  const juliemrCalc = new juliemr(page);
  await juliemrCalc.enterTwoNumbers(testInputs.operations[3]);
  await juliemrCalc.checkResultRowsAreDisplayed(4);
});

test("Test case 7 - enter and submit no for modulo  @githubaction ", async () => {
  const juliemrCalc = new juliemr(page);
  await juliemrCalc.enterTwoNumbers(testInputs.operations[4]);
  await juliemrCalc.checkResultRowsAreDisplayed(5);
  await page.pause();
}); 
