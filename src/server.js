import socketIO from 'socket.io';

var Music = function (socket) {
    self.id = socket.id;
}

const Server = (httpServer) => {

    const domain = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;

    const musics = {
        albums: ['albums', 'albums', 'albums', 'albums', 'albums'],
        trackNames: ['Anh Thanh Niên', 'Duyên Trời Lấy 2', 'Duyên Trời Lấy', 'Có Em Đời Bỗng Vui', 'Hoa Vô Sắc'],
        albumArtworks: ['_1', '_2', '_3', '_4', '_5'],
        trackUrl: [domain + '/api/v1/music/play/1', domain + '/api/v1/music/play/2', domain + '/api/v1/music/play/3', domain + '/api/v1/music/play/4', domain + '/api/v1/music/play/5']
    };

    let io = new socketIO(httpServer);
    let SOCKET_LIST = [];
    io.on('connection', function (socket) {
        console.log('A User connected');
        console.log('ID: ', socket.conn.id);
        console.log('remoteAddress', socket.conn.remoteAddress);

        SOCKET_LIST[socket.id] = socket;

        io.on('client-info', function(res) {
            console.log("client-info");
            console.log(res);
        });

        socket.on('message', function (msg) {
            console.log('message: ' + msg);
            io.emit('message', msg);
        });

        socket.on('disconnect', function () {
            console.log('User disconnect');
        });

        var config = {
            host: process.env.SERVER_HOST,
            port: process.env.SERVER_PORT,
        }

        io.emit('config', config);

    });

    setInterval(() => {
        for (var i in SOCKET_LIST) {
            var socket = SOCKET_LIST[i];
            // console.log(socket.id);
            socket.emit('updatemusic', musics);
        }
    }, 1000 / 25);

}

export default Server;