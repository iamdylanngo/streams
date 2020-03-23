function getSong(id) {
    $.ajax({
        url: '/api/v1/song/get/' + id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
            if (jQxhr.status == 200) {
                console.log(data);

                const songPlay = addSong(data.data);
                myPlaylist.add(songPlay);
                setTimeout(function() {
                    myPlaylist.play(1);
                }, 2000);
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

    function addSong(song) {
        var myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
        var songPlay = {
            image: song.imagePath,
            title: song.title,
            artist: song.artist,
            mp3: song.musicPath,
            option: myPlayListOtion
        };
    
        return songPlay;
    }
}