function exists(needle, haystack) {
    return ($.inArray(needle, haystack) > -1);
}
function changeLanguage(language, site_url) {

    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "Icb_Broadcaster_Language=" + language + ";" + expires + ";path=/";
    document.location = "";
}

function ShowInputImage(input, id, height, width, callback) {
    if (typeof(width) == "undefined") {
        width = 150;
    }
    if (typeof(height) == "undefined") {
        height = 150;
    }
    if (typeof(id) == "undefined") {
        console.log("id must be defined!");
    }
    if (input.files && input.files[0]) {
        if ((input.files[0].size / 1024) < 5120) {
            if (jQuery.inArray(input.files[0].type, ["image/png", "image/jpeg", "image/jpg", "image/gif"]) >= 0) {
                $('#ProfilePicErrorUpload').addClass('hide');
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#' + id)
                        .attr('src', e.target.result)
                        .width(width)
                        .height(height);
                };

                reader.readAsDataURL(input.files[0]);

                return true;
            }
            else {
                $('#message-dialog-ProfilePicErrorUpload').html("File Format not supported. Please upload png/jpg/jpeg/gif file.");
                $('#ProfilePicErrorUpload').removeClass('hide');
                return false;
            }
        }
        else {
            $('#message-dialog-ProfilePicErrorUpload').html("Cannot upload image greater than 5MB.");
            $('#ProfilePicErrorUpload').removeClass('hide');
            return false;
        }
    }
    if (typeof(callback) != "undefined") {
        eval(callback);
    }

}


function showAddNewForm(title, url, width, height, data) {
    var formDiv = $('<div></div>');
    if (data === "undefined") {
        data = null;
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
        data: {param: data},
        success: function (response) {
            formDiv.html(response);
        }
    });
}

function showEditFormWithId(id, title, url, width, height, data) {
    editForm(title, url, width, height, data, id);
}

function editForm(title, url, width, height, data, id) {
    var formDiv = $('<div/>');
    formDiv.dialog({
        width: width,
        height: height,
        modal: true,
        title: title,
        position: 10,
        resizable: false,


        close: function () {
            removeDialog(this);
        },
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
        },
        dialogClass: 'dlgfixed'
    });

    $.ajax({
        type: "get",
        url: url,
        data: {'ID': id, 'param': data},
        success: function (response) {
            formDiv.html(response);
        }
    });
}

function showEditForm(thisObj, title, url, width, height, data) {
    var id;

    if ($(thisObj).closest('tr').length) {
        id = $(thisObj).closest('tr').attr('id');
    } else {
        id = $(thisObj).closest('div[data-id]').attr('data-id');
    }

    editForm(title, url, width, height, data, id);
}

function showPopUp(thisObj, title, url, width, height) {
    var datetime = $(thisObj).closest('tr').attr('id');

    var parameter = {'DateTime': datetime};

    if ($(thisObj).closest('tr').attr('Interval') != null) {
        parameter = extendJson(parameter, {'Interval': $(thisObj).closest('tr').attr('Interval')});
    }

    var formDiv = $('<div/>');
    window.newFormDialog = formDiv.dialog({
        width: width,
        height: height,
        title: title,
        resizable: false,
        close: function () {
            removeDialog(this);
        },
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
        },
        dialogClass: 'dlgfixed'
    });

    $(".dlgfixed").center(false);

    $.ajax({
        type: "get",
        url: url,
        data: parameter,
        success: function (response) {
            formDiv.html(response);
        }
    });
}

function viewTeaser(thisObj, title, url, width, height, data) {
    var id;

    id = $(thisObj).attr('teaserid');

    editForm(title, url, width, height, data, id);
}

function viewBroadcast(thisObj, title, url, width, height, data) {
    var id;

    id = $(thisObj).attr('broadcastid');

    editForm(title, url, width, height, data, id);
}

function newFormSave(thisObj, url, title, width, height) {
    var formId = $(thisObj).attr("id");
    $('#' + formId).validationEngine();
    var alertDiv = $("<div/>");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "",
        data: $("#" + formId).serialize(),
        beforeSend: function () {
            $(alertDiv).html("please wait");
        },
        success: function (data) {
            $(alertDiv).html(data.message);
        }
    });
    var noticeDialog = alertDiv.dialog({
        width: width,
        height: height,
        title: title,
        resizable: false,
        buttons: {
            "Ok": function () {
                noticeDialog.dialog("close");
                newFormDialog.dialog("close");
                location.reload();
            }
        },
        close: function () {
            removeDialog(this);
        },
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
        },
        dialogClass: 'dlgfixed'
    });
}
function removeDialog(thisObj) {
    $(thisObj).find('input').each(function () {
        $(this).trigger('removeErrorMessage');
    });

    $(thisObj).dialog('destroy').remove();
}

function closeDialog(thisObj) {
    $(thisObj).find('input').each(function () {
        $(this).trigger('removeErrorMessage');
    });

    $(thisObj).closest('.ui-dialog-content').dialog('close');

}


function AjaxConfirmation(methodCallBack, title, confirmMsg, OkLabel, CancelLabel) {

    if (OkLabel == null)
        OkLabel = "Yes";

    if (CancelLabel == null)
        CancelLabel = "No";

    var $confirmationDialogDiv = $("<div id='dialog-confirm' title='Confirm'><p>" + confirmMsg + "</p></div>");

    $confirmationDialogDiv.dialog({
        title: title,
        resizable: false,
        height: 'auto',
        width: 'auto',
        modal: true,
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
        },
        buttons: [
            {
                text: OkLabel,
                click: function () {
                    $(this).dialog("close");
                    eval(methodCallBack);
                    $('#dialog-confirm').remove();
                }
            },
            {
                text: CancelLabel,
                click: function () {
                    $(this).dialog("close");
                    $('#dialog-confirm').remove();
                }
            }]
    }).parent().find(".ui-dialog-titlebar-close").click(function () {
        $('#dialog-confirm').remove();
    });
}


var confirmed = false;

function Confirmation(obj, title, confirmMsg, OkLabel, CancelLabel) {

    var confirm;
    if (OkLabel == null)
        OkLabel = "Yes";

    if (CancelLabel == null)
        CancelLabel = "No";


    if (!confirmed) {
        $('body').append("<div id='dialog-confirm'><p>" + confirmMsg + "</p>");

        $("#dialog-confirm").dialog({
            title: title,
            resizable: false,
            height: "auto",
            width: "auto",
            open: function () {
                var closeBtn = $('.ui-dialog-titlebar-close');
                closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
            },
            modal: true,
            buttons: [
                {
                    text: OkLabel,
                    click: function () {
                        $(this).dialog("close");
                        $('#dialog-confirm').remove();
                        confirmed = true;
                        obj.click();
                    }
                },
                {
                    text: CancelLabel,
                    click: function () {
                        $(this).dialog("close");
                        confirmed = false;
                        $('#dialog-confirm').remove();
                    }
                }
            ]

        }).parent().find(".ui-dialog-titlebar-close").click(function () {
            $('#dialog-confirm').remove();
        });

        if (CancelLabel == 'null') {
            $('.ui-dialog-buttonset').find("button:First-child").remove();
            $('.ui-dialog-buttonset').find("button:last-child").text(OkLabel)
        }

    }
    confirm = confirmed;
    confirmed = false;
    return confirm;
}

Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
};

Date.prototype.minusDays = function (days) {
    this.setDate(this.getDate() - days);
    return this;
};

Date.prototype.YmdFormat = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();

    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); // padding
};


function DisplayPercentBar(tableId, columnIndex, maxWidth) {
    $("#" + tableId + " tbody tr td:nth-child(" + columnIndex + ")").each(function () {
        var cell = $(this);
        var actualContent = cell.text();

        if (actualContent == "")
            actualContent = "0.00";

        var percent = parseFloat(actualContent.replace('%', '').trim());
        var width = 1;
        if (!isNaN(percent) && percent > 0) {
            var temp = percent;
            if (temp == 0.00)
                width = 1;
            else
                width = (Math.round(maxWidth * temp) / 100).toFixed(1);
        }
        // cell.html("<div style='display: inline-block;width:" + width + "px;background-color:#3fbb32;height:10px;'>" + actualContent + "</div>");
        var element = $("#AnimationBar").clone();
        cell.html(element);
        element.animate({"width": width}, 1000);
        element.after("<span>  " + actualContent + "%</span>");
    });
}

function extendJson(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}


function Warning(title, message) {
    var $WarningDialogDiv = $("<div id='dialog-confirm' title='Warning'><p>" + message + "</p></div>");
    $WarningDialogDiv.dialog({
        title: title,
        resizable: false,
        height: 'auto',
        width: 'auto',
        modal: true,
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
        },
        buttons: {
            Ok: function () {
                $(this).dialog("destroy");
            }
        }
    });
}

function editConfirmation(thisObj, title, url, confirmMsg, OkLabel, CancelLabel, height, width) {
    var id;
    var Yes = "Yes";
    var No = "No";
    var confirmMsgs = "Are you sure you want to edit?";

    if (confirmMsg != null) {
        confirmMsgs = confirmMsg;
    }
    if (OkLabel != null) {
        Yes = OkLabel;
    }
    if (CancelLabel != null) {
        No = CancelLabel;
    }


    if ($(thisObj).closest('tr').length) {
        id = $(thisObj).closest('tr').attr('id');
    } else {
        id = $(thisObj).closest('div[data-id]').attr('data-id');
    }

    var editFormCallback = 'showEditFormWithId(' + id + ', "' + title + '","' + url + '" , ' + height + ', ' + width + ')';

    AjaxConfirmation(editFormCallback, title, confirmMsgs, Yes, No);

}
function changeDialogHeight($element) {
    var uiDialog = $element.closest('.ui-dialog');
    uiDialog.css({
        'height': uiDialog.find('.ui-dialog-content').height() + 42,
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto'
    });
}

function ConfirmationAddReplace(obj, title, confirmMsg, OkLabel, CancelLabel, formID) {

    if (OkLabel == null)
        OkLabel = "Yes";

    if (CancelLabel == null)
        CancelLabel = "No";

    var value = "Add";
    $('body').append("<div id='dialog-confirm'><p>" + confirmMsg + "</p>");

    $("#dialog-confirm").dialog({
        title: title,
        resizable: false,
        height: "auto",
        width: "auto",
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
        },
        modal: true,
        buttons: [
            {
                text: OkLabel,
                "class": 'btn btn-danger',
                click: function () {
                    $(this).dialog("close");
                    $('#dialog-confirm').remove();
                    value = "Replace";
                    $("#condition_add_replace").val(value);
                    $("#" + formID).submit();
                }
            },
            {
                text: CancelLabel,
                "class": 'btn btn-success',
                click: function () {
                    $(this).dialog("close");
                    value = "Add";
                    $('#dialog-confirm').remove();
                    $("#condition_add_replace").val(value);
                    $("#" + formID).submit();
                }
            }
        ]

    }).parent().find(".ui-dialog-titlebar-close").click(function () {
        $('#dialog-confirm').remove();
    });

    return value;
}


function IsModifiedLatestSummary(obj, title, confirmMsg, Latest, Summary) {

    if (Latest == null)
        Latest = "Latest";

    if (Summary == null)
        Summary = "Summary";

    var value = "Latest";
    $('body').append("<div id='dialog-confirm'><p>" + confirmMsg + "</p>");

    $("#dialog-confirm").dialog({
        title: title,
        resizable: false,
        height: "auto",
        width: "500",
        open: function () {
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');
        },
        modal: true,
        buttons: [
            {
                text: Latest,
                "class": 'btn btn-danger',
                click: function () {
                    $(this).dialog("close");
                    $('#dialog-confirm').remove();
                    value = Latest;
                    $("#LatestSummary").val(value);
                    $(obj).closest("form").submit();
                }
            },
            {
                text: Summary,
                "class": 'btn btn-success',
                click: function () {
                    $(this).dialog("close");
                    value = Summary;
                    $('#dialog-confirm').remove();
                    $("#LatestSummary").val(value);
                    var action = $(obj).closest("form").attr("action");
                    $(obj).closest("form").attr("action", action + "?summary=true");
                    $(obj).closest("form").submit();
                }
            }
        ]

    }).parent().find(".ui-dialog-titlebar-close").click(function () {
        $('#dialog-confirm').remove();
    });

    return value;
}

function onlyNumbers(evt) {
    var e = evt;
    var browserVal = navigator.userAgent.toLowerCase();
    var isFirefox = browserVal.indexOf("firefox") > -1;
    var charCode;
    if (isFirefox)
        charCode = e.which;
    else
        charCode = e.which || e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function DisplayMessage(messageDiv, messageType, message) {

    var button = '<button type="button" class="close" data-dismiss="alert">×</button>';

    var div = '<div class="alert alert-' + messageType + '"> ' + message + '</div>';

    $(messageDiv).html('<div>' + button + div + '</div>');

}


function RefreshAllTableGrid($obj) {
    $this = $obj;
    $($this).find('.glyphicon').addClass('glyphicon-refresh-animate');


    $.each($($this).closest('.UnifunBlock').find('table'), function () {

        $(this).trigger('refreshGrid');


        setTimeout(function () {


            $($this).find('.glyphicon').removeClass('glyphicon-refresh-animate');

        }, 500);

    });


}
function RefreshTableGrid($obj) {
    $this = $obj;
    $($this).find('.glyphicon').addClass('glyphicon-refresh-animate');
    if ($($this).closest('.UnifunBlock').find('table').length == 1) {

        var tableId = "#" + $($this).closest('.UnifunBlock').find('table').attr('id');
    } else {

        var tableId = "#" + $($this).closest('.UnifunHeading3').next('table').attr('id');
    }
    console.log(tableId);
    $(tableId).trigger('refreshGrid');


    setTimeout(function () {


        $($this).find('.glyphicon').removeClass('glyphicon-refresh-animate');

    }, 500);
}

function IsOverlapped(selectedObj, objectOrArray) {


    var $return = false;
    var $selectedObjCriteriaValue = selectedObj.next('span').html();

    var selectedMinValue = null;
    var selectedMaxValue = 999999999;

    if ($selectedObjCriteriaValue.indexOf("+") >= 0) {

        selectedMinValue = parseFloat($selectedObjCriteriaValue.replace('+', ''));

    } else if ($selectedObjCriteriaValue.indexOf("-") >= 0) {

        selectedMinValue = parseFloat($selectedObjCriteriaValue.split('-')[0]);

        selectedMaxValue = parseFloat($selectedObjCriteriaValue.split('-')[1]);

    } else {

        selectedMinValue = parseFloat($selectedObjCriteriaValue);

        selectedMaxValue = parseFloat($selectedObjCriteriaValue);
    }

    if ($.type(objectOrArray) == "array") {

        for (i = 0; i < objectOrArray.length; i++) {

            var $list = selectedObj.closest('ul').find('input[type="checkbox"][value="' + objectOrArray[i] + '"]');

            var checkedCriteriaValue = $list.next('span').html();

            var checkedMinValue = null;

            var checkedMaxValue = 999999999;

            if (checkedCriteriaValue.indexOf("+") >= 0) {

                checkedMinValue = parseFloat(checkedCriteriaValue.replace('+', ''));

            } else if (checkedCriteriaValue.indexOf("-") >= 0) {

                checkedMinValue = parseFloat(checkedCriteriaValue.split('-')[0]);

                checkedMaxValue = parseFloat(checkedCriteriaValue.split('-')[1]);

            } else {

                checkedMinValue = parseFloat(checkedCriteriaValue);

                checkedMaxValue = parseFloat(checkedCriteriaValue);
            }


            if ((checkedMinValue > selectedMinValue) && (checkedMinValue >= selectedMaxValue) || (selectedMinValue > checkedMinValue) && (selectedMinValue >= checkedMaxValue)) {

            } else {

                $return = true;
                return true;

            }
        }


    } else if ($.type(objectOrArray) == "object") {


        $.each($(objectOrArray), function (object, objVal) {


            if (!$(objVal).is(selectedObj)) {


                var checkedCriteriaValue = $(objVal).next('span').html();


                var checkedMinValue = null;

                var checkedMaxValue = 999999999;

                if (checkedCriteriaValue.indexOf("+") >= 0) {

                    checkedMinValue = parseFloat(checkedCriteriaValue.replace('+', ''));

                } else if (checkedCriteriaValue.indexOf("-") >= 0) {

                    checkedMinValue = parseFloat(checkedCriteriaValue.split('-')[0]);

                    checkedMaxValue = parseFloat(checkedCriteriaValue.split('-')[1]);

                } else {

                    checkedMinValue = parseFloat(checkedCriteriaValue);

                    checkedMaxValue = parseFloat(checkedCriteriaValue);
                }


                if (((checkedMinValue > selectedMinValue) && (checkedMinValue >= selectedMaxValue)) || ((selectedMinValue > checkedMinValue) && (selectedMinValue >= checkedMaxValue))) {

                } else {

                    $return = true;
                    return true;

                }


            }

        });

    }
    return $return;
}

function ShowCriteriaErrorMessage(selectedObj, message) {

    selectedObj.prop('checked', false);
    selectedObj.closest('li').removeClass('activeCriteria');
    selectedObj.closest('li').find('small').remove();
    selectedObj.closest('li').append(message);
    selectedObj.closest('li').addClass('overlappedError');
    setTimeout(function () {

        selectedObj.closest('li').find('small').fadeOut();
        selectedObj.closest('li').removeClass('overlappedError');
    }, 2000);


}
function populateWithExistingTeaser(selectedObj) {

    var teaserCounter = $('#CounterTeaser').val();

    var selectedCriteria = $('#CriteriasList' + teaserCounter);

    var selectedCriteriaDetailID = selectedObj.closest('.TabBodyWrapper').attr('data-id');

    var selectedCriteriaTypeId = selectedObj.val();

    $.each($('body').find('.CriteriasList'), function () {

        if (!selectedCriteria.is($(this))) {

            var criteriaJsonData = $.parseJSON($(this).val());

            $.each(criteriaJsonData, function (key, val) {

                if (parseInt(val.CriteriaDetailId) == parseInt(selectedCriteriaDetailID)) {

                    if ($.inArray(selectedCriteriaTypeId, val.CriteriaTypeId) > -1) {

                        var message = '<small style="float: right; color: red; font-size: 12px; display: inline-block;">Filter is already choosen for another teaser.</small>';

                        ShowCriteriaErrorMessage(selectedObj, message);

                    } else {

                        var in_range = selectedObj.closest('li').attr('range-filter');

                        if (in_range == "true" && in_range != 'undefined') {

                            if (IsOverlapped(selectedObj, val.CriteriaTypeId)) {

                                var message = '<small style="float: right; color: red; font-size: 12px; display: inline-block;">Filter range segment is already choosen for another teaser.</small>';

                                ShowCriteriaErrorMessage(selectedObj, message);

                            }
                        }

                    }


                }


            });


        }


    });

}

function SelectCriteriaOnClick() {


    $('body').on('click', '.CriteriaID ul.teaser-settings>li:not(.selectionDisabled)', function () {


        var $selectedObj = $(this).find('input[type="checkbox"]');
        if ($(this).find('input[type="checkbox"]').prop('checked')) {

            $(this).find('input[type="checkbox"]').prop('checked', false);
            $(this).removeClass('activeCriteria');
        } else {

            $(this).find('input[type="checkbox"]').prop('checked', true);
            $(this).addClass('activeCriteria');

        }

        var teaserLength = $('#teaserGroup').find('.individualTeaserListContainer').length;
        var firstTeaserValue = $('#teaserGroup').find('.individualTeaserListContainer:first-child').find('.CriteriasList').val();

        if (teaserLength > 1) {
            var firstTeaserValueJson = $.parseJSON(firstTeaserValue);


            if (firstTeaserValueJson.length < 2) {

                populateWithExistingTeaser($selectedObj);
            }
        }
        $.each($(this).closest('ul').find('input[type="checkbox"]'), function () {

            $this = $(this);

            if (!$this.is($selectedObj) && ($selectedObj.next('span').html() == $this.next('span').html())) {


                $this.closest('li').addClass('selectionDisabled');
                $this.closest('li').removeClass('activeCriteria ');
                $this.closest('li.selectionDisabled').find('input[type="checkbox"]').prop('checked', false);

            } else {
                // $this.closest('li').removeClass('selectionDisabled');

            }

        });


        var overlappedError = '<small style="float: right;color: red;font-size: 12px;">Overlapping range cannot be choosed.</small>';

        if (IsOverlapped($selectedObj, $(this).closest('ul').find('li[range-filter="true"]').find('input[type="checkbox"]:checked'))) {


            ShowCriteriaErrorMessage($selectedObj, overlappedError);

        }

        var checkedLength = ($(this).closest('.CriteriaID').find('ul input[type="checkbox"]:checked').length);

        var tab_aria = $(this).closest('.CriteriaID').closest('.TabBodyWrapper').attr('ID');

        if (checkedLength == 0) {

            $('#tabs ul').find('li[aria-controls="' + tab_aria + '"]').removeClass('selectedCriteriaTab')
        } else {

            $('#tabs ul').find('li[aria-controls="' + tab_aria + '"]').addClass('selectedCriteriaTab')
        }


    });

}

function ValidateTeaser($thisObj) {

    var result = false;

    if ($('.TeaserId').length != 1) {

        $.each($('.TeaserId'), function () {

            result = $(this).validationEngine('validate');

        });

        return result;
    } else {
        result = $('.TeaserId').validationEngine('validate');
        return result;
    }

}

function GetCommonCriteria($addObj) {

    var CommonCriteriaIds = Array();
    var jsonCriteriaFirstTeaser = $.parseJSON($('.CriteriasList:eq(0)').val());
    if (jsonCriteriaFirstTeaser != null) {
        $.each(jsonCriteriaFirstTeaser, function (firstkey, firstvalue) {

            CommonCriteriaIds.push(firstvalue.CriteriaDetailId);

        });
    }

    if ($('.CriteriasList:eq(0)').val() != "") {

        $.each($('.CriteriasList'), function (keylist, valuelist) {

            var jsonCriteria = $.parseJSON(($(this).val()));

            debugger;
            if ($(this).val() != "") {


                var teaserCriteriaId = Array();

                var jsonCriteriaDetailId = Array();
                $.each(jsonCriteria, function (jsonkey, jsonval) {


                    teaserCriteriaId[jsonkey] = jsonval.CriteriaDetailId;


                });


                var common = $.grep(CommonCriteriaIds, function (element) {
                    return $.inArray(element, teaserCriteriaId) !== -1;
                });

                CommonCriteriaIds = common;


            } else {

                CommonCriteriaIds = Array();
                return;
            }


        });


    }

    console.log(CommonCriteriaIds);
    debugger;
    return CommonCriteriaIds;
}

function GetUniqueCriteriaValueCount(CommonCriteriaID) {

    var uniqueValue;
    var commonCount = 1;
    var criteriaNewTypeID = Array();

    $.each($('.CriteriasList'), function (keylist, valuelist) {


        var jsonObjectValueList = $.parseJSON($(valuelist).val());

        $.each(jsonObjectValueList, function (childKey, childValue) {


            if (childValue.CriteriaDetailId == CommonCriteriaID) {

                if (keylist == 0) {

                    uniqueValue = childValue.CriteriaTypeId;


                } else {

                    var newArray = childValue.CriteriaTypeId;
                    var uniqueLength = uniqueValue.length;

                    var newUniqueValue = Array();

                    for (j = 0; j < uniqueLength; j++) {

                        if ($.inArray(uniqueValue[j], newArray) > -1) {

                            var index1 = uniqueValue.indexOf(uniqueValue[j]);
                            if (index1 != -1) {
                                //uniqueValue.splice(index1, 1);
                            } else {
                                newUniqueValue.push(uniqueValue[j]);
                            }
                            var index2 = newArray.indexOf(uniqueValue[j]);
                            if (index2 != -1) {
                                newArray.splice(index2, 1);
                            } else {


                            }

                            //criteriaNewTypeID.push(childValue.CriteriaTypeId[j]);
                        } else {


                            newUniqueValue.push(uniqueValue[j]);


                        }
                    }


                    if (newUniqueValue.length == 0 || newArray.length == 0) {

                        commonCount = 0;

                        return;

                    } else {

                        if (newUniqueValue.length != 0) {
                            $.merge(uniqueValue, newUniqueValue);
                        }
                        if (newArray.length != 0) {
                            $.merge(uniqueValue, newArray);
                        }


                    }
                }

            }
        });


        var jsonCriteria = $.parseJSON(($(this).val()));


    });
    debugger;
    return commonCount;
}

function IsOverlappedCriteria(criteriaID, $addObj) {

    $('.CriteriasList:first-child').closest('.teaser-list-section ').find(".multi-select-parent-ul")
    var $return = false;
    var $selectedObjCriteriaValue = selectedObj.next('span').html();

    var selectedMinValue = null;
    var selectedMaxValue = 999999999;

    if ($selectedObjCriteriaValue.indexOf("+") >= 0) {

        selectedMinValue = parseFloat($selectedObjCriteriaValue.replace('+', ''));

    } else if ($selectedObjCriteriaValue.indexOf("-") >= 0) {

        selectedMinValue = parseFloat($selectedObjCriteriaValue.split('-')[0]);

        selectedMaxValue = parseFloat($selectedObjCriteriaValue.split('-')[1]);

    } else {

        selectedMinValue = parseFloat($selectedObjCriteriaValue);

        selectedMaxValue = parseFloat($selectedObjCriteriaValue);
    }

    if ($.type(objectOrArray) == "array") {

        for (i = 0; i < objectOrArray.length; i++) {

            var $list = selectedObj.closest('ul').find('input[type="checkbox"][value="' + objectOrArray[i] + '"]');

            var checkedCriteriaValue = $list.next('span').html();

            var checkedMinValue = null;

            var checkedMaxValue = 999999999;

            if (checkedCriteriaValue.indexOf("+") >= 0) {

                checkedMinValue = parseFloat(checkedCriteriaValue.replace('+', ''));

            } else if (checkedCriteriaValue.indexOf("-") >= 0) {

                checkedMinValue = parseFloat(checkedCriteriaValue.split('-')[0]);

                checkedMaxValue = parseFloat(checkedCriteriaValue.split('-')[1]);

            } else {

                checkedMinValue = parseFloat(checkedCriteriaValue);

                checkedMaxValue = parseFloat(checkedCriteriaValue);
            }


            if ((checkedMinValue > selectedMinValue) && (checkedMinValue >= selectedMaxValue) || (selectedMinValue > checkedMinValue) && (selectedMinValue >= checkedMaxValue)) {

            } else {

                $return = true;
                return true;

            }
        }


    }
    return $return;


}
function ValidatePreviousTeaser($addObj, fromAddTeaser) {

    var message = null;
    var addTeaser = false;

    if ($('.CriteriasList').length > 1) {

        var CommonCriteria = GetCommonCriteria($addObj);


        if (CommonCriteria.length != 0) {


            var rangeFilter = [1, 5];


            for (r = 0; r < rangeFilter.length; r++) {

                if ($.inArray(CommonCriteria, rangeFilter[r]) > -1) {

                    //var rangeOverlapped = IsOverlappedCriteria(rangeFilter[r], $addObj);

                }
            }

            for (i = 0; i < CommonCriteria.length; i++) {

                var uniqueCount = GetUniqueCriteriaValueCount(CommonCriteria[i]);

                console.log(uniqueCount);

                if (uniqueCount == 1) {

                    addTeaser = true;
                    break;

                }

            }

            if (!addTeaser) {

                message = "Please choose different filter for one of the previously chosen criterias.";
            }
        } else {

            message = "Please choose different filter for one of the previously chosen criterias.";
        }


    }

    if ($('.CriteriasList:eq(0)').val() == "" || $('.CriteriasList:eq(' + ($('.CriteriasList').length - 1) + ')').val() == "") {

        message = "Empty Criteria - No criteria chosen! Adding new teaser is prohibited.";

    }


    if ($('.CriteriasList').length == 1 && fromAddTeaser == false) {

        message = null;

    }

    if (message != null) {
        if (fromAddTeaser == false) {
            message = "Please choose required criteria for last teaser.";

        }
        var $msg = '<div id="MessageBox">' +
            '<div class="alert alert-danger alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">×</span></button>' + message + '</div></div>';


        $('#DashboardSaveCampaignForm').find('#MessageBox').remove();


        $('#DashboardSaveCampaignForm').prepend($msg);


        $('.CriteriasList:eq(' + (($('.CriteriasList').length) - 1) + ')').closest('.individualTeaserListContainer').find('.multi-select-container').find('button').css('border', '1px solid red');
        //$('.CriteriasList:eq(' + (($('.CriteriasList').length) - 1) + ')').closest('.individualTeaserListContainer').find('.multi-select-container').find('button').html('Send to All / No Criteria Selected');

        setTimeout(function () {

            $('#DashboardSaveCampaignForm').find('#MessageBox').fadeOut();
            $('.CriteriasList:eq(' + (($('.CriteriasList').length) - 1) + ')').closest('.individualTeaserListContainer').find('.multi-select-container').find('button').removeAttr('style');

        }, 2000);
    }

    return message == null ? true : false;
}

function ValidatePreviousTeaser12($addObj) {


    var message = null;

    var uniqueCriteriaIDs = Array();
    var CommonCriteriaIds = Array();

    var jsonCriteriaFirstTeaser = $.parseJSON($('.CriteriasList:eq(0)').val());


    if (jsonCriteriaFirstTeaser != null) {
        $.each(jsonCriteriaFirstTeaser, function (firstkey, firstvalue) {

            CommonCriteriaIds.push(firstvalue.CriteriaDetailId);

        });
    }

    if ($('.CriteriasList:eq(0)').val() != "") {

        $.each($('.CriteriasList'), function (keylist, valuelist) {

            var jsonCriteria = $.parseJSON(($(this).val()));


            if ($(this).val() != "") {


                var teaserCriteriaId = Array();

                var jsonCriteriaDetailId = Array();
                $.each(jsonCriteria, function (jsonkey, jsonval) {


                    teaserCriteriaId[jsonkey] = jsonval.CriteriaDetailId;


                });


                var common = $.grep(CommonCriteriaIds, function (element) {
                    return $.inArray(element, teaserCriteriaId) !== -1;
                });

                CommonCriteriaIds = common;


            } else {

                CommonCriteriaIds = Array();
                return;
            }


        });


        if (CommonCriteriaIds.length == 0) {

            message = "Please choose different filter for one of the previously chosen criterias.";
        } else {

            if ($('.CriteriasList').length > 1) {

                for (i = 0; i < CommonCriteriaIds.length; i++) {

                    var error = false;

                    $.each($('.CriteriasList'), function (arrayKey, arrayValue) {

                        if (arrayKey != 0) {
                            var CriteriaValue = $(this).val();

                            if (CriteriaValue == "" || CriteriaValue == null) {

                                error = true;

                                return;
                            }
                            var criteriaJson = $.parseJSON(CriteriaValue);


                            $.each(criteriaJson, function (josnkey, criterialDetailJson) {

                                if (criterialDetailJson.CriteriaDetailId == CommonCriteriaIds[i]) {

                                    debugger;
                                }


                            });

                        }
                    });


                    if (error) {
                        message = "Please choose different filter for one of the previously chosen criterias.";
                        break;
                    }
                }


            }


        }
    } else {
        message = "Empty Criteria";

    }
    if (message != null) {

        var $msg = '<div id="MessageBox">' +
            '<div class="alert alert-danger alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">×</span></button>' + message + '</div></div>';


        $('#DashboardSaveCampaignForm').find('#MessageBox').remove();
        $('#DashboardSaveCampaignForm').prepend($msg);

        $('.CriteriasList:eq(' + (($('.CriteriasList').length) - 1) + ')').closest('.individualTeaserListContainer').find('.multi-select-container').find('button').css('border', '1px solid red');
        //$('.CriteriasList:eq(' + (($('.CriteriasList').length) - 1) + ')').closest('.individualTeaserListContainer').find('.multi-select-container').find('button').html('Send to All / No Criteria Selected');

        setTimeout(function () {

            $('#DashboardSaveCampaignForm').find('#MessageBox').fadeOut();
            $('.CriteriasList:eq(' + (($('.CriteriasList').length) - 1) + ')').closest('.individualTeaserListContainer').find('.multi-select-container').find('button').removeAttr('style');

        }, 2000);
    }

    return message == null ? true : false;

}

