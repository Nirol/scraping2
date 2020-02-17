var hardcodedParamsExamples = require('../config/hardcodedParamsExamples')
var mainSelector = require('../config/mainPageSelectors');
async function privateFillHardcodedExample1(page) {


    await page.click(mainSelector.YESHUV_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.FIRST_EXAMPLE.YESHUV_TEXT);
    await page.click(mainSelector.RECHOV_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.FIRST_EXAMPLE.RECHOV_TEXT);


    await page.select(mainSelector.NEHES_TYPE_SELECTOR, hardcodedParamsExamples.FIRST_EXAMPLE.NEHES_TYPE_SELECT);
    await page.select(mainSelector.MAHUT_ISKA_SELECTOR, hardcodedParamsExamples.FIRST_EXAMPLE.MAHUT_ISKA_SELECT);
    await page.select(mainSelector.DATE_SELECTOR, hardcodedParamsExamples.FIRST_EXAMPLE.DATE_SELECT);

    await page.click(mainSelector.FROM_DATE_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.FIRST_EXAMPLE.FROM_DATE_TEXT);


    await page.click(mainSelector.TO_DATE_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.FIRST_EXAMPLE.TO_DATE_TEXT);
}


async function privateFillHardcodedExample2(page) {


    await page.click(mainSelector.YESHUV_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.SECOND_EXAMPLE.YESHUV_TEXT);
    await page.click(mainSelector.RECHOV_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.SECOND_EXAMPLE.RECHOV_TEXT);


    await page.select(mainSelector.NEHES_TYPE_SELECTOR, hardcodedParamsExamples.SECOND_EXAMPLE.NEHES_TYPE_SELECT);
    await page.select(mainSelector.MAHUT_ISKA_SELECTOR, hardcodedParamsExamples.SECOND_EXAMPLE.MAHUT_ISKA_SELECT);
    await page.select(mainSelector.DATE_SELECTOR, hardcodedParamsExamples.SECOND_EXAMPLE.DATE_SELECT);

    await page.click(mainSelector.FROM_DATE_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.SECOND_EXAMPLE.FROM_DATE_TEXT);


    await page.click(mainSelector.TO_DATE_SELECTOR);
    await page.keyboard.type(hardcodedParamsExamples.SECOND_EXAMPLE.TO_DATE_TEXT);
}





async function privateCollectUserInput(page) {
    const yeshuv = await page.$eval(mainSelector.YESHUV_SELECTOR, el => el.value);
    const rechov = await page.$eval(mainSelector.RECHOV_SELECTOR, el => el.value);
    const bayt = await page.$eval(mainSelector.BAYT_SELECTOR, el => el.value);
    const nehesType = await page.$eval(mainSelector.NEHES_TYPE_SELECTOR, el => el.value);
    const mahutIska = await page.$eval(mainSelector.MAHUT_ISKA_SELECTOR, el => el.value);
    const captcha = await page.$eval(mainSelector.CAPTCHA_INPUT_SELECTOR, el => el.value);
    const date = await page.$eval(mainSelector.DATE_SELECTOR, el => el.value);
    // if the user chose custom made date
    // Save FROM and TO dates set by 
    let userInput = null;
    if (date === 1) {
        const fromDate = await page.$eval(mainSelector.FROM_DATE_SELECTOR, el => el.value);
        const toDate = await page.$eval(mainSelector.TO_DATE_SELECTOR, el => el.value);
        userInput = new userQueryInput(yeshuv, rechov, bayt, nehesType, mahutIska, captcha, date, fromDate, toDate);
    } else {
        userInput = new userQueryInput(yeshuv, rechov, bayt, nehesType, mahutIska, captcha, date);
    }
    return userInput;
}

class userQueryInput {
    constructor(yeshuv, rechov, bayt = null, nehesType, mahutIska, date, fromDate = null, toDate = null) {
        this.yeshuv = yeshuv;
        this.rechov = rechov;
        this.bayt = bayt;
        this.nehesType = nehesType;
        this.mahutIska = mahutIska;
        this.date = date;
        if (fromDate) {
            this.fromDate = fromDate
        }
        if (toDate) {
            this.toDate = toDate
        }
    }
}

module.exports = {
    getUserInput: async function() {
        // ask user to fill data without captcha
        var querySub = require('./querySubmission');
        await querySub.userDoneFillDataTerminal();
        //collect data
        userInput = await privateCollectUserInput(page);
        return userInput;

    },
    hardcodedInputValues: async function(page) {

        await privateFillHardcodedExample2(page);
        //scroll down so user can see captcha
        await page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight);
        });
    }
};