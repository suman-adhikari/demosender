function Russian() {


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

        if (RussianObject == null) {


            var RussianLanguage = RussianObject = primaryObject.LoadLangauge('Russian');

        } else {

            var RussianLanguage = RussianObject;
        }


        if (RussianLanguage == null) {

            return string;
        }

        if ((eval("RussianLanguage." + $matchedLanguageKey[0]) != undefined)) {

            return (eval("RussianLanguage." + $matchedLanguageKey[0]));

        } else {

            return string;
        }

    }
}

