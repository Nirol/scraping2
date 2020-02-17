var mainSelector = require('../config/mainPageSelectors');

async function privateAskQuestion(query) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}
async function privateFillAddressQuery(page, userInput) {
    await page.click(mainSelector.YESHUV_SELECTOR);
    await page.keyboard.type(userInput.yeshuv);
    await page.click(mainSelector.RECHOV_SELECTOR);
    await page.keyboard.type(userInput.rechov);
    if (userInput.bayt) {
        await page.click(mainSelector.BAYT_SELECTOR);
    }
    await page.select(mainSelector.NEHES_TYPE_SELECTOR, userInput.nehesType);
    await page.select(mainSelector.MAHUT_ISKA_SELECTOR, userInput.mahutIska);
    await page.select(mainSelector.DATE_SELECTOR, userInput.date);
    if (userInput.date === 1) {
        await page.click(mainSelector.FROM_DATE_SELECTOR);
        await page.keyboard.type(userInput.fromDate);
        await page.click(mainSelector.TO_DATE_SELECTOR);
        await page.keyboard.type(userInput.toDate);
    }
}
async function privateTerminalCaptchSubmit(page) {
    // user solve captcha and we submit query 
    const ans = await privateAskQuestion("Solve Captcha in terminal:");
    await page.click(mainSelector.CAPTCHA_INPUT_SELECTOR);
    await page.keyboard.type(ans);

}

module.exports = {
    userDoneFillDataTerminal: async function() {
        console.log("Please fill all the necessary input:")
        await privateAskQuestion("Press any key to continue adad when you are done filling query input:");
    },
    submitUserQuery: async function(page, userInput) {
        await privateFillAddressQuery(page, userInput);
        // replace with captcha solver for page:
        await privateTerminalCaptchSubmit(page);
    }
};