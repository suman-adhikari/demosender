function English() {


    this.translate = function (string) {

        var primaryObject = new Primary();

        if (PrimaryObject == null) {


            var PrimaryLanguageObject = PrimaryObject = primaryObject.LoadLangauge();

        } else {

            var PrimaryLanguageObject = PrimaryObject;
        }


        if (PrimaryLanguageObject == null) {

            return string;
        }


        var $matchedLanguageKey = jQuery.map(PrimaryLanguageObject, function (ObjectValue, ObjectKey) {


            if (typeof(ObjectValue) == "string") {

                if (ObjectValue.toLowerCase() == string.toLowerCase()) {

                    return ObjectKey;

                }

            }

        });

        if (EnglishObject == null) {


            var EnglishLanguage = EnglishObject = primaryObject.LoadLangauge('English');

        } else {

            var EnglishLanguage = EnglishObject;
        }


        if (EnglishLanguage == null) {

            return string;
        }


        if ((eval("EnglishLanguage." + $matchedLanguageKey[0]) != undefined)) {

            return (eval("EnglishLanguage." + $matchedLanguageKey[0]));

        } else {

            return string;
        }

    }
}

