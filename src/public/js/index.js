function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

$('#btn_register').click(() => {

    if ($('#inp_email').val().length == 0 || !IsEmail($('#inp_email').val())) {
        return alert('Please check email again');
    }
    if ($('#inp_password').val().length == 0 || $('#inp_password').val() != $('#inp_repassword').val()) {
        return alert('Please check password again');
    }

    var email = $('#inp_email').val();
    var name = $('#inp_name').val();
    var password = $('#inp_password').val();

    var payload = {
        email: email,
        password: password,
        name: name
    };

    $.ajax({
        url: '/api/v1/user/create',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                alert('Register is complete, Please click to login.');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            if (jqXhr.status == 400) {
                alert('User is exists, Please try again');
            } else {
                alert('Register is fail, Please try again');
            }
        }
    });
});

$('#btn_login_1').click(() => {

    if ($('#inp_email_1').val().length == 0) {
        return alert('Email is require');
    }
    if ($('#inp_password_1').val().length == 0) {
        return alert('Password is require');
    }

    var payload = {
        email: $('#inp_email_1').val(),
        password: $('#inp_password_1').val(),
    };

    $.ajax({
        url: '/api/v1/user/login',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                // console.log(data);
                // alert('Login is complete.');
                var user = JSON.stringify({
                    name: data.data.name,
                    rules: data.data.rules,
                    id: data.data._id,
                });
                localStorage.setItem("user", user);

                // var cache = JSON.parse(localStorage.getItem("user"));
                // console.log(cache);

                window.location.href = '/';
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(jqXhr);
            if (jqXhr.status == 400) {
                alert(jqXhr.responseJSON.message);
            } else {
                alert('Login is fail, Please try again');
            }
        }
    });

});