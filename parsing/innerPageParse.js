class diraInnerPage {
    constructor(id, koteret = null, priceTable = null, midTable = null, midEndTable = null, endTable = null) {
        this.ID = id;
        this.koteret = koteret;
        this.priceTable = priceTable;
        this.midTable = midTable;
        this.midEndTable = midEndTable;
        this.endTable = endTable;
    }
}


module.exports = {
    parseInnerPage: async function(page, mainPageIndex, innerPagesArray) {
        var constants = require('../config/constants');
        url = await page.url();
        if (url.indexOf(constants.INNER_LINK_NEHES_DIRA) !== -1) {
            let dira = new diraInnerPage(mainPageIndex);
            await privateParseInnerPageDira(page, dira);
            innerPagesArray.push(dira);
        } else if (url.indexOf(constants.INNER_LINK_NEHES_KARKA) !== -1) {
            console.log("lol karka");
            // TODO: support karka
        }
    }
}

async function privateParseInnerPageDira(page, innerData) {
    await privateParseKoteret(page, innerData);
    await privateParsePriceTable(page, innerData);
    await privateParseMidTable(page, innerData);
    await privateParseMidEndTable(page, innerData);
    await privateParseEndTable(page, innerData);

}

/*
Inner page Selectors were not suppose to be hardcoded over this file
but to be located inside the config/innerPageSelectors.js file
for some voodo JS reason im not familiar enough yet it doesnt work
#TODO : fix it

*/
async function privateParseKoteret(page, innerData) {
    var koteret = new Object();
    // make sure first selector parsed is ready before starting:
    await page.waitForSelector("#ContentUsersPage_lblEzor");

    koteret.ezor = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblEzor").textContent);
    koteret.gush = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblGush").textContent);
    koteret.tarihIska = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblTarIska").textContent);
    koteret.yeshuv = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblYeshuv").textContent);
    koteret.rechov = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblRechov").textContent);


    koteret.bayit = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblBayit").textContent);
    // ...


    koteret.knisa = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblKnisa").textContent);
    // ...



    koteret.dira = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblDira").textContent);
    // ...





    innerData.koteret = koteret;
}

async function privateParsePriceTable(page, innerData) {
    var priceTable = new Object();
    priceTable.mcirMozhar = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMcirMozhar').textContent);
    priceTable.mcirMozharDlr = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMcirMozharDlr").textContent);
    priceTable.mcirMorach = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMcirMorach").textContent);
    priceTable.mcirMorachDlr = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMcirMorachDlr").textContent);
    innerData.priceTable = priceTable;
}

async function privateParseMidTable(page, innerData) {
    var midTable = new Object();

    // mid table variables:
    //first row:
    midTable.setachBruto = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblShetachBruto").textContent);
    midTable.misparHadarim = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMisHadarim").textContent);
    midTable.gag = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblGag").textContent);
    //second row:
    midTable.setachNeto = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblShetachNeto").textContent);
    midTable.setachKoma = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblKoma").textContent);
    midTable.machsan = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMachsan").textContent);
    //third row:
    midTable.shnatBniya = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblShnatBniya").textContent);
    midTable.misparKomot = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMisKomot").textContent);
    midTable.hzer = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblHzer").textContent);
    // fourth row:
    midTable.mechirCheder = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMechirCheder").textContent);
    midTable.dirotBnyn = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblDirotBnyn").textContent);
    midTable.migrash = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMigrash").textContent);
    // fifth row:
    midTable.mechirLmr = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMechirLmr").textContent);
    midTable.hanayra = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblHanaya").textContent);
    midTable.glrya = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblGlrya").textContent);
    innerData.midTable = midTable;
    // six row:  FIND SAMPLE WITH MALIT !! TODO
}


async function privateParseMidEndTable(page, innerData) {
    var midEndTable = new Object();
    midEndTable.sugIska = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblSugIska').textContent);
    midEndTable.tifkudBinyan = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblTifkudBnyn').textContent);
    midEndTable.tifkudYechida = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblTifkudYchida").textContent);
    midEndTable.shuma_halakim = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblShumaHalakim").textContent);
    innerData.midEndTable = midEndTable;
}

async function privateParseEndTable(page, innerData) {
    var endTable = new Object();
    endTable.mofaGush = await page.evaluate(() => document.querySelector('#ContentUsersPage_lblMofaGush').textContent);
    endTable.tava = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblTava").textContent);
    endTable.mahutZchut = await page.evaluate(() => document.querySelector("#ContentUsersPage_lblMahutZchut").textContent);

    innerData.endTable = endTable;
}