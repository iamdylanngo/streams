$('#btn_upload').click(() => {
   
    var fd = new FormData();
    var files = $('#filemusic')[0].files[0];
    if ($('#filemusic')[0].files.length == 0) {
        return alert('MP3 file is require');
    }
    fd.append('file',files);

    jQuery.ajax({
        url: '/api/v1/music/upload',
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function (result) {
           console.log(result);
        },
        error: function(error) {
            if(error) {
                console.log(error);
            }
        }
    });

    uploadSongImage();
});

function uploadSongImage() {
    var fd = new FormData();
    var files = $('#fileimage')[0].files[0];
    if ($('#fileimage')[0].files.length == 0) {
        return alert('MP3 file is require');
    }
    fd.append('file',files);

    jQuery.ajax({
        url: '/api/v1/image/upload',
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function (result) {
           console.log(result);
        },
        error: function(error) {
            if(error) {
                console.log(error);
            }
        }
    });
}