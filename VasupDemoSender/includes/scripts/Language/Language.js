$(document).ready(function () {

    EnglishObject = null;
    RussianObject = null;
    PrimaryObject = null;

    var CookieSet = $.cookie('Icb_Broadcaster_Language');

    var LangaugeString = "English";

    if (CookieSet == null) {

    } else {
        LangaugeString = CookieSet;
    }
    var primaryLanguage = document.createElement("script");

    primaryLanguage.type = "text/javascript";
    primaryLanguage.id = "PrimaryLanguage";
    primaryLanguage.src = BASE_URL + "includes/scripts/Language/Primary.js";

    $("head").find('#LanguageJS').after(primaryLanguage);
    
    var s = document.createElement("script");

    s.type = "text/javascript";

    s.src = BASE_URL + "includes/scripts/Language/" + LangaugeString + '.js';

    $("head").find('#PrimaryLanguage').after(s);


    Language = eval("new " + LangaugeString + "()");


});



