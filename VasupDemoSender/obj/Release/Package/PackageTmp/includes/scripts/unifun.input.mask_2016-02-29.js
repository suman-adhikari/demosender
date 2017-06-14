$.fn.inputMask = function (options) {
    var Object = $(this);
    if (typeof options === 'undefined') {
        console.log("Provide options");
    } else {
        var defaultValue = Object.val();
        var mask = options.mask.match(/\d+/)[0];
        var defaultValueSet = options.mask;
        var maskLength = options.mask.length;
        var color = {color: "#7A7A7A"}
        var currentCaretPosition = 0;
        selectUnselect(Object, maskLength);

        if(defaultValue.substr(0, mask.length) === mask){
            defaultValueSet += defaultValue.substr(mask.length, defaultValue.length);
        }else{
            defaultValueSet += defaultValue;
        }
        defaultValueSet = defaultValueSet.substr(0, maskLength+options.numbers);
        Object.val(defaultValueSet);

        Object.css(color);
    //    Object.attr('maxlength', maskLength + options.numbers);

        var inputsArray = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 46, 8, 35, 36, 37, 38, 39, 40];
        var numberArray = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

        Object.on("paste", function (e) {
            e.preventDefault();
            var pastedData = e.originalEvent.clipboardData.getData('text').match(/\d+/)[0];

            if(pastedData.substr(0, mask.length) === mask){
                pastedData = options.mask + pastedData.substr(mask.length, pastedData.length);
            }else{
                pastedData = options.mask + pastedData;
            }

            pastedData = pastedData.substr(0, maskLength+options.numbers);

            var newValue = pastedData;
            for($i = 0; $i < (maskLength + options.numbers) - pastedData.length ; $i++){
                newValue += '_';
            }
            Object.val(newValue);

            setCaretPosition($(this).attr('id'), pastedData.length);
        });

        Object.on("keydown", function (e) {
            var event = e.which;
            var valueLength = $(this).val().length;
            var CurrentValue = $(this).val();
            currentCaretPosition = $(this)[0].selectionStart;
            selectUnselect(Object, maskLength);

            if (!(event == 86 && e.ctrlKey)) {
                if ($(this)[0].selectionStart < maskLength && (event == 8 || event == 46))
                    e.preventDefault();

                if (CurrentValue.match(/[\d-]+/)[0].length <= maskLength && (event == 8 || event == 46))
                    e.preventDefault();

                if (inputsArray.indexOf(event) == -1)
                    e.preventDefault();
                else{
                    var currentPosition = CurrentValue.match(/[\d-]+/)[0].length;
                    if (numberArray.indexOf(event) > -1 && valueLength > maskLength) {
                        Object.val(CurrentValue.substr(0, CurrentValue.length - 1));
                        setCaretPosition($(this).attr('id'), currentPosition);
                    }
                }
            }

            var currentPosition = CurrentValue.length;
            var newValue = CurrentValue;
            if (event != 46 && event != 8 && currentPosition == maskLength) {
                for($i = 1; $i < (maskLength + options.numbers) - currentPosition ; $i++){
                    newValue += '_';
                }
                Object.val(newValue);

                setCaretPosition($(this).attr('id'), currentPosition);
            }
        });

        Object.on("keyup", function (e) {
            var event = e.which;
            var CurrentValue = $(this).val();
            var currentPosition = CurrentValue.length;
            var totalLength = CurrentValue.match(/[\d-]+/)[0].length;

            if(CurrentValue.match(/[\d-]+/)[0].length == maskLength){
                Object.val(options.mask);
            }else if ((event == 46 || event == 8) && CurrentValue.match(/[\d-]+/)[0].length > maskLength && totalLength <= (options.numbers + maskLength )) {
                Object.val(CurrentValue + '_');
                if(event == 8)
                    currentCaretPosition --;
                setCaretPosition($(this).attr("id"), currentCaretPosition);
            }
        });

        Object.on("focus", function () {
            color.color = "#333333";
            $(this).css(color);

            var CurrentValue = $(this).val();
            var newValue = CurrentValue;
            var currentPosition = $(this).val().match(/[\d-]+/)[0].length;
            if(newValue.length > maskLength) {
                for ($i = 0; $i < (maskLength + options.numbers) - currentPosition; $i++) {
                    newValue += '_';
                }
                Object.val(newValue);

                setCaretPosition($(this).attr('id'), currentPosition);
            }
            setCaretPosition($(this).attr('id'), currentPosition);
        });

        Object.on("click", function(){
            var currentPosition = $(this).val().match(/[\d-]+/)[0].length;
            if($(this)[0].selectionStart > currentPosition)
                setCaretPosition($(this).attr('id'), currentPosition);
        });

        Object.on("blur", function () {
            var valueLength = $(this).val().length;

            if (valueLength > maskLength) {
                color.color = "#333";
            } else {
                color.color = "#7A7A7A";
            }

            $(this).css(color);
            var CurrentValue = $(this).val();
            Object.val(CurrentValue.match(/[\d-]+/)[0]);
        });
    }

    function setCaretPosition(elemId, caretPos) {
        var el = document.getElementById(elemId);

        el.value = el.value;
        // ^ this is used to not only get "focus", but
        // to make sure we don't have it everything -selected-
        // (it causes an issue in chrome, and having it doesn't hurt any other browser)

        if (el !== null) {

            if (el.createTextRange) {
                var range = el.createTextRange();
                range.move('character', caretPos);
                range.select();
                return true;
            }

            else {
                // (el.selectionStart === 0 added for Firefox bug)
                if (el.selectionStart || el.selectionStart === 0) {
                    el.focus();
                    el.setSelectionRange(caretPos, caretPos);
                    return true;
                }

                else { // fail city, fortunately this never happens (as far as I've tested) :)
                    el.focus();
                    return false;
                }
            }
        }
    }

    function selectUnselect(Object, maskLength){
        if (Object.val().length <= maskLength){
            Object.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
        }else{
            Object.removeAttr("unselectable");
            Object.css("user-select", "")
        }
    }

    function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }
}