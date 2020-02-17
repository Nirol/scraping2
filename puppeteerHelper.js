const puppeteer = require('puppeteer');
var constants = require('./config/constants');

let browser = null;

async function privateOpenMainPage() {
    const page = await browser.newPage();
    await page.goto(constants.MAIN_PAGE_URL);
    return page;
}

async function privateCreateHeadlessBrowser() {
    browser = await puppeteer.launch({
        headless: true
    });

    const page = privateOpenMainPage(browser);
    return page;

}

module.exports = {
    openQueryBroswer: async function() {
        browser = await puppeteer.launch({
            headless: false
        });
        const page = privateOpenMainPage(browser);

        return page;
    },
    headlessCaptchaSolver: async function() {
        // close browswer
        CloseQueryBroswer();
        await page.waitFor(1000);
        // create headless page
        page = await privateCreateHeadlessBrowser();
        await page.waitFor(5000);
        var querySub = require('./query/querySubmission');
        await querySub.submitUserQuery(page, userInput);

    },

    CloseQueryBroswer: async function() {
        await browser.close();
    }



};