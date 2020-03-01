$(function () {
    var user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
        $('#login').css("display", "none");
        $('#logged').css("display", "block");
        if (user.name) {
            $('#a_username').append(user.name);
            $('#a_username').append('<span class="ms_pro_name">' + user.name[0] + '</span>');
        }
        if (user.email) {
            $('#inp_name').val(user.name);
            $('#inp_email').val(user.email);
        }
        if (user.imagePath) {
            $('#img_avatar').attr('src', user.imagePath);
        }
    }

    $('.pro_img_overlay').click(() => {
        $("input[id='avatar']").click();
    });

    $('#avatar').change(function() {
        readURL(this);
    });

    $('#a_save_profile').click(() => {
        if (!user || !user.id) {
            return alert('Please login');
        }

        if ($('#avatar')[0].files.length == 0) {
            return alert('Avatar file is require');
        }
        
        var fd = new FormData();
        var files = $('#avatar')[0].files[0];
        fd.append('file', files);
    
        jQuery.ajax({
            url: '/api/v1/user/upload/' + user.id,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function (result) {
                // console.log(result);
                alert('Update profile is successfully')
            },
            error: function (error) {
                if (error) {
                    console.log(error);
                }
            }
        });
    });

});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img_avatar').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}