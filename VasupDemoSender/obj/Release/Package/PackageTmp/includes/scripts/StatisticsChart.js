var colorValues = ["#2FABE9", "#FA5833", "#bdea74", "#eae874", "#3B5998"];
var labelTextLang;
//var colorValuesComparativeChart = ["#ece86d", "#67c1f3", "#bbeb71", "#ff5250"];

function BuildLineChart(element, dataFetchUrl, postJsonData, optionParams) {


    $.ajax({
        url: dataFetchUrl,
        type: 'get',
        dataType: "json",
        data: postJsonData,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $(".loading-image").css("visibility", "visible");
        },
        complete: function (response) {

            $(".loading-image").css("visibility", "hidden");
        },
        success: function (chartData) {

            DrawLineChart(element, chartData, optionParams);
        },
        error: function (request, status, error) {
        }
    })
}


function BuildPieChart(element, dataFetchUrl, options, jsonPostData) {

    element.prev('.pie-title').find('.chart-date-range').html(jsonPostData.DateRange);
    $.ajax({
        url: dataFetchUrl,
        type: 'get',
        dataType: "json",
        data: {CustomOptions: options.customoptions, filterData: jsonPostData},
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $(".loading-image").css("visibility", "visible");
        },
        complete: function (response) {


            $(".loading-image").css("visibility", "hidden");
        },
        success: function (chartData) {

            if (typeof(chartData) == "object") {

                if (chartData.length > 0) {

                    DrawPieChart(element, chartData, options.plotoptions);
                } else {

                    ShowError(element, options.customoptions.NoDataFound);
                }
            } else {

                ShowError(element, options.customoptions.UnknownError);
            }
        },
        error: function (request, status, error) {
        }
    })
}
function ShowError($element, message) {

    $element.find('.piedata-not-found').remove();
    $element.html("");
    $element.find('.pie-overlay').remove();
    $element.append('<h5 class="piedata-not-found">' + message + '</h5>');
    $element.append('<div class="pie-overlay"></div>');
}


function DrawPieChart($chart, chartData, options) {


    $.plot($chart, chartData, options);
}

var type = "None";

function DrawLineChart($chart, chartData, optionParams) {
    $($chart).html("");
    $(optionParams.legendDivElement).html("");

    var xAxisColumn = optionParams.xAxisColumn;

    var plotData = [];
    var legendData = [];


    $.each(optionParams.lineHeaderColumns, function (headerIndex, headerObj) {

        var rowData = [];
        var colCountValue = 0;

        var i = 1;
        $.each(chartData, function (dataIndex, dataObj) {

            var xAxisValue, yAxisValue;

            type = dataObj["Type"] != undefined && dataObj["Type"] == "Weekly" ? dataObj["Type"] : "None";

            if (xAxisColumn.DataType !== undefined) { //&& type == "None"
                xAxisValue = GetFormattedValueByDataType(dataObj[xAxisColumn.Field], xAxisColumn.DataType);
            } else {
                xAxisValue = dataObj[xAxisColumn.Field];
            }

            if (headerObj.DataType !== undefined) {
                yAxisValue = GetFormattedValueByDataType(dataObj[headerObj.Field], headerObj.DataType);
            } else {
                yAxisValue = dataObj[headerObj.Field];
            }

            var cell = [xAxisValue, yAxisValue];

            rowData.push(cell);

            colCountValue += yAxisValue;
        });

        legendData.push({"title": headerObj.DisplayLabel, "value": colCountValue});

        plotData.push({data: rowData, label: headerObj.DisplayLabel});

    });

    if (optionParams.lineColorValues != null && optionParams.lineColorValues.length > 0) {
        colorValues = optionParams.lineColorValues;
    }

    if (optionParams.labelTextLang != null && optionParams.labelTextLang.length > 0) {
        labelTextLang = optionParams.labelTextLang;
    }


    var plotOptions = {
        series: {
            lines: {
                show: true,
                lineWidth: 2
            },
            points: {
                show: true,
                lineWidth: 2
            },
            shadowSize: 0
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#f9f9f9",
            borderWidth: 0
        },
        legend: {
            show: false
        }, points: {show: true},
        colors: colorValues,
        yaxis: {ticks: 5, tickDecimals: 0}
    };

    if (optionParams.ReportType !== undefined && optionParams.ReportType == "Hourly") {
        ConcatJson(plotOptions, {
            xaxis: {

                ticks: function (axis) {
                    //ticks =[1440958500000, 1440965700000, 1440972900000, 1440980100000, 1440987300000, 1440994500000, 1441001700000, 1441008900000, 1441016100000, 1441023300000, 1441030500000, 1441037700000, 1441044900000];
                    // debugger;

                    var ticks = [],
                    //start = floorInBase(axis.min, axis.tickSize),
                        start = axis.min,
                        i = 1,
                        v = Number.NaN,
                        prev;

                    ticks.push(start);
                    v = start;

                    do {
                        prev = v;
                        v = prev + (1 * 3600000);
                        ticks.push(v);

                    } while (v < axis.max);
                    return ticks;
                },

                tickFormatter: function (val, axis) {

                    var myDate = new Date(val);
                    return AddZero(myDate.getHours()) + ":" + AddZero(myDate.getMinutes());

                }
            }
        });
    }

    else if (xAxisColumn.DataType !== undefined && xAxisColumn.DataType == 'DateTime' && type == "Weekly") {
        ConcatJson(plotOptions, {
            xaxis: {
                /* ticks: 8,
                 mode: "time",
                 timeformat: xAxisColumn.DateTimeFormat*/

                ticks: function (axis) {
                    var ticks = [],
                        start = axis.min,
                        i = 1,
                        v = Number.NaN,
                        prev;

                    ticks.push(start);
                    v = start;
                    do {
                        prev = v;
                        v = prev + 86400000;
                        ticks.push(v);

                    } while (v < axis.max);
                    return ticks;
                },
                tickFormatter: function (val, axis) {

                    var myDate = new Date(val);
                    var axisVal = AddZero(myDate.getDate()) + '/' + AddZero(myDate.getMonth() + 1) + '/' + AddZero(myDate.getFullYear());
                    console.log(axisVal);
                    return axisVal;
                }
            }
        });
    }

    else if (xAxisColumn.DataType !== undefined && xAxisColumn.DataType == 'DateTime' && type == "None") {
        ConcatJson(plotOptions, {
            xaxis: {

                mode: "time",
                timeformat: xAxisColumn.DateTimeFormat
            }
        });
    } else {
        ConcatJson(plotOptions, {
            xaxis: {mode: "categories"}
        });
    }

    var plot = $.plot($($chart), plotData, plotOptions);


    BindPlotHoverEvent($chart, xAxisColumn.DataType, xAxisColumn.DateTimeFormat);

    DrawLegend(legendData, optionParams);
}


function DrawLegend(legendData, optionParams) {

    if (optionParams.showLegend != undefined && optionParams.showLegend) {

        var $parentLegendDiv = optionParams.legendDivElement;

        var $titleColumn = $('<div class="col-sm-3 legend-columns"><h4>' + optionParams.chartTitle + '</h4></div>');

        var $rangeDiv = $('<div class="chart-date-range">' + optionParams.dateRange + '</div>');

        $titleColumn.append($rangeDiv);

        $($parentLegendDiv).append($titleColumn);

        var $legendColumn = $('<div class="col-sm-9 legend-columns"/>');

        var colorIndex = 0;

        $.each(legendData, function (index, object) {

            var color = colorValues[colorIndex++];

            var $itemDiv = $('<div class="legend-item"/>');
            var $valueDiv = $('<div class="number"/>');
            var $titleDiv = $('<div class="title"></div>');
            var $colorSpan = $('<span class="color"/>');

            $valueDiv.attr("style", "color:" + color);
            $valueDiv.html(object.value);

            $titleDiv.text(object.title);
            $colorSpan.attr("style", "background:" + color);
            $titleDiv.prepend($colorSpan);

            $itemDiv.append($valueDiv).append($titleDiv);

            $legendColumn.append($itemDiv);

        });

        $($parentLegendDiv).append($legendColumn);
    }
}


function showTooltip(x, y, contents) {

    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y + 5,
        left: x + 5,
        border: '1px solid #fdd',
        padding: '2px',
        'background-color': '#dfeffc'
        //opacity: 0.80
    }).appendTo("body").fadeIn(200);
}

function BindPlotHoverEvent($chart, xAxisDataType, DataTypeFormat) {

    var previousPoint = null;

    $($chart).bind("plothover", function (event, pos, item) {

        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();

                var x = "";

                if (type == "None" || type == "Weekly") {
                    x = item.datapoint[0].toFixed(2);

                    if (xAxisDataType == 'DateTime') {

                        x = FormatDateTime(x, DataTypeFormat);
                    }
                } else {

                    var swapRecords = swapJsonKeyValues(item.series.xaxis.categories);

                    x = swapRecords[item.dataIndex];
                }

                //x = item.datapoint[0].toFixed(0);
                var y = item.datapoint[1].toFixed(0);

                var labelOf = "Of";
                if (labelTextLang.length > 0) {
                    for (var i = 0; i < labelTextLang.length; i++) {

                        if (labelTextLang[i].Key == "of") {
                            labelOf = labelTextLang[0].Value;
                            break;
                        }
                    }
                }

                showTooltip(item.pageX, item.pageY, item.series.label + " " + labelOf + " " + x + " = " + y);
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
}

function swapJsonKeyValues(input) {
    var one, output = {};
    for (one in input) {
        if (input.hasOwnProperty(one)) {
            output[input[one]] = one;
        }
    }
    return output;
}


function GetFormattedValueByDataType(value, dataType) {

    if (dataType == "DateTime") {
        return (new Date(value)).getTime();
    }
    else if (dataType == "Int") {
        return parseInt(value);
    }
    return 0;
}

function ConcatJson(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
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