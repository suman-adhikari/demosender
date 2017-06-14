(function ($) {
    $.fn.multiSelect = function (options) {

        return this.each(function () {

            var $select = $(this);
            var container;
            var multiSelectSection;
            var buttonContainer;
            var selectedValues;

            // var SelectionText = Language.translate("Select");

            var SelectionText = ("Select");


            var SelectAllText = ("Select All");
            var SelectAllText = Language.translate("Select All");

            if (options.SelectionText != null) {
                SelectionText = options.SelectionText;
            }

            $select.css('display', 'none');

            var data = options.data;

            var self = {
                initialize: function () {

                    $select.prop('multiple', true);

                    container = $("<div class='multi-select-container'/>");

                    container.delegate('.multi-select-parent-li .multi-select-checkbox', 'click', self.selectChild)
                        .delegate('.multi-select-child-li .multi-select-checkbox', 'click', self.selectParent)
                        .delegate('.multi-select-parent-li .multi-select-checkbox', 'click', self.selectGrandParent)
                        .delegate('.multi-select-child-li .multi-select-checkbox', 'click', self.selectGrandParent)
                        .delegate('.button-container', 'click', self.setCSS)
                        .delegate('.button-container', 'click', self.showHide);

                    self.buildList();

                    $select.on("refreshLists", function (event, jsonDataList) {

                        data = options.data = $.parseJSON(jsonDataList);
                        self.unCheckValue();
                        self.buildList();
                    });

                    $select.on("unCheckList", function (event) {
                        self.unCheckValue();
                    });

                    $select.on("CheckAllData", function (event) {
                        self.CheckAll();
                    });

                    $select.on("CheckSelectedData", function (event, jsonDataList) {
                        self.CheckSelected(jsonDataList);
                    });
                },
                buildList: function () {
                    container.html("");

                    buttonContainer = $('<div class="button-container"/>');

                    var button = $("<button type='button' class='form-control' style='text-align: left'>" + SelectionText + "</button>");

                    var spanSelectedText = $('<span class="selected-text"/>');

                    var spanArrow = $('<span class="button-arrow"/>');

                    spanArrow.html("&#x25BC;");

                    buttonContainer.append(button);

                    buttonContainer.append(spanArrow);

                    buttonContainer.append(spanSelectedText);

                    multiSelectSection = $("<div class='multi-select-section'/>");

                    container.append(buttonContainer);

                    var parentUl = $("<ul class='multi-select-parent-ul'/>");

                    var SelectAllLi = $("<li class='multi-select-parent-li'/>");

                    SelectAllLi.append($("<input type='checkbox' class='multi-select-checkbox grand-parent'/>"));

                    var SelectAllLiSpanValue = $('<span/>');

                    SelectAllLiSpanValue.text(SelectAllText);

                    SelectAllLi.append(SelectAllLiSpanValue);

                    var TopChildUl = $('<ul class="multi-select-child-ul"/>');

                    var objectKeys = Object.keys(data);

                    if (options.Level !== undefined && options.Level == 1) {

                        $.each(data, function (index, object) {

                            var parentLi = $("<li class='multi-select-child-li'/>");

                            parentLi.attr("ID", object.ID);

                            parentLi.append($("<input type='checkbox' class='multi-select-checkbox parent'/>"));

                            var parentSpanValue = $('<span/>');

                            parentSpanValue.text(object[options.Type]);

                            parentLi.append(parentSpanValue);

                            TopChildUl.append(parentLi);

                            SelectAllLi.append(TopChildUl);
                        });
                    } else {

                        for (var i = 0; i < objectKeys.length; i++) {

                            var parentLi = $("<li class='multi-select-parent-li'/>");

                            parentLi.append($("<input type='checkbox' class='multi-select-checkbox parent'/>"));

                            var parentSpanValue = $('<span/>');

                            parentSpanValue.text(Language.translate(objectKeys[i]));

                            parentLi.append(parentSpanValue);

                            var childUl = $('<ul class="multi-select-child-ul"/>');

                            for (var j = 0; j < data[objectKeys[i]].length; j++) {

                                var childLi = $('<li class="multi-select-child-li"/>');

                                childLi.append($("<input type='checkbox' class='multi-select-checkbox child'/>"));

                                childLi.attr("ID", data[objectKeys[i]][j].ID);

                                var childSpanValue = $('<span/>');

                                childSpanValue.text(data[objectKeys[i]][j][options.Type]);

                                if (!( typeof data[objectKeys[i]][j].CriteriaDetailID === "undefined" ))
                                    parentLi.attr("id", data[objectKeys[i]][j].CriteriaDetailID);

                                if (options.appendStyle != null) {
                                    childSpanValue.css("color", data[objectKeys[i]][j][options.appendStyle.colorType]);
                                }

                                childLi.append(childSpanValue);

                                childUl.append(childLi);
                            }

                            parentLi.append(childUl);

                            TopChildUl.append(parentLi);

                            SelectAllLi.append(TopChildUl);
                        }
                    }

                    parentUl.append(SelectAllLi);

                    multiSelectSection.append(parentUl);

                    container.append(multiSelectSection);

                    container.insertAfter($select);
                },
                selectChild: function () {

                    if ($(this).is(':checked')) {
                        $(this).closest('li').find('input[type="checkbox"]').prop('checked', true).trigger("change");
                    } else {
                        $(this).closest('li').find('input[type="checkbox"]').prop('checked', false).trigger("change");
                    }

                    self.setValue();
                    self.SetUnsetButtonValue();
                },
                selectParent: function () {

                    var allChecked = true;

                    $(this).closest('ul').find('input[type="checkbox"]').each(function () {
                        if (!$(this).is(':checked'))
                            allChecked = false;
                    });

                    if (allChecked) {
                        $(this).closest('.multi-select-parent-li').children('.multi-select-checkbox').prop('checked', true);
                    } else {
                        $(this).closest('.multi-select-parent-li').children('.multi-select-checkbox').prop('checked', false);
                    }

                    self.setValue();
                },
                selectGrandParent: function () {

                    var CheckedAll = true;

                    $(this).closest('.multi-select-parent-li').siblings().andSelf().children('.multi-select-checkbox').each(function () {
                        if (!$(this).is(':checked'))
                            CheckedAll = false;
                    });
                    if (CheckedAll) {
                        $(this).parents("div.multi-select-section").find("input[type='checkbox'][class='multi-select-checkbox grand-parent']").prop('checked', true);
                    } else {
                        $(this).parents("div.multi-select-section").find("input[type='checkbox'][class='multi-select-checkbox grand-parent']").prop('checked', false);
                    }
                },
                showHide: function () {
                    $(this).next('.multi-select-section').toggle();
                },
                setValue: function () {


                    var selectedValue = [];

                    var selectedText = [];
                    if (options.Level !== undefined && options.Level == 1) {

                        $($select).siblings(".multi-select-container").find("ul.multi-select-child-ul").find(".multi-select-checkbox:checked").each(function () {
                            selectedValue.push(parseInt($(this).closest('li').attr('id')));
                            selectedText.push($(this).closest('li').find('span').text());
                        });
                    } else {
                        $($select).siblings(".multi-select-container").find(".multi-select-checkbox.child:checked").each(function () {
                            selectedValue.push(parseInt($(this).closest('li').attr('id')));
                            selectedText.push($(this).closest('li').find('span').text());
                        });
                    }


                    $select.val(selectedValue).trigger("change");

                    if (selectedText.length == 0) {
                        container.find('.selected-text').text(selectedText.join(', '))
                    }
                },
                getValue: function () {
                    var selectedValue = [];
                    if (options.Level !== undefined && options.Level == 1) {

                        $($select).siblings(".multi-select-container").find("ul.multi-select-child-ul").find(".multi-select-checkbox:checked").each(function () {
                            selectedValue.push(parseInt($(this).closest('li').attr('id')));
                        });
                    } else {
                        $($select).siblings(".multi-select-container").find(".multi-select-checkbox.child:checked").each(function () {
                            selectedValue.push(parseInt($(this).closest('li').attr('id')));
                        });
                    }
                    return selectedValue;
                },
                unCheckValue: function () {
                    if ($(container).find("input[type='checkbox']:checked").length > 0) {
                        $(container).find("input[type='checkbox']:checked").attr("checked", false);
                        $(container).find("button[class='form-control']").text(SelectionText);
                        $(container).find(".selected-text").text("");
                    }
                    $select.val("");
                },
                CheckAll: function () {
                    if (options.Level !== undefined && options.Level == 1) {
                        $($select).siblings(".multi-select-container").find(".multi-select-checkbox").attr("checked", "true").trigger("change");
                        $($select).siblings(".multi-select-container").find("ul.multi-select-child-ul").find(".multi-select-checkbox").attr("checked", "true");
                    } else {
                        $($select).siblings(".multi-select-container").find(".multi-select-checkbox.child").attr("checked", "true");
                    }
                    $(container).find("button[class='form-control']").text("");
                    self.setValue();
                },
                CheckSelected: function (jsonDataList) {

                    var dataList = $.parseJSON(jsonDataList);
                    if (!$.isArray(dataList)) return;

                    if (options.Level !== undefined && options.Level == 1) {
                        $($select).siblings(".multi-select-container").find("ul.multi-select-child-ul").find(".multi-select-checkbox").each(function () {
                            //var id = parseInt($(this).closest('li').attr('id'));

                            var checkBoxElement = $(this);
                            var key = $(this).closest('li').attr('id');
                            var id = isNaN(key) ? key.trim() : parseInt(key);

                            $(dataList).each(function (dataIndex, dataValue) {
                                if (dataValue == id) {
                                    checkBoxElement.attr("checked", "true");
                                }
                            });

                            /*if ($.inArray(id, dataList) != -1) {
                             $(this).attr("checked", "true");
                             }*/
                        });
                    } else {
                        $($select).siblings(".multi-select-container").find(".multi-select-checkbox.child").each(function () {

                            var key = $(this).closest('li').attr('id');
                            var id = isNaN(key) ? key.trim() : parseInt(key);
                            var checkBoxElement = $(this);

                            $(dataList).each(function (dataIndex, dataValue) {
                                if (dataValue == id) {
                                    checkBoxElement.attr("checked", "true");
                                }
                            });

                            /*if ($.inArray(id, dataList) != -1) {
                             $(this).attr("checked", "true");
                             }*/
                        });
                    }
                    $(container).find("button[class='form-control']").text("");
                    self.setValue();
                },
                SetUnsetButtonValue: function () {
                    if ($(container).find("input[type='checkbox']:checked").length == 0) {
                        $(container).find("button[class='form-control']").text(SelectionText);
                    } else
                        $(container).find("button[class='form-control']").text("");

                },
                onSelectionClose: function () {
                    if (options.onSelectionChange != null && ($($(container)).find(".multi-select-section").css('display') != 'none')) {

                        multiSelectSection.hide();
                        self.SetUnsetButtonValue();
                        options.onSelectionChange(this);

                    } else {
                        multiSelectSection.hide();
                        self.SetUnsetButtonValue();
                    }
                },
                setCSS: function () {
                    var bottom = $(window).height() - $(container).offset().top;

                    container.css({
                        'width': $select.width()
                    });

                    if (container.children(".multi-select-section").height() > bottom)
                        $(container).children(".multi-select-section").css({
                            //'height': bottom - 10,

                        });
                }
            };


            self.initialize();

            $(document).mousedown(function (event) {
                if (($(event.target).closest('.multi-select-section').length == 0) && $(event.target)[0] != buttonContainer.find('button')[0]) {
                    if (container != null) {
                        /*multiSelectSection.hide();
                         self.SetUnsetButtonValue();*/
                        self.onSelectionClose();
                    }
                }
            });
        });

    };
})(jQuery);