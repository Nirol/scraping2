// dom element selectors
module.exports = {
    SELECTORS: {
        YESHUV_SELECTOR: '#txtYeshuv',
        RECHOV_SELECTOR: '#txtRechov',

        NEHES_TYPE_SELECTOR: '#ContentUsersPage_DDLTypeNehes',

        MAHUT_ISKA_SELECTOR: '#ContentUsersPage_DDLMahutIska',

        DATE_SELECTOR: '#ContentUsersPage_DDLDateType',

        FROM_DATE_SELECTOR: "#ctl00_ContentUsersPage_txtyomMechira_dateInput",

        TO_DATE_SELECTOR: "#ctl00_ContentUsersPage_txtadYomMechira_dateInput",

        CAPTCHA_IMAGE_SELECTOR: "#ContentUsersPage_RadCaptcha1_CaptchaImageUP",

        CAPTCHA_INPUT_SELECTOR: "#ContentUsersPage_RadCaptcha1_CaptchaTextBox",



        SEARCH_BUTTON_SELECTOR: "#ContentUsersPage_btnHipus"

    },
    VALUES: {
        YESHUV_TEXT: "ירושלים",
        RECHOV_TEXT: "דוד המלך",
        NEHES_TYPE_SELECT: "9", //KLALI =9
        MAHUT_ISKA_SELECT: "1", //single option+
        DATE_SELECT: "1",
        FROM_DATE_TEXT: "22/06/2019",
        TO_DATE_TEXT: "01/01/2020"
    },
    // There are 12 results per page, starting from ct102 to ct113.
    // the href link pattern to the inner page will contain the  string:
    //   (DDD = NUMBER BETWEEN 102 TO 113)
    // ctl00$ContentUsersPage$GridMultiD1$ctDDD$LogShow
    INNER_LINK_PATTERN: 'ctl00$ContentUsersPage$GridMultiD1$ct'




}