$('#btn_upload').click(() => {
   
    var fd = new FormData();
    var files = $('#file')[0].files[0];
    console.log(files);
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
});