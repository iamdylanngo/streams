var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/play3.html');
});

app.use('/public', express.static('public'))

io.on('connection', function (socket) {
    console.log('A User connected');
    console.log('ID: ', socket.conn.id);
    console.log('remoteAddress', socket.conn.remoteAddress);

    socket.on('message', function (msg) {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', function () {
        console.log('User disconnect');
    });
});

http.listen(3000, function () {
    console.log('Listen on *:3000');
});

app.get('/api/play/:key', function(req, res){
    
    // var key = req.params.key;
    // range = req.headers.range;
    // console.log(key);
    // console.log(range);

    // var readStream;

    // var path = 'music/' + key + '.mp3';
    // var stat = fs.statSync(path);

    // console.log(stat);

    // res.header({
    //     'Content-Type': 'audio/mpeg',
    //     'Content-Length': stat.size
    // });

    // readStream = fs.createReadStream(path);
    // readStream.pipe(res);

    var key = req.params.key;
    var music = 'music/' + key + '.mp3';
    var stat = fs.statSync(music);
    range = req.headers.range;
    var readStream;

    if (range !== undefined) {
        var parts = range.replace(/bytes=/, "").split("-");

        var partial_start = parts[0];
        var partial_end = parts[1];

        if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
            return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
        }

        var start = parseInt(partial_start, 10);
        var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
        var content_length = (end - start) + 1;

        res.status(206).header({
            'Content-Type': 'audio/mpeg',
            'Content-Length': content_length,
            'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
        });

        readStream = fs.createReadStream(music, {start: start, end: end});
    } else {
        res.header({
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });
        readStream = fs.createReadStream(music);
    }
    readStream.pipe(res);

});