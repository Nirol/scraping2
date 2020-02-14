const puppeteer = require('puppeteer');



const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}



function aaabc(json_dict) {


}





(async() => {


    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.misim.gov.il/svinfonadlan2010/startpageNadlanNewDesign.aspx?ProcessKey=9099939b-d8e6-405f-a11e-87775cd9ed32');
    var selectors = require('./mainPageSelectors');
    await page.click(selectors.SELECTORS.YESHUV_SELECTOR);
    await page.keyboard.type(selectors.VALUES.YESHUV_TEXT);
    await page.click(selectors.SELECTORS.RECHOV_SELECTOR);
    await page.keyboard.type(selectors.VALUES.RECHOV_TEXT);


    await page.select(selectors.SELECTORS.NEHES_TYPE_SELECTOR, selectors.VALUES.NEHES_TYPE_SELECT);
    await page.select(selectors.SELECTORS.MAHUT_ISKA_SELECTOR, selectors.VALUES.MAHUT_ISKA_SELECT);
    await page.select(selectors.SELECTORS.DATE_SELECTOR, selectors.VALUES.DATE_SELECT);

    await page.click(selectors.SELECTORS.FROM_DATE_SELECTOR);
    await page.keyboard.type(selectors.VALUES.FROM_DATE_TEXT);


    await page.click(selectors.SELECTORS.TO_DATE_SELECTOR);
    await page.keyboard.type(selectors.VALUES.TO_DATE_TEXT);
    page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight);
    });
    const ans = await askQuestion("Solve Captcha :) ");
    await page.click(selectors.SELECTORS.CAPTCHA_INPUT_SELECTOR);
    await page.keyboard.type(ans);



    await page.click(selectors.SELECTORS.SEARCH_BUTTON_SELECTOR);
    await page.waitFor(1000);
    console.log(page.url());
    await page.waitFor(1000);



    // total outside info of all results ( in all pages )
    // await page.on('response', async(response) => {
    //     if (response.url() == "https://www.misim.gov.il/svinfonadlan2010/InfoNadlanPerutWithMap.aspx/GetPoints") {
    //         console.log('XHR response received');
    //         // console.log(await response.json());
    //     }
    // });


    // now for the inside links:



    // let's get the sub links



    const elementsToClickSelector = 'a#ContentUsersPage_GridMultiD1_LogShow_0'
        // get all elements to be clicked
    let elementsToClick = await page.$$(elementsToClickSelector);
    console.log(`Elements to click: ${elementsToClick.length}`);

    for (let i = 0; i < elementsToClick.length; i++) {
        // click element
        elementsToClick[i].click();
        await page.waitFor(2000);

        // headline inner page data variables:
        const ezor = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblEzor').textContent);
        const gush = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblGush').textContent);
        const tarihIska = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblTarIska').textContent);
        const yeshuv = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblYeshuv').textContent);
        const rechov = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblRechov').textContent);
        const bayit = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblBayit').textContent);
        const knisa = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblKnisa').textContent);
        const dira = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblDira').textContent);

        // price table:
        const mcirMozhar = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMcirMozhar').textContent);
        const mcirMozharDlr = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMcirMozharDlr').textContent);
        const mcirMorach = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMcirMorach').textContent);
        const mcirMorachDlr = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMcirMorachDlr').textContent);

        // mid table variables:
        //first row:
        const setachBruto = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblShetachBruto').textContent);
        const misparHadarim = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMisHadarim').textContent);
        const gag = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblGag').textContent);
        //second row:
        const setachNeto = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblShetachNeto').textContent);
        const setachKoma = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblKoma').textContent);
        const machsan = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMachsan').textContent);
        //third row:
        const shnatBniya = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblShnatBniya').textContent);
        const misparKomot = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMisKomot').textContent);
        const hzer = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblHzer').textContent);
        // fourth row:
        const mechirCheder = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMechirCheder').textContent);
        const dirotBnyn = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblDirotBnyn').textContent);
        const migrash = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMigrash').textContent);
        // fifth row:
        const mechirLmr = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMechirLmr').textContent);
        const hanayra = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblHanaya').textContent);
        const glrya = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblGlrya').textContent);

        // six row:  FIND SAMPLE WITH MALIT !! TODO

        // mid-end table variables:
        const sugIska = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblSugIska').textContent);
        const tifkudBinyan = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblTifkudBnyn').textContent);
        const tifkudYechida = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblTifkudYchida').textContent);
        const shuma_halakim = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblShumaHalakim').textContent);
        // end table variables:
        const mofaGush = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMofaGush').textContent);

        const tava = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblTava').textContent);
        const mahutZchut = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMahutZchut').textContent);

        console.log(mcirMozhar.textContent)
        console.log(mcirMozharDlr)
        console.log(mcirMorach)
        console.log(mcirMorachDlr)


        console.log(ezor)
        console.log(gush)

        console.log(setachBruto)





        await page.goBack()
    }




    // method 1 not working perfectly getting hreflinks":

    // const result = await page.evaluate(async() => {
    //     console.log('Browser scope.');
    //     let elementTxtArr = [];
    //     document.querySelectorAll("a").forEach((a) => {

    //         elementTxtArr.push(a.href);

    //     });
    //     return elementTxtArr;
    // });


    // result.forEach(pageLink => {
    //     if (pageLink.indexOf(selectors.INNER_LINK_PATTERN) > -1) {
    //         console.log(pageLink);
    //         (async() => {
    //             // await page.goto(pageLink);
    //             const preloadHref = await page.$eval(pageLink, el => el.href);
    //         })
    //     }

    // });







    // code that not working for now for clicking sublinks:
    //let's click on each sub click
    // for (let sublink of arrSubLinks) {
    //     console.log('██AAA');

    //     await Promise.all([
    //         page.waitForNavigation(),
    //         sublink.click({ delay: 100 })
    //     ]);
    //     console.log('██BBB');

    //     await page.goBack()

    // }






    // await page.evaluate(() => {
    //     let elements = page.querySelectorAll('#ContentUsersPage_GridMultiD1_LogShow_0');
    //     for (let element of elements)
    //         page.click()
    //     element.click();

    // });


    // puppeteer.launch().then(async browser => {
    //     const page = await browser.newPage();
    //     await page.evaluate(() => {
    //         let elements = document.getElementsByClassName('showGoals');
    //         for (let element of elements)
    //             element.click();
    //     });
    //     // browser.close();
    // });



})()