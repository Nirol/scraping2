var constants = require('../config/constants');
async function privateCalculateLinkIndex(pageNumber, indexInPage, RESULTS_PER_PAGE) {
    // pages are starting from 1 to 12 on the website elements
    // so in order to count current inner link page index you need to substract 1.
    return RESULTS_PER_PAGE * (pageNumber - 1) + indexInPage;
}

async function privateGetNumOfPages(page) {
    const numberPages = (await page.$$(constants.NUMBERS_OF_PAGES_PATTERN)).length;
    return numberPages;
}

function privateGetPageSelector(pageNumber) {
    selectorPattern = constants.PAGE_SELECTOR_PATTERN;
    idx = constants.PAGE_NUMBER_PATTERN_INDEX;
    selectorPattern = selectorPattern.substring(0, idx) + pageNumber + selectorPattern.substring(idx + 1);
    return selectorPattern;

}

async function privateGetInnerPageLink(INNER_LINK_PATTERN, linkNumberInPage) {
    return fullSelectorId = INNER_LINK_PATTERN + linkNumberInPage;

}

async function privateIteratePage(page, pageNumber, innerPagesArray) {

    var innerPageParse = require("./innerPageParse");
    for (let i = 0; i < constants.RESULTS_PER_PAGE; i++) {
        fullSelectorId = await privateGetInnerPageLink(constants.INNER_LINK_PATTERN, i);
        let elementsToClick = await page.$(fullSelectorId);
        await page.waitFor(1000);
        if (elementsToClick) {
            console.log("inner link found: record number:" + i)
            mainPageIndex = await privateCalculateLinkIndex(pageNumber, i, constants.RESULTS_PER_PAGE);
            await elementsToClick.click();
            await page.waitFor(3000);
            await innerPageParse.parseInnerPage(page, mainPageIndex, innerPagesArray);
            await page.goBack();
        }
    }
}


function privateSaveInnerData(data) {
    const fs = require('fs');
    var jsonContent = JSON.stringify(data);
    fs.writeFile(constants.OUTPUT_INNER_LINKS_FILE, jsonContent, 'utf8', function(err) {
        if (err) {
            console.log("An error occured while writing Inner page results file Object to File.");
            return console.log(err);
        }
        console.log("Inner page results file has been saved.");
    });

}

module.exports = {
    iterateMainPages: async function(page) {
        // number of pages:
        const numberPages = await privateGetNumOfPages(page);
        var allInnerPages = [];
        for (var i = 1; i <= numberPages; i++) {
            // starting from iterating the first page (1) (always exist):

            await privateIteratePage(page, i, allInnerPages);
            await page.waitFor(2000);
            // create next page selector:
            const pagesClickSelector = privateGetPageSelector(i + 1);
            let elementsToClick = await page.$(pagesClickSelector);
            if (elementsToClick) {

                await elementsToClick.click();
                await page.waitFor(1000);
            }
        }
        privateSaveInnerData(allInnerPages);
    }
}