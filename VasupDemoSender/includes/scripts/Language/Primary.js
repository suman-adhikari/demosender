function Primary() {


    this.responseText = null;
    this.IsJson = function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    this.LoadLangauge = function (LanguageString) {

        console.log(LanguageString + " Language Loading....");

        var responseTextString = null;
        if (LanguageString == null) {

            LanguageString = "Primary";
        }
        $.ajax({
            url: BASE_URL + 'Admin/GetLanguage/GetLanguageClass',
            type: "POST",
            async: false,

            data: {Langauge: LanguageString},
            beforeSend: function () {


            }, complete: function (data) {


                responseTextString = data.responseText;
            }

        });


        var returnObj = (this.IsJson(responseTextString)) ? $.parseJSON(responseTextString) : null;


        return returnObj;


    }
}

