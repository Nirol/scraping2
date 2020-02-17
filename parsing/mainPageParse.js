var constants = require('../config/constants');

function privateSaveMainData(data) {
    const fs = require('fs');
    var jsonContent = JSON.stringify(data);
    fs.writeFile(constants.OUTPUT_MAIN_FILE, jsonContent, 'utf8', function(err) {
        if (err) {
            console.log("An error occured while writing Main page results file Object to File.");
            return console.log(err);
        }
        console.log("Main page results file has been saved.");
    });

}
async function privateGetMainDataResponse(page) {
    var finalResponse = null;
    while (finalResponse === null) {
        try {
            finalResponse = await page.waitForResponse(response => {
                if (response.url() === constants.MAIN_PAGE_DATA_REQUEST) {
                    return response;
                }
            }, 8);

        } catch (e) {
            console.log(e)
            process.exit()
        }

    }

    return await finalResponse.json();
}

module.exports = {
    //  total outside info of all results ( in all pages )

    getMainData: async function(page) {
        response = await privateGetMainDataResponse(page);
        privateSaveMainData(response);
    }

};