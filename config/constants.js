module.exports = {
    MAIN_PAGE_URL: 'https://www.misim.gov.il/svinfonadlan2010/',
    // response contain the records of all query results (result of all pages not only the first page)
    MAIN_PAGE_DATA_REQUEST: "https://www.misim.gov.il/svinfonadlan2010/InfoNadlanPerutWithMap.aspx/GetPoints",

    RESULTS_PER_PAGE: 12,

    // There from 1 to 12 result pages for each query (maximum of 150 results per query)
    // the selector id for clicking a page is as follow where
    //  the suffix: 'td:nth-child(X) > a'  X is switched to numbers between 1-12
    // TODO VALIDATE THIS
    PAGE_SELECTOR_PATTERN: '#ContentUsersPage_GridMultiD1 > tbody > tr.table_title.tabelPages > td > table > tbody > tr > td:nth-child(X) > a',
    NUMBERS_OF_PAGES_PATTERN: '#ContentUsersPage_GridMultiD1 > tbody > tr.table_title.tabelPages > td > table > tbody > tr > td',
    PAGE_NUMBER_PATTERN_INDEX: 107,

    // There are 12 results per page, starting from 0 to 11.
    // the selector id for a page with an inner looks like:
    // #ContentUsersPage_GridMultiD1_LogShow_D
    // where D goes from 0 to 11.
    INNER_LINK_PATTERN: '#ContentUsersPage_GridMultiD1_LogShow_',


    INNER_LINK_NEHES_DIRA: "perutOfDira",
    INNER_LINK_NEHES_KARKA: "perutOfKarka",


    OUTPUT_MAIN_FILE: "output/mainPageData.json",
    OUTPUT_INNER_LINKS_FILE: "output/innerPageData.json"
}