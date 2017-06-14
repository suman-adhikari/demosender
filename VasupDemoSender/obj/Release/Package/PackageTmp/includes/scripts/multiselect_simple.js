(function ($) {

    $.fn.multiselect_simple = function (options) {

        return this.each(function () {

            var $myEl = $(this);

            var self = {

                _initialize: function () {
                    self.options = options;
                    var $selectEl = $myEl;

                    var isMultipleSelectElement = $myEl.is("select[multiple]");
                    if (!isMultipleSelectElement) {
                        throw("This plugin requires the target element to be multiple select");
                        return;
                    }

                    $selectEl.addClass(self.config.oldHideClassName);
                    var valueArray = $selectEl.find('option').map(self._getValueFromOption);
                    var $newSelect = self._buildUlLi(valueArray);
                    var $parentDiv = $("<div id='" + self.options.base_div + "'><div data-toggle='tooltip'  data-placement='top' class='childSelector' data-trigger='manual' title='' " +
                    "data-original-title='" + self.options.tooltipTitle + "'></div></div>").addClass(self.config.parentDivClass);
                    var $searchField = $("<input type='text' width='auto' class='search-text-field' data-action='showDropdown' style='width:10px'>");
                    var $selectedItems = $("<ul class='" + self.config.selectedItemsClass + "'/>");
                    var $searchDiv = $("<div class='" + self.config.searchDivClass + "' data-trigger='focusInput'/>").append($selectedItems, $searchField);
                    var $utilButtonApply = $("<button type='button' class='btn btn-success' data-action='applySelection'>" + self.options.apply + "</button>");
                    var $utilButtonClear = $("<button type='button' class='btn hide' data-action='cancelSelection' >Clear</button>");
                    var $utilButtonCancel = $("<button type='button' class='btn btn-default' data-action='hideDropdown' >" + self.options.cancel + "</button>");
                    var $clearDiv = $("<div style='clear:both'/>");
                    var $utilDiv = $("<div class='utilDiv'/>").append($utilButtonApply, $utilButtonClear, $utilButtonCancel, $clearDiv);
                    var $dropdown = $("<div class='multi-select-dropdown'></div>");
                    //var $button = $("<button data-action='toggleDropdown'>▼</button>");
                    //$searchDiv.append($button);
                    $dropdown.append($newSelect, $utilDiv);
                    $parentDiv.append($searchDiv, $dropdown);

                    $selectEl.after($parentDiv);

                    var $baseDiv = $('#' + self.options.base_div);

                    self._bindTriggeredActions($baseDiv);

                    self._registerAllTriggers($baseDiv);

                    self._bindClickActions($baseDiv);

                    self.methods.showPlaceholder();

                    if (!!self.options.onLoadSetValue) {
                        var $setElement = $baseDiv.find(".multi-select-ul li[data-value='" + self.options.onLoadSetValue + "']");
                        self.methods.selectElement($setElement);
                        self.methods.hideDropdown();
                        self.methods.unfocusInput();
                    }


                },
                _registerAllTriggers: function ($baseDiv) {
                    $("body").on("click", function (e) {

                        if ($(e.target).closest("#" + self.options.base_div).length > 0) {


                            $("#" + self.options.base_div + " [data-toggle='tooltip']").tooltip('show');
                            return;
                        }

                        $("#" + self.options.base_div + " [data-toggle='tooltip']").tooltip('hide');
                        self.methods.hideDropdown();
                        if (self.methods.countSelected() < 1) {
                            self.methods.showPlaceholder();
                        }
                    });
                    $baseDiv.on("focusInput", self.triggerHandlers.focusInput);
                    $("#" + self.options.base_div).find(".search-text-field").on("keydown", self.triggerHandlers.handleKeydown)
                    $("#" + self.options.base_div).find(".search-text-field").on("keyup", self.triggerHandlers.handleKeyup)
                },
                _bindTriggeredActions: function ($baseDiv) {

                    $("#" + $baseDiv.attr('id')).on("click", "[data-trigger]", function (e) {

                        var $target = $(e.target);
                        if ($target.data().hasOwnProperty("trigger")) {
                            $(this).trigger($(this).data("trigger"));
                        }
                    });
                    $("#" + self.options.base_div).find("input.search-text-field").on("focus", function () {
                        self.methods.hidePlaceholder();
                    });
                    $("#" + self.options.base_div).find("input.search-text-field").on("focusout", function () {
                        $(this).val("");
                        $("#" + self.options.base_div).find(".search-div").removeClass("focus");
                    });

                },
                _bindClickActions: function ($baseDiv) {
                    $baseDiv.on("click", "[data-action]", function (e) {
                        debugger;
                        var $target = $(e.target);
                        if ($target.data().hasOwnProperty("action")) {
                            if (typeof(self.methods[$target.data("action")]) != typeof (undefined)) {
                                // console.log("finding method "+$target.data("action"));
                                self.methods[$target.data("action")]($target);
                            }
                            else {
                                throw("No such '" + $target.data("action") + "' method defined in self.method! Define one to have action");
                            }
                        } else {

                        }
                    });
                },
                _getValueFromOption: function () {
                    $option = $(arguments[1]);
                    var rObj = {};
                    rObj[$option.val()] = $option.html();
                    return rObj;
                },
                _buildUlLi: function (valueArray) {
                    $ul = $("<ul/>").addClass(self.config.selectableUlClass);
                    for (i = 0; i < valueArray.length; i++) {
                        $li = $("<li/>").addClass(self.config.selectableLiClass);
                        $.each(valueArray[i], function (key, value) {
                            $li.attr("data-value", key);
                            $li.attr("data-action", "selectElement")
                            $li.append(value);
                        });
                        $ul.append($li);
                    }
                    return $ul;
                }
            };

            self.triggerHandlers = {
                focusInput: function () {
                    self.methods.focusInput();
                },
                handleKeydown: function (event) {
                    console.log(event.keyCode);

                    setWidth = $("#" + self.options.base_div).find("input.search-text-field").width();

                    if (event.keyCode == 8) {

                        setWidth = $("#" + self.options.base_div).find("input.search-text-field").width() - 7;
                        $("#" + self.options.base_div).find("input.search-text-field").val().length < 1 && self.methods.editLastSelection() && event.preventDefault();
                    }

                    if ($.inArray(event.keyCode, [32, 188, 13]) != -1) {
                        event.preventDefault();
                        var ok = self.methods.selectFirstFoundElement();
                        setWidth = ok == true ? 10 : setWidth;

                    }

                    if (event.keyCode >= 48 && event.keyCode <= 57)
                        setWidth = $("#" + self.options.base_div).find("input.search-text-field").width() + 7;

                    if (event.keyCode >= 65 && event.keyCode <= 90)
                        setWidth = $("#" + self.options.base_div).find("input.search-text-field").width() + 7;

                    if (event.keyCode >= 96 && event.keyCode <= 105)
                        setWidth = $("#" + self.options.base_div).find("input.search-text-field").width() + 7;

                    if (setWidth < 10 && $("#" + self.options.base_div).find("input.search-text-field").val().length < 1)
                        setWidth = 10;

                    $("#" + self.options.base_div).find("input.search-text-field").width(setWidth);

                },
                handleKeyup: function (e) {
                    self.methods.doSearch()
                }

            }

            self.methods = {
                isShownPlaceholder: function () {
                    return $('#' + self.options.base_div).find("ul.selected-items").hasClass("placeholder");
                },
                hidePlaceholder: function () {
                    if (self.methods.countSelected() == 0 && self.methods.isShownPlaceholder()) {
                        $('#' + self.options.base_div).find("ul.selected-items").html("");
                        $('#' + self.options.base_div).find("ul.selected-items").css("width", "auto");
                        $('#' + self.options.base_div).find("ul.selected-items").removeClass("placeholder").closest("[data-trigger='focusInput']").removeData();
                        $('#' + self.options.base_div).find("ul.selected-items").closest("search-div").data("trigger", "focusInput").attr("data-trigger", "focusInput");
                    }
                },
                showPlaceholder: function () {
                    $("#" + self.options.base_div).find("input.search-text-field").val("");
                    $('#' + self.options.base_div).find("ul.selected-items").closest("[data-trigger='focusInput']").data("trigger", "").removeData();
                    $('#' + self.options.base_div).find("ul.selected-items").data("trigger", "focusInput").attr("data-trigger", "focusInput").addClass("placeholder").html(self.options.placeholderText);
                },
                applySelection: function () {
                    self.methods.clearInput();
                    self.methods.hideDropdown();
                    $("body").trigger("idSelectApply");
                },
                cancelSelection: function (e) {
                    $('#' + self.options.base_div).find("ul.selected-items").html("");
                    $myEl.find("option").prop("selected", "");
                    $("#" + self.options.base_div).find(".multi-select-ul li[data-action='unselectElement']").removeClass("active").data("action", "selectElement").attr("data-action", "selectElement");
                    self.methods.clearInput();
                    self.methods.hideDropdown();
                    $("body").trigger("idSelectApply");
                },
                editLastSelection: function () {
                    $lastItem = $("ul.selected-items li.selection-tokens:last");
                    if (!$lastItem.length)
                        return;
                    $element = $("#" + self.options.base_div).find(".multi-select-ul li[data-action='unselectElement'][data-value='" + $lastItem.data("value") + "']");
                    self.methods.unselectElement($element);
                    self.methods.putItemToInput($lastItem);
                    self.methods.focusInput();
                    self.methods.doSearch();
                },
                putItemToInput: function ($item) {
                    text = $item.find("span:last").html() + " ";
                    setWidth = 10 + text.length * 7;
                    $("#" + self.options.base_div).find("input.search-text-field").val(text).width(setWidth);

                },
                selectFirstFoundElement: function () {
                    $firstElement = $("#" + self.options.base_div).find(".multi-select-ul li[data-action='selectElement']:visible:first");
                    if ($firstElement.length > 0) {
                        self.methods.selectElement($firstElement);
                        return true;
                    } else {
                        return false;
                    }

                },
                doSearch: function () {
                    var searchText = $.trim($("#" + self.options.base_div).find("input.search-text-field").val());
                    self.methods.refreshList();
                    if (searchText.length > 0) {
                        $("#" + self.options.base_div).find(".multi-select-ul li[data-action='unselectElement']").hide();
                        $("#" + self.options.base_div).find(".multi-select-ul li[data-action='selectElement']").not(":contains(" + searchText + ")").hide();
                        $("#" + self.options.base_div).find(".multi-select-ul li[data-action='selectElement']:contains(" + searchText + ")").show();
                    }
                    if ($("#" + self.options.base_div).find(".multi-select-ul li[data-action]:visible").length < 1)
                        self.methods.showNoRecordsFound();

                },
                showNoRecordsFound: function () {
                    $("#" + self.options.base_div).find(".multi-select-ul").append("<li class='norecords'> No records found </li>");
                },
                toggleDropdown: function () {
                    if ($("#" + self.options.base_div).find(".multi-select-ul").is(":visible")) {
                        self.methods.hideDropdown();
                        return;
                    }
                    self.methods.showDropdown();
                },
                showDropdown: function () {
                    console.log(self.options.base_div);
                    $("#" + self.options.base_div).find(".multi-select-dropdown").show();
                },
                hideDropdown: function () {
                    $("#" + self.options.base_div).find(".multi-select-dropdown").hide();
                },
                focusInput: function () {
                    $("#" + self.options.base_div).find(".search-div").addClass("focus");
                    if (self.methods.countSelected() == 0 && self.methods.isShownPlaceholder())
                        self.methods.hidePlaceholder();
                    $("#" + self.options.base_div).find(".search-text-field").trigger("focus").trigger("click");

                },
                unfocusInput: function () {
                    $("#" + self.options.base_div).find(".search-text-field").focusout();
                    $("#" + self.options.base_div).find(".search-text-field").val("");
                },
                removeSelection: function ($element) {
                    $element = $element.parent();
                    $listElement = $("#" + self.options.base_div).find(".multi-select-ul li[data-value='" + $element.data("value") + "']");
                    self.methods.unselectElement($listElement);
                    self.methods.removeFromSelectedItemsList($element.data("value"));
                },

                unselectElement: function ($element) {
                    $element.attr("data-action", "selectElement").removeClass("active").data("action", "selectElement");
                    self.methods.clearInput();
                    self.methods.focusInput();
                    self.methods.removeFromSelectedItemsList($element.data("value"), $element.html());
                    $myEl.find("option[value='" + $element.data("value") + "']").prop("selected", "");
                },

                selectElement: function ($element) {
                    debugger;
                    if ($element.hasClass("active") && $("#" + self.options.base_div).find(".selected-items li[data-value='" + $element.data("value") + "']").length > 0) {
                        self.methods.unselectElement($element);
                    }
                    else {
                        self.methods.clearInput();
                        self.methods.focusInput();
                        self.methods.refreshList();
                        var count = self.methods.countSelected();

                        if (count < self.options.maxPermittedTokens) {
                            $element.attr("data-action", "unselectElement").addClass("active").data("action", "unselectElement");
                            self.methods.showInSelectedItemsList($element.data("value"), $element.attr('data-value'));
                            $myEl.find("option[value='" + $element.data("value") + "']").prop("selected", "selected");
                        } else {
                            alert("You can only select 4 items");
                        }
                    }
                },
                countSelected: function () {
                    return $("#" + self.options.base_div).find(".selected-items li").length;
                },
                refreshList: function () {
                    $("#" + self.options.base_div).find(".multi-select-ul li.norecords").remove();
                    $("#" + self.options.base_div).find(".multi-select-ul li[data-action]").show();
                },
                clearInput: function () {
                    $("#" + self.options.base_div).find("input.search-text-field").val("");
                },
                showInSelectedItemsList: function (value, text) {
                    $li = $("<li class='selection-tokens' data-value='" + value + "'><span class='remove-selection' data-action='removeSelection'>×</span><span data-action='showDropdown'> " + text + "</span></li>");
                    $("#" + self.options.base_div).find(".selected-items").append($li);
                },

                removeFromSelectedItemsList: function (value) {
                    $("#" + self.options.base_div).find(".selected-items li[data-value='" + value + "']").remove();
                }

            };
            self.config = {
                oldHideClassName: "hide-this-element",
                parentDivClass: "multi-select-simple",
                selectedItemsClass: "selected-items",
                selectableUlClass: "multi-select-ul",
                selectableLiClass: "selectable-li",
                searchDivClass: "search-div",
                searchTextFieldClass: "search-text-field"
            };

            /*    $.extend($.fn.multiselect_simple = function (options) {

             return this.each(function () {

             $myEl = $(this);
             self.options = self._extendDefaults(options);
             var isMultipleSelectElement = $myEl.is("select[multiple]");
             if (!isMultipleSelectElement) {
             throw("This plugin requires the target element to be multiple select");
             return;
             }
             self._initialize($myEl);
             });
             });*/
            /*  $.extend($.fn, {
             multiselect_simple: function (options) {

             $myEl = $(this);
             self.options = self._extendDefaults(options);
             var isMultipleSelectElement = $myEl.is("select[multiple]");
             if (!isMultipleSelectElement) {
             throw("This plugin requires the target element to be multiple select");
             return;
             }
             self._initialize($myEl);
             }

             });*/

            self._initialize();
        });
    }
}(jQuery))