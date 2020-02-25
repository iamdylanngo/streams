$('#btn_create').click(() => {
    if ($('#inp_name').val().length == 0) {
        return alert('Genre name is require')
    }
    if ($('#inp_order').val().length == 0) {
        return alert('Order is require')
    }

    var payload = {
        title: $('#inp_name').val(),
        order: $('#inp_order').val(),
    };

    $.ajax({
        url: '/api/v1/genre/create',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                // console.log(data);
                alert('Create genre is successfully');
                $('#inp_name').val('');
                $('#inp_order').val('');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(jqXhr);
            if (jqXhr.status == 400) {
                alert(jqXhr.responseJSON.message);
            } else {
                alert('Create genre is fail, Please try again');
            }
        }
    });

});