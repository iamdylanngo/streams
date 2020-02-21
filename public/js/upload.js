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
    if($('#kind').val()[0] == "Kind of music") { 
        alert('Please select kind.');
        return;
    }

    jQuery.ajax({
        url: '/api/v1/music/upload',
        type: "POST",
        data: formdata,
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