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
    var name = $('#inp_register_name').val();
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
                console.log(data);
                // alert('Login is complete.');
                var user = JSON.stringify({
                    name: data.data.name,
                    rules: data.data.rules,
                    email: data.data.email,
                    id: data.data._id,
                    imagePath: data.data.imagePath,
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

$(function () {
    var user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user) {
        $('#login').css("display", "none");
        $('#logged').css("display", "block");
        if (user.name) {
            $('#a_username').append(user.name);
            $('#a_username').append('<span class="ms_pro_name">' + user.name[0] + '</span>');
        }
    }

    getAllSong();
});

var songs = null;

function getAllSong() {
    $.ajax({
        url: '/api/v1/song/get',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                console.log(data);
                songs = data.data;
                renderSong(data.data);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(jqXhr);
            if (jqXhr.status == 400) {
                alert(jqXhr.responseJSON.message);
            } else {
                alert('Get song is fail, please try again');
            }
        }
    });
}

function renderSong(res) {
    var count = res.length;
    if (count > 60) {
        rederLayoutSong(res, 29, 59, 60);
    } else if (count > 30 && count <= 60) {
        rederLayoutSong(res, 29, 59, 60);
    } else if (count > 15 && count <= 30) {
        rederLayoutSong(res, 9, 19, 30);
    } else if (count <= 15) {
        rederLayoutSong(res, 4, 9, 15);
    }

    $('.ms_play_icon').on('click', event => {
        const clickedElement = $(event.target);
        // console.log(clickedElement);
        // console.log(clickedElement.attr('class'));
        var songId = clickedElement.attr('class');
        var songPlay = addSong(songId);

        myPlaylist.add(songPlay);
        myPlaylist.play(myPlaylist.playlist.length - 1);
    });

    $('#a_clear_all').click(() => {
        myPlaylist.pause();
        myPlaylist.remove();
        $(".jp-now-playing").html("<div class='jp-track-name'><span class='que_img'><img style='width: 50px;' src='public/images/logo.png'></span><div class='que_data'><div class='jp-artist-name'></div></div></div>");
    });

    $('.a_add_queue').on('click', event => {
        const clickedElement = $(event.target);
        var classTemp = clickedElement.attr('class');
        // console.log(clickedElement);
        // console.log(classTemp.split(' '));
        var songIds = classTemp.split(' ');
        if (songIds.length > 1) {
            var songPlay = addSong(songIds[1]);
            myPlaylist.add(songPlay);
        }
    });
}

function rederLayoutSong(res, a, b, c) {
    for (var i = 0; i < res.length; i++) {
        var ms_weekly_box = `
        <div class="ms_weekly_box">
        <div class="weekly_left">
            <span class="w_top_no">
                ${renderOrder(i + 1)}
            </span>
            <div class="w_top_song">
                <div class="w_tp_song_img">
                    <img src="${res[i].imagePath}" alt="" class="img-fluid">
                    <div class="ms_song_overlay">
                    </div>
                    <div class="ms_play_icon">
                        <img class="${res[i]._id}" src="public/images/svg/play.svg" alt="">
                    </div>
                </div>
                <div class="w_tp_song_name">
                    <h3>${res[i].title}</h3>
                    <p>${res[i].artist}</p>
                </div>
            </div>
        </div>
        <div class="weekly_right">
            <span class="w_song_time">5:10</span>
            <span class="ms_more_icon" data-other="1">
                <img src="public/images/svg/more.svg" alt="">
            </span>
        </div>
        <ul class="more_option">
            <li><a href="javascript:;" class="${res[i]._id}"><span class="opt_icon"><span class="icon icon_fav"></span></span>Add
                    To Favourites</a></li>
            <li><a href="javascript:;" class="a_add_queue ${res[i]._id}"><span class="opt_icon"><span
                            class="icon icon_queue"></span></span>Add To Queue</a></li>
            <li><a href="javascript:;" class="${res[i]._id}"><span class="opt_icon"><span
                            class="icon icon_dwn"></span></span>Download Now</a></li>
            <li><a href="javascript:;" class="${res[i]._id}"><span class="opt_icon"><span
                            class="icon icon_playlst"></span></span>Add To Playlist</a></li>
            <li><a href="javascript:;" class="${res[i]._id}"><span class="opt_icon"><span
                            class="icon icon_share"></span></span>Share</a></li>
        </ul>
        </div>`;

        var ms_divider = `<div class="ms_divider"></div>`;

        if (i <= a) {
            $("#top_music1").append(ms_weekly_box);
            $("#top_music1").append(ms_divider);
        }
        if (i > a && i <= b) {
            $("#top_music2").append(ms_weekly_box);
            $("#top_music2").append(ms_divider);
        }
        if (i > b && i <= c) {
            $("#top_music3").append(ms_weekly_box);
            $("#top_music3").append(ms_divider);
        }
        if (i > c) {
            $("#top_music3").append(ms_weekly_box);
            $("#top_music3").append(ms_divider);
        }
    }

    // listen option
    $(".ms_more_icon").on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (typeof $(this).attr('data-other') != 'undefined') {
            var target = $(this).parent().parent();
        } else {
            var target = $(this).parent();
        }
        if (target.find("ul.more_option").hasClass('open_option')) {
            target.find("ul.more_option").removeClass('open_option');
        } else {
            $("ul.more_option.open_option").removeClass('open_option');
            target.find("ul.more_option").addClass('open_option');
        }
    });
}

function renderOrder(i) {
    if (i / 10 < 1) {
        return '0' + i;
    } else {
        return i;
    }
}

function addSong(songId) {
    var myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
    var song = findSongById(songId);
    var songPlay = {
        image: song.imagePath,
        title: song.title,
        artist: song.artist,
        mp3: song.musicPath,
        option: myPlayListOtion
    };

    return songPlay;
}

function findSongById(songId) {
    // console.log(songId);
    for (var i = 0; i < songs.length; i++) {
        if (songs[i]._id == songId) {
            return songs[i];
        }
    }
    return null;
}