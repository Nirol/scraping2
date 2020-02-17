(async() => {
    var start = new Date();
    var queryInput = require('./query/queryInput');
    const puppeteerHelper = require('./puppeteerHelper');

    page = await puppeteerHelper.openQueryBroswer();
    userInput = await queryInput.getUserInput(page);

    // if we chose to use captcha solver we will save
    // the user filled tata on the browswer, close the browser
    // and do the scraping on an headless browser:
    // await puppeteerHelper.headlessCaptchaSolver(page);


    await page.click(mainSelector.SEARCH_BUTTON_SELECTOR);
    await page.waitFor(1000);

    var mainPageParse = require('./parsing/mainPageParse.js/index.js');
    await mainPageParse.getMainData(page);


    // wait for loading sublinks:
    await page.waitFor(1000);
    // let's get the sub links

    var mainPageIteration = require('./parsing/mainPageIteration.js/index.js');
    var end2 = new Date() - start;
    console.info('Execution time: %dms', end2);
    await mainPageIteration.iterateMainPages(page);



    var end = new Date() - start;
    console.info('Execution time: %dms', end);

    await puppeteerHelper.CloseQueryBroswer();

})()




// use at the end:
// try {
//     // do your stuff here

//   } catch(e) {
//     console.log(e)
//     process.exit()
//   }
//   finally {
//     browser.close()
//   }