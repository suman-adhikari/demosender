(function ($) {
    $.fn.multiDatePickerWithTimeSlider = function () {

        return this.each(function () {
            var $input = $(this);
            var $container = null;

            var selectedDateList = [];

            var initTimerStartValue = 480;
            var initTimerEndValue = 1260;

            var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
            var weeekDays = new Array('Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa');
            var daySelector = 'td:not(:empty)';

            var displayState = false;

            var self = {
                initialize: function () {

                    $container = self.initializeContainer()
                        .append(self.buildCalender(new Date()))
                        .delegate(daySelector, 'click', self.clicked)
                        .delegate('.prev', 'click', self.loadPrevious)
                        .delegate('.next', 'click', self.loadNext)
                        .delegate('.monthSelect', 'change', self.pickDate)
                        .delegate('.yearSelect', 'change', self.pickDate)
                        .delegate('.prev', 'mouseenter mouseleave', self.addPrevHoverClass)
                        .delegate('.next', 'mouseenter mouseleave', self.addNextHoverClass)
                        .delegate('.ui-button-ok', 'click', self.buttonClick);

                    $input.html($container);
                },

                saveSelectedValues: function (newActiveCell) {
                    var selYear = newActiveCell.closest('.multiDatePickerWithTimeSlider').find('.yearSelect').val();
                    var selMonth = newActiveCell.closest('.multiDatePickerWithTimeSlider').find('.monthSelect').val();
                    var selDay = newActiveCell.text();

                    selMonth = (selMonth > 9) ? selMonth : "0" + selMonth;
                    selDay = (selDay > 9) ? selDay : "0" + selDay;

                    var selDate = selYear + "-" + selMonth + "-" + selDay;
                    if ($.inArray(selDate, selectedDateList) == -1) {
                        selectedDateList.push(selDate);
                    }
                    else {
                        selectedDateList.splice(selectedDateList.indexOf(selDate), 1);
                    }
                    selectedDateList.sort();
                },
                buttonClick: function () {
                    self.setInputValue();
                    self.hide();
                },
                clicked: function () {
                    var date = $(this).find('a');
                    if (date.hasClass('multi-date-state-active')) {
                        date.removeClass('multi-date-state-active');
                    }
                    else {
                        date.addClass('multi-date-state-active');
                    }
                    self.saveSelectedValues(date);
                    self.setInputValue();
                },
                loadPrevious: function () {
                    var year = parseInt($(this).closest('.multiDatePickerWithTimeSlider').find('.yearSelect').val());
                    var month = parseInt($(this).closest('.multiDatePickerWithTimeSlider').find('.monthSelect').val());
                    if (month == 1) {
                        year = year - 1;
                        month = 12;
                    } else {
                        month = month - 1;
                    }
                    var englishDate = new Date(month + "/1/" + year);

                    $container.empty().append(self.buildCalender(englishDate));
                },
                loadNext: function () {
                    var year = parseInt($(this).closest('.multiDatePickerWithTimeSlider').find('.yearSelect').val());
                    var month = parseInt($(this).closest('.multiDatePickerWithTimeSlider').find('.monthSelect').val());
                    if (month == 12) {
                        year = year + 1;
                        month = 1;
                    } else {
                        month = month + 1;
                    }
                    var englishDate = new Date(month + "/1/" + year);

                    $container.empty().append(self.buildCalender(englishDate));
                },
                pickDate: function () {
                    var year = parseInt($(this).closest('.multiDatePickerWithTimeSlider').find('.yearSelect').val());
                    var month = parseInt($(this).closest('.multiDatePickerWithTimeSlider').find('.monthSelect').val());
                    var englishDate = new Date(month + "/1/" + year);
                    $container.empty().append(self.buildCalender(englishDate));
                },
                addPrevHoverClass: function () {

                },
                addNextHoverClass: function () {

                },
                hover: function () {

                },
                initializeContainer: function () {
                    return $('<div class="bootstrap-datetimepicker-widget" style="display: block;">')
                        .insertAfter($input);
                },
                convertMinuteToHourMinute: function (time) {
                    var minute = Math.floor(time / 60);
                    var hour = time % 60;
                    minute = minute > 9 ? minute : "0" + minute;
                    hour = hour > 9 ? hour : "0" + hour;
                    return minute + ":" + hour;
                },
                convertHourMinuteToMinute: function (time) {
                    time = time.split(":");
                    return (parseInt(time[0]) * 60) + parseInt(time[1]);
                },
                buildCalender: function (currentDate) {

                    var inst = {};

                    var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

                    var totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

                    var weeks = Math.ceil((totalDays + firstDay.getDay()) / 7);

                    var $table = $("<table class='table-condensed'/>");
                    var count;

                    var $tableHead = $('<thead/>');

                    var $headTrSelector = $('<tr/>');

                    var $thPrev = $('<th class="prev disabled" data-action="previous"/>');

                    var $spanPrevious = $('<span class="glyphicon glyphicon-chevron-left" title="Previous Month"></span>');

                    $thPrev.append($spanPrevious);

                    var $thCurrentYearMonth = $('<th class="picker-switch" data-action="pickerSwitch" colspan="5" title="Select Month"/>');

                    $thCurrentYearMonth.text("August 2015");

                    var $thNext = $('<th class="next" data-action="next"/>');

                    var $spanNext = $('<span class="glyphicon glyphicon-chevron-right" title="Next Month"></span>');

                    $thNext.append($spanNext);

                    $headTrSelector.append($thPrev);

                    $headTrSelector.append($thCurrentYearMonth);

                    $headTrSelector.append($thNext);

                    $tableHead.append($headTrSelector);

                    var $headTrDays = $('<tr/>');

                    for (var k = 0; k < 7; k++) {
                        var $th = $('<th class="dow"/>');
                        $th.text(weeekDays[k]);
                        $headTrDays.append($th);
                    }

                    $tableHead.append($headTrDays);

                    $table.append($tableHead);

                    var $tbody = $('<tbody/>');

                    var drawYear = currentDate.getFullYear();
                    var drawMonth = currentDate.getMonth();
                    var drawDate = currentDate.getDate();
                    var startingDay = 0;

                    var daysInMonth = totalDays;
                    if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                    }
                    var leadDays = (self._getFirstDayOfMonth(drawYear, drawMonth) - startingDay + 7) % 7;
                    var numRows = Math.ceil((leadDays + daysInMonth) / 7);

                    var printDate = self._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
                        var $tr = $('<tr/>');
                        $tbody.append($tr);

                        for (var dow = 0; dow < 7; dow++) { // create date picker days
                            var $td = $('<td class="day"/>');

                            if (drawMonth > printDate.getMonth())
                                $td.addClass('old');
                            else if (drawMonth < printDate.getMonth())
                                $td.addClass('new');

                            if (drawYear == printDate.getFullYear() && drawMonth == printDate.getMonth() && drawDate == printDate.getDate()) {
                                $td.addClass('today');
                            }

                            $td.attr('data-day', ("0" + (printDate.getMonth() + 1)).slice(-2) + "/" + ("0" + printDate.getDate()).slice(-2) + "/" + printDate.getFullYear());

                            $td.attr('data-action', "selectDay");

                            var otherMonth = (printDate.getMonth() !== drawMonth);

                            $td.html(printDate.getDate());

                            printDate.setDate(printDate.getDate() + 1);

                            printDate = this._daylightSavingAdjust(printDate);

                            $tr.append($td);
                        }
                    }

                    $table.append($tbody);

                    return $table;
                },

                buildDayCalendar: function () {

                },

                buildMonthCalendar: function () {

                },

                _getFirstDayOfMonth: function (year, month) {
                    return new Date(year, month, 1).getDay();
                },
                _daylightSavingAdjust: function (date) {
                    if (!date) {
                        return null;
                    }
                    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
                    return date;
                }
            };

            self.initialize();
            /*
             $(document).mousedown(function (event) {
             if (($(event.target).closest('.multiDatePickerWithTimeSlider').length == 0) && $(event.target)[0] != $input[0]) {
             $container.fadeOut(200);
             displayState=false;
             }
             });*/

        });
    };
})(jQuery);