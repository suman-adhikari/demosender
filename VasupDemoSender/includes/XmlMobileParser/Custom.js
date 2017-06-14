var $editor;

function setEditor(editor) {
    $editor = editor;
}

function LoadData(input) {
    file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var text = reader.result;
        return text;
    }
    reader.readAsText(file, "UTF-8");
 
};


function previewFile(input, $textAreaDiv) {
    
    try {
        if (input.files[0].name.substr(input.files[0].name.lastIndexOf('.') + 1) != 'xml') {
            return 0;
        }
        file = input.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var text = reader.result;
            $editor.setValue(text);
            $textAreaDiv.find('textarea').trigger("keyup");
        }
        reader.readAsText(file, "UTF-8");
        return 1;
    }
    catch (e) {
        /*console.log(e.message);*/
        return -1;
    }
};


function showNewForm(title, url, width, height, divId, data) {

    var formDiv = $('<div></div>');

    if (data === "undefined") {
        data = null;
    }

    if (divId) {
        formDiv.attr("id", divId);
    }
    window.newFormDialog = formDiv.dialog({
        width: width,
        height: height,
        title: title,
        modal: true,
        resizable: false,
        close: function () {
            removeDialog(this);
        },
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text"></span>');
        }
    });

    $.ajax({
        type: "get",
        url: url,
        data: data,
        success: function (response) {
            formDiv.html(response);
        }
    });
}

function clear($string) {
    
    $editor.setValue($string);
    $(".MobileContent").find("p").text("");
}


function SetEditorText($string) {  
    try {
        $editor.setValue($string);
        $editor.setCursor($editor.lineCount(), 0);
        $('#XmlcontentAreaDiv').find('textarea').trigger("keydown");
    }
    catch (err) {
        return false;
    }
    return true;
}


function CreateTemplate(myArray, encoding) {

    var encode = ' encoding="ucs2"';
    if (encoding == 'Latin')
        encode = "";
    var $xmlData;
    $xmlData = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<icbml>\n' +
        ' <card id="default">\n';
    if (myArray["playTone"] == '1') {
        $xmlData += ' \t<play-tone>\n' +
            ' \t\t<tone type="tenth-seconds" duration="1" value="10"/>\n' +
            ' \t</play-tone>\n';
    }
    if (myArray["displayText"] == '1') {
        $xmlData += ' \n\t<display delay="no" priority="low">\n' +
            ' \t  <string>\n' +
            ' \t\t<text' + encode + '>' + myArray["NumberOfClicktext1"] + '</text>\n' +
            ' \t  </string>\n' +
            ' \t</display>\n';

        if (myArray["NumberOfClicktext2"].length != 0) {
            $xmlData += ' \n\t<display delay="no" priority="low">\n' +
                ' \t  <string>\n' +
                ' \t\t<text' + encode + '>' + myArray["NumberOfClicktext2"] + '</text>\n' +
                ' \t  </string>\n' +
                ' \t</display>\n';
        }
        if (myArray["NumberOfClicktext3"].length != 0) {
            $xmlData += ' \n\t<display delay="no" priority="low">\n' +
                ' \t  <string>\n' +
                ' \t\t<text' + encode + '>' + myArray["NumberOfClicktext3"] + '</text>\n' +
                ' \t  </string>\n' +
                ' \t</display>\n\n';
        }
        if (myArray["NumberOfClicktext4"].length != 0) {
            $xmlData += ' \n\t<display delay="no" priority="low">\n' +
                ' \t  <string>\n' +
                ' \t\t<text' + encode + '>' + myArray["NumberOfClicktext4"] + '</text>\n' +
                ' \t  </string>\n' +
                ' \t</display>\n';
        }
    }
    if (myArray["activationCommand"] == '1') {
        if (myArray["activationType"] == 1) {
            $xmlData += ' \n\t<send-sms smsc="' + myArray["activationTypeSmsc"] + '">\n' +
                ' \t  <title type="compact"><text>' + myArray["activationTypeTitleText"] + '</text></title>\n' +
                ' \t\t<address>' + myArray["activationTypeAddress"] + '</address>\n' +
                ' \t  <string><text>' + myArray["activationTypeText2"] + '</text></string>\n' +
                ' \t</send-sms>\n\n';
        }
        else if (myArray["activationType"] == 2) {
            $xmlData += ' \n\t<send-ussd>\n' +
                ' \t  <title><text>' + myArray["activationTypeTitleText"] + '</text></title>\n' +
                ' \t  <string><text>' + myArray["activationTypeAddress"] + '</text></string>\n' +
                ' \t</send-ussd>\n\n';
        }
        else if (myArray["activationType"] == 3) {
            $xmlData += ' \n\t<set-up-call>\n' +
                ' \t  <title><text>' + myArray["activationTypeTitleText"] + '</text></title>\n' +
                ' \t  <address>' + myArray["activationTypeAddress"] + '</address>\n' +
                ' \t</set-up-call>\n\n';
        }
    }
    $xmlData += " </card>\n</icbml>";

    SetEditorText($xmlData);
}


var xml;

function checkInputTextLength(inputText) {
    textToAppend = '';

    xml = $.parseXML(inputText);
    tempXml = $.parseXML(inputText);
    $.each($(tempXml).find("display"), function (key, value) {
        var leng = 240;
        if ($(value).find('text').attr('encoding') == 'ucs2') {
            leng = 120;
        }
        var textCropped = $(value).find('text').text().substring(0, leng);
        //noinspection CssInvalidHtmlTagReference
        $($(xml).find('display string text')[key]).text(textCropped);
    });

    var xmlString = xml.documentElement.outerHTML;

    $editor.setValue(xmlString);

    return xmlString;


}


function checkXmlValidation() {
  
    var errorMessage = "";
    try {
        xml = $.parseXML($editor.getValue());

        if (xml != null || xml != "") {
            for (var i = 0; i < $(xml).find("text").length; i++) {
                $text = $($(xml).find("text").eq(i)).text().match(/[&^<>№`‘]/);
                if ($text != null)
                    throw "ex";
            }
        }

    } catch (e) {
        errorMessage = Language.translate("XML wrong format, please adjust");
        return errorMessage;
    }
    x = $(xml).find("display");

    for (var j = 0; j < x.length; j++) {
        var leng = 240;
        if ($(x).eq(j).find('text').attr('encoding') == 'ucs2') {
            leng = 120;
        }
        if ($(x).eq(j).find('text').text().length > leng) {
            return errorMessage = Language.translate("Latin: 240 letters inside") + "< text >" + Language.translate("tag") + "<br/>" + Language.translate("Cyrillic & Latin: 120 letters inside") + "< text >" + Language.translate("tag");
        }
    }

    if (errorMessage != "")
        return errorMessage;

    if ($(xml).find("send-sms").length > 0) {
        if ($(xml).find("send-sms address").text().length > 0) {
            if ($(xml).find("send-sms address").text().match(/^([0-9]|[*#+])+$/) == null) {
                return errorMessage = Language.translate("Add value to the Address; only numbers inside") + "&lt; address &gt;" + Language.translate("tag");
            }
        } else {
            return errorMessage = Language.translate("Add value to the Address; only numbers inside") + "&lt; address &gt;" + Language.translate("tag");
        }
    }
    if ($(xml).find("send-sms").length > 0 && $(xml).find("send-sms string text").text().length <= 0) {

        return errorMessage = Language.translate("Please add value to the String text");
    }

    if ($(xml).find("send-ussd").length > 0 && $(xml).find("send-ussd string text").text().length <= 0) {
        return errorMessage = Language.translate("Please add value to the String text");
    }
    if ($(xml).find("send-ussd").length > 0 && $(xml).find("send-ussd string text").text().length > 0) {
        if ($(xml).find("send-ussd string text").text().match(/^([0-9]|[*#+])+$/) == null) {
            return errorMessage = Language.translate("Please revise the value in the String text");
        }
    }

    if ($(xml).find("set-up-call").length > 0) {
        if ($(xml).find("set-up-call address").text().length > 0) {
            if ($(xml).find("set-up-call address").text().match(/^([0-9]|[*#+])+$/) == null) {
                return errorMessage = Language.translate("Add value to the Address; only numbers inside") + "&lt; address &gt;" + Language.translate("tag");
            }
        } else {
            return errorMessage = Language.translate("Add value to the Address; only numbers inside") + "&lt; address &gt;" + Language.translate("tag");
        }

    }
    //return errorMessage;

}



