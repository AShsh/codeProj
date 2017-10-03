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
                callback(data);
            }
        },
        error: function () {
            $('.global-alert').text('not connection');
            $('.global-alert').show();
        }
    });
});

function callback(data) {
    console.log(data);
}
