var formdata = null;

$('#file').change(function(){    
    formdata = new FormData();
    if($(this).prop('files').length > 0)
    {
        file =$(this).prop('files')[0];
        formdata.append("file", file);
    }
});

$('#upload').click(() => {
    if (!formdata) {
        alert('Please select mp3 file.');
        return;
    }
    if ($('#trackname').val().length == 0){
        alert('Please enter trackname.');
        return;
    }
    if ($('#artists').val().length == 0){
        alert('Please enter artists.');
        return;
    }
    if($('#type').val()[0] == "Choose Type") { 
        alert('Please choose type.');
        return;
    }

    jQuery.ajax({
        url: '/api/v1/music/upload',
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.data.filename) {
                updateTrackInfo(result.data.filename);
            } else {
                console.log(result);
            }
        },
        error: function(error) {
            if(error) {
                console.log(error);
            }
        }
    });
});

function updateTrackInfo(trackPath) {
    var trackname = $('#trackname').val();
    var artists = $('#artists').val();
    var type = $('#type').val();
    var user = JSON.parse(localStorage.getItem("user"));

    var data = {
        name: trackname,
        artists: artists,
        type: type,
        path: trackPath,
        user_id: user ? user.id : 0,
    }

    $.ajax({
        url: '/api/v1/track/create',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                // console.log(data);
                alert('Add track is complete');
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
}

function initUpload() {
    var config = JSON.parse(localStorage.getItem("config"));
    var types = config.types;
    for(var i = 0; i < types.length; i++) {
        $('#type').append(`<option value="${types[i].id}"> ${types[i].name} </option>`); 
    }
}

initUpload();