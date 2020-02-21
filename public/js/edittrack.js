$('#file').change(function(){    
    //on change event  
    formdata = new FormData();
    if($(this).prop('files').length > 0)
    {
        file =$(this).prop('files')[0];
        formdata.append("music", file);
    }
});

$('#upload').click(() => {
    jQuery.ajax({
        url: '/api/v1/music/upload',
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log(result);
        }
    });
});