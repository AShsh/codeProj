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
    $('#totalCompany .panel-body').html('<p class="company-all">' + (list.length - 1) + '</p>');
}

function companyByLocation(list) {
    var countryCode = [];
    var result = {};
    var resultLength = 0;
    var summResult;

    list.forEach(function (item, i, arr) {
        countryCode[i] = item.location.code;
    });

    for (var i = 0; i < countryCode.length; ++i) {
        var a = countryCode[i];
        if (result[a] != undefined) {
            ++result[a];
        } else {
            result[a] = 1;
            resultLength++;
        }
    }
    $('#locationCompany .panel-body').html("<ul class='location-info'></ul>");
    for (var x in result) {
        summResult += result[x];
        $('#locationCompany .panel-body .location-info').append("<li>" + x + " its " +result[x] + " </li>");
    }
    console.log(resultLength);
    console.log(summResult);
}










