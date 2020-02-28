$(function () {
    $.ajax({
        url: '/api/v1/genre/get',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                updateGenre(data.data);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(jqXhr);
            if (jqXhr.status == 400) {
                alert(jqXhr.responseJSON.message);
            } else {
                alert('Get genre is fail, Please try again');
            }
        }
    });
});

function updateGenre(res) {
    for (var i = 0; i < res.length; i++) {
        $('#select_genre').append($('<option>', { value: res[i]._id, text: res[i].title }));
    }
}

$('#btn_upload').click(() => {

    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return alert('Please login');
    }

    if ($('#filemusic')[0].files.length == 0) {
        return alert('MP3 file is require');
    }
    if ($('#fileimage')[0].files.length == 0) {
        return alert('Image file is require');
    }
    if ($('#inp_name').val().length == 0) {
        return alert('Track name is require');
    }
    if ($('#inp_artist').val().length == 0) {
        return alert('Artist Name is require');
    }

    var fd = new FormData();
    var files = $('#filemusic')[0].files[0];
    fd.append('file', files);

    jQuery.ajax({
        url: '/api/v1/music/upload',
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function (result) {
            // console.log(result);
            uploadSongImage(result.data.filename);
        },
        error: function (error) {
            if (error) {
                console.log(error);
            }
        }
    });

});

$('#btn_cancle').click(() => {
    window.location.href = '/';
});

function uploadSongImage(musicPath) {
    var fd = new FormData();
    var files = $('#fileimage')[0].files[0];
    fd.append('file', files);

    jQuery.ajax({
        url: '/api/v1/image/upload',
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function (result) {
            // console.log(result);
            createSong(musicPath, result.data.filename);
        },
        error: function (error) {
            if (error) {
                console.log(error);
            }
        }
    });
}

function createSong(musicPath, imagePath) {
    var user = JSON.parse(localStorage.getItem("user"));
    var payload = {
        title: $('#inp_name').val(),
        artist: $('#inp_artist').val(),
        genreId: $('#select_genre').val(),
        userId: user.id,
        musicPath: musicPath,
        imagePath: imagePath
    };

    // console.log(payload);

    $.ajax({
        url: '/api/v1/song/create',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                // console.log(data);
                alert('Create song is successfully');
                $('#inp_name').val('');
                $('#inp_artist').val('');
                $('#filemusic').val('');
                $('#fileimage').val('');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            // console.log(jqXhr);
            if (jqXhr.status == 400) {
                alert(jqXhr.responseJSON.message);
            } else {
                alert('Create song is fail, Please try again');
            }
        }
    });
}

$(function() {
    var user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user) {
        $('#login').css("display", "none");
        $('#logged').css("display", "block");
        if (user.name) {
            $('#a_username').append(user.name);
            $('#a_username').append('<span class="ms_pro_name">'+user.name[0]+'</span>');
        }
    }
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

$('#a_logout').click(() => {
    localStorage.setItem("user", null);
    window.location.href = '/';
});