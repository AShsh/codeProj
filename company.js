$(function () {

    var globalData;
    $.ajax({
        type: "POST",
        url: 'http://codeit.pro/frontTestTask/company/getList',
        success: function (data) {
            if (data.status == 'Error') {
                $('.global-alert').text('not connection');
                $('.global-alert').show();
            } else {
                callback(data.list);
            }
        },
        error: function () {
            $('.global-alert').text('not connection');
            $('.global-alert').show();
        }
    });
});

function callback(list) {
    totalCompany(list);

    companyByLocation(list);
}

function totalCompany(list) {
    $('#totalCompany .panel-body').html('<p class="company-all">' + (list.length) + '</p>');
}

function companyByLocation(list) {
    var countryCode = [];
    var result = {};
    var summResult = 0;
    var newResult = [];

    list.forEach(function (item, i, arr) {
        countryCode[i] = item.location.name;
    });

    for (var i = 0; i < countryCode.length; ++i) {
        var a = countryCode[i];
        if (result[a] != undefined) {
            ++result[a];
        } else {
            result[a] = 1;
        }
    }
    for (key in result) {
        newResult.push({
            name: key,
            y: result[key]

        });
    }


    $('#locationCompany .panel-body').html('<div id="container">');
    for (var x in result) {
        summResult += result[x];
    }

    for (var y in result) {
        $('#locationCompany .panel-body .location-info').append("<li>" + y + " its " + result[y] * 100 / summResult + "% </li>");
    }
    createCircle(newResult);
}


function createCircle(res) {
    var data = [];
    for (var i = 0; i < res.length; i++) {
        data[i] = {
            name: res,
            y: res
        };
    }

    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage}%'
                }
            }
        },
        series: [
            {
                name: 'Brands',
                colorByPoint: true,
                data: res

            }]
    });
}
