var colorValues = ["#2FABE9", "#FA5833", "#bdea74", "#eae874", "#3B5998"];

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
        complete: function () {
            $(".loading-image").css("visibility", "hidden");
        },
        success: function (chartData) {
            DrawLineChart(element, chartData, optionParams);
        },
        error: function (request, status, error) {
        }
    })
}

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

            xAxisValue = dataObj[xAxisColumn.Field];


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

        plotData.push({
            data: rowData,
            label: headerObj.DisplayLabel
        });

    });


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
        },
        colors: colorValues,
        tooltipOpts: {
            content: getTooltip,
            defaultTheme: false
        }
    };

    function getTooltip(label, x, y) {

        console.log('oss');

        return "Your sales for " + x + " was $" + y;
    }

    if (xAxisColumn.DataType !== undefined && xAxisColumn.DataType == 'DateTime') {
        ConcatJson(plotOptions, {
            xaxis: {
                mode: "categories"
            }
        });
    } else {
        ConcatJson(plotOptions, {
            xaxis: {ticks: 50, tickDecimals: 0}
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

                var swapRecords = swapJsonKeyValues(item.series.xaxis.categories);

                var x = swapRecords[item.dataIndex];

                var y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
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