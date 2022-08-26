import {  expect, Locator, Page } from '@playwright/test'; 
import { testInputs } from '../testDatas/testData';
import { WebActions } from '@lib/WebActions';
require('dotenv').config()

let webActions: WebActions;

    export class pom {
      readonly page: Page;
      readonly submit: Locator;
      readonly uname: Locator;
      readonly pwd: Locator;
      
      constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
        this.engageLogo = page.locator('img[src="/img/logo.png"]');
        this.un = page.locator( 'input[id = "un"]');
        this.pwd = page.locator('input[id = "pwd"]');
        this.submit = page.locator('button[type="submit"]');
        }
        
        async navigateToURL(url: string): Promise<void> {
            await this.page.goto(url, {timeout: testInputs.extendedLongWaits, waitUntil: "domcontentloaded"});
        }


        async navigateToApp(): Promise<void> {
            await this.navigateToURL(process.env.url);
        }

         
        async loginTloApplicationWithWebActions(uName, pwd): Promise<void>    {
           await webActions.elementVisibilityCheck(this.appicationLogo);
           await webActions.enterElementText(this.un, uName);
           await webActions.enterElementText(this.pwd, pwd);
           await webActions.clickElement(this.submit);
        }
        
         /**
         * 
         * @param uName called from .env file
         * @param pwd called from .env file 
         */
         
          async logintoapp(uName, pwd): Promise<void>    {
           await webActions.elementVisibilityCheck(this.appicationLogo);
           await webActions.enterElementText(this.un, process.env.uname);
           await webActions.enterElementText(this.pwd, process.env.pwd);
           await webActions.clickElement(this.submit);
        }
        
        }
              
