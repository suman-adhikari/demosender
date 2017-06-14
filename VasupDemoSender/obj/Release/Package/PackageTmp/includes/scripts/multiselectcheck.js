
(function ($) {

    var self = {

        initialize: function ($targetSelect) {

            this.buildSelectBox($targetSelect);

            this.assignTriggers($targetSelect);

        },

        buildSelectBox: function ($targetSelect) {

            var $newSelectBox = $('<div class="select-box-custom"></div>');

            var $ul = $("<ul/>");

            $targetSelect.find("option").each(function (index, option) {

                var $li = $("<li/>");

                var $input = $("<input type='checkbox' name='value[]' class='select-box-option'/>");

                $input.val($(option).val()).prop("checked", $(option).is(":selected")).appendTo($li);

                $li.append();

                $li.append("<span>" + $(option).text() + "</span>");

                $ul.append($li);

            });

            $newSelectBox.append($ul);

            $targetSelect.after($newSelectBox);

        },

        assignTriggers: function($targetSelect){

            $targetSelect.next().find("ul li input.select-box-option").on("change",function(){self._triggerChangeInTarget($targetSelect, this)});

        },
        _triggerChangeInTarget:function($targetSelect, checkbox){

            if($(checkbox).is(":checked")){

                $targetSelect.find("option[value="+$(checkbox).val()+"]").prop("selected", "selected");

            }else{

                $targetSelect.find("option[value="+$(checkbox).val()+"]").prop("selected", "");

            }

        }

    };

    $.fn.multiselect_sandeep = function (options) {

        var $targetSelect = $(this);

        self.initialize($targetSelect);

    }

})(jQuery)