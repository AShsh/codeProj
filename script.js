$(function () {

    /*events*/
    $("#submitForm").on("click", function () {
        validateForm();
    });

    $('input').on("keyup", function(){
        $('.js-end-validate').hide();
        $('.alert').removeClass('js-end-validate');
    });

});

var validate = [
    {
        "message": "Field 'name' should contain from 6 to 60 letters",
        "field": "name",
        pattern: /^[a-z0-9_-]{6,60}$/
        }, {
        "message": "Field 'secondname' should contain from 3 to 60 letters",
        "field": "secondname",
        pattern: /^[a-z0-9_-]{3,60}$/
        }, {
        "message": "Please enter 'email'",
        "field": "email",
        pattern: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
        }, {
        "message": "Field 'gender' is required",
        "field": "gender",
        pattern: /male|female/
        },
        {
        "message": "Field 'password' should contain from 3 to 60 letters",
        "field": "pass",
        pattern: /^[a-z0-9_-]{3,60}$/
        },
        {
        "message": "Please agree",
        "field": "agree",
        pattern: /true/
        }
    ]

function validateForm() {
    $('#gender').val($('#genderVisible').val());
    $('#agree').val($('#agreeVisible').prop("checked"));

    var fields = $('#regForm').find("input").not("[type='checkbox']");
    var arrFields = {};
    for (var i = 0; i < fields.length; i++) {
        var nameField = fields[i].getAttribute('name'),
            valueField = fields[i].value;
        arrFields[nameField] = valueField;
    }
    for (var x = 0; x < validate.length; x++) {
        var name = validate[x]["field"],
            re = validate[x]["pattern"];
        if (!re.test(arrFields[name])) {
            $('.alert-danger').text(validate[x]["message"]);
            $('.alert-danger').show();
            $(".form-control[name='" + name + "']").on("keypress", function () {
                $('.alert-danger').hide();
            });
            break;
        }
        if (x == validate.length - 1) {
            $('.alert-danger').hide();
            var url = 'http://codeit.pro/frontTestTask/user/registration';
            $.ajax({
                type: "POST",
                url: url,
                data: $("#regForm").serialize(),
                success: function (data) {
                    if (data.status == 'Error') {
                       $('.alert-danger').text(data.message);
                       $('.alert-danger').addClass('js-end-validate');
                       $('.alert-danger').show();
                    } else {
                        window.location = "company.html";
                    }
                },
                error: function () {
                    $('.alert-danger').text('Something wrong');
                    $('.alert-danger').show();
                }
            });
        }
    }

}
