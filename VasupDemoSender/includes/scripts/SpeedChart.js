(function ($) {
    function init(plot) {

        function autoMarkingsFunction(plot, offset) {
            plot.getOptions().grid.markings = new Array();
            $(plot.getData()).each(function () {
                if (this.autoMarkings && this.autoMarkings.enabled === true) {
                    if (plot.getOptions().grid.markings == null) plot.getOptions().grid.markings = new Array();

                    if (this.autoMarkings.showMinMax === true || this.autoMarkings.showAvg === true) {
                        if (this.autoMarkings.min == null || this.autoMarkings.max == null || this.autoMarkings.avg == null) {
                            var min = Number.MAX_VALUE;
                            var max = 0;
                            var sum = 0;
                            var count = 0;
                            $(this.data).each(function () {
                                if (this[1] < min) min = this[1];
                                if (this[1] > max) max = this[1];
                                count++;
                                sum += this[1];
                            });
                            if (this.autoMarkings.min == null) this.autoMarkings.min = min;
                            if (this.autoMarkings.max == null) this.autoMarkings.max = max;
                            if (this.autoMarkings.avg == null) this.autoMarkings.avg = sum / count;
                        }
                        if (this.autoMarkings.lineWidth) {
                            plot.getOptions().grid.markingsLineWidth = parseInt(this.autoMarkings.lineWidth);
                        }
                    }

                    var seriesColor = this.autoMarkings.color || this.color;
                    var avgseriesColor = this.autoMarkings.avgcolor || this.color;

                    var axis = "y" + (this.yaxis.n > 1 ? this.yaxis.n : "") + "axis";

                    if (this.autoMarkings.showMinMax === true && this.autoMarkings.min != Number.MAX_VALUE && this.autoMarkings.max != 0) {
                        var marking = {color: seriesColor.replace('rgb(', 'rgba(').replace(')', ',' + this.autoMarkings.minMaxAlpha + ')')};
                        marking[axis] = {from: this.autoMarkings.min, to: this.autoMarkings.max};
                        plot.getOptions().grid.markings.push(marking);
                    }
                    if (this.autoMarkings.showAvg === true && this.autoMarkings.avg != Number.NaN) {
                        var marking = {color: avgseriesColor};


                        marking[axis] = {from: this.autoMarkings.avg, to: this.autoMarkings.avg};
                        plot.getOptions().grid.markings.push(marking);
                    }
                }
            });
        }

        plot.hooks.processOffset.push(autoMarkingsFunction);
    }

    var options = {series: {autoMarkings: {enabled: false, minMaxAlpha: 0.2, lineWidth: 2}}};

    /** Options
     * enabled
     * color
     * avgcolor
     * showMinMax
     * minMaxAlpha
     * showAvg
     * min
     * max
     * avg
     */

    $.plot.plugins.push({
        init: init,
        options: options,
        name: "autoMarkings",
        version: "0.2.2"
    });
})(jQuery);


function RefreshChart($thisObj, $obj) {


    $($thisObj).find('.glyphicon').addClass('glyphicon-refresh-animate');

    LoadSpeedChart($obj);

    setTimeout(function () {


        $($thisObj).find('.glyphicon').removeClass('glyphicon-refresh-animate');

    }, 500);
}


function LoadSpeedChart(chartSelector, options) {

    $.ajax({
        url: options.url,
        type: 'get',
        dataType: "json",
        data: {Type: options.type, Duration: options.duration},
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            //$(".loading-image").css("visibility", "visible");
        },
        complete: function (response) {


            //$(".loading-image").css("visibility", "hidden");
        },
        success: function (chartData) {


            if (typeof(chartData) == "object" && typeof chartData.data != undefined) {

                if (chartData.data.length > 0) {


                    DrawTPSChart(chartSelector, chartData, options);
                } else {

                    //ShowError(element, options.customoptions.NoDataFound);
                }
            } else {

                //ShowError(element, options.customoptions.UnknownError);
            }
        },
        error: function (request, status, error) {
        }
    })


}


function DrawTPSChart(chartSelector, chartData, options) {


    var defaultOptions = {
        averageLineColor: "#51a351",
        barColor: '#3b6998',
        barLabel: 'TPS',
        lineWidth: 5,
        barWidth: 0,
        averageLabel: 'Average Speed',
        aboveData: true
    }
    $.each(defaultOptions, function (key, val) {

        if (key in options) {
            defaultOptions[key] = options[key];
        }

    });

    var selectorID = chartSelector.substring(1, chartSelector.length);

    var data = [];
    var chartTpsData = chartData.data;

    for (var i = 0; i < chartData.data.length; i++) {

        var dateTime = new Date(chartData.data[i][0]);
        var tps = chartData.data[i][1];

        data.push([dateTime, tps]);
    }
    var average = chartData.average;
    var maxDate = chartData.maxDate;
    var minDate = chartData.minDate;
    var maxTps = chartData.maxTps;

    var minTps = chartData.minTps;


    var plot = $.plot(chartSelector, [
        {data: data, label: "&nbsp;" + defaultOptions.barLabel, color: defaultOptions.barColor}
    ], {
        series: {
            autoMarkings: {
                enabled: true,
                showAvg: true,
                avgcolor: defaultOptions.averageLineColor,
                avg: average


            },
            bars: {
                show: true,
                lineWidth: defaultOptions.lineWidth, // in pixels
                barWidth: defaultOptions.barWidth, // in units of the x axis
                fill: true,
                align: "left", // "left", "right", or "center"
                horizontal: false,
                zero: true


            },
            lines: {
                show: false,
                horizontal: true

            },
            points: {
                show: true,
                radius: 2

            }


        },

        grid: {
            hoverable: true,
            clickable: true,
            show: true,
            borderWidth: 1,
            borderColor: '#3b6998',
            aboveData: defaultOptions.aboveData
        },
        xaxis: {
            mode: "time",
            minTickSize: [1, "second"],
            min: new Date(minDate).getTime(),
            max: new Date(maxDate).getTime(),
            twelveHourClock: false,
            tickFormatter: function (value, axis) {

                var dt = new Date(value);
                var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                return time;
            }
        },
        yaxis: {
            min: (parseInt(minTps) - 1),
            max: (parseInt(maxTps) + 1)
        }
    });

    $("<div id='" + selectorID + "billingTooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "2px solid #fff",
        "border-radius": '5px',
        padding: "2px 5px",
        "background-color": "#000",
        color: '#fff',
        opacity: 0.8
    }).appendTo("body");


    $(chartSelector).bind("plothover", average, function (event, pos, item) {


        if ((Math.floor(pos.y1)) == Math.floor(average) || (Math.ceil(pos.y1)) == Math.ceil(average) || pos.y1 == average) {

            $("#" + selectorID + "billingTooltip").html(defaultOptions.averageLabel + "    : " + average)
                .css({top: pos.pageY + 0, left: pos.pageX + 5, background: '#000'})
                .fadeIn(200);
        } else {
            $("#" + selectorID + "billingTooltip").hide();
            $("#" + selectorID + "billingTooltip").css('background', '#000');
        }
        if (item) {
            var x = item.datapoint[0];
            y = item.datapoint[1].toFixed(4);


            var dt = new Date(x);
            var time = AddZero(dt.getHours()) + ":" + AddZero(dt.getMinutes()) + ":" + AddZero(dt.getSeconds());


            $("#" + selectorID + "billingTooltip").html(item.series.label + " " + Language.translate('of') + " " + time + " = " + y)
                .css({top: item.pageY + 5, left: item.pageX + 5, background: '#000'})
                .fadeIn(200);
        } else {
            $("#" + selectorID + "billingTooltip").hide();
        }

    });

}

function FormatDateTime(timeStamp, format) {

    if (isNaN(parseInt(timeStamp))) return null;

    var parsedDateTime = new Date(parseInt(timeStamp));

    if (isNaN(parsedDateTime)) return null;

    var d = AddZero(parsedDateTime.getDate());
    var m = AddZero(parsedDateTime.getMonth() + 1);
    var Y = parsedDateTime.getFullYear();
    var D = parsedDateTime.getDay();
    var H = AddZero(parsedDateTime.getHours());
    var M = AddZero(parsedDateTime.getMinutes());
    var S = AddZero(parsedDateTime.getSeconds());

    format = format.replace("%d", d);
    format = format.replace("%m", m);
    format = format.replace("%Y", Y);
    format = format.replace("%D", D);
    format = format.replace("%H", H);
    format = format.replace("%M", M);
    format = format.replace("%S", S);

    return format;
}

function AddZero(value) {

    value = parseInt(value);
    if (value <= 9) {
        value = "0" + value;
    }
    return value;
}