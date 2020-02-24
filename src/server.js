import socketIO from 'socket.io';
import TypeModel from './models/genre';
import TrackModel from './models/song';

const getTracks = async () => {
    
    const domain = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;

    const musics = {
        albums: [],
        trackNames: [],
        albumArtworks: [],
        trackUrl: []
    };

    let tracks = await TrackModel.find({});
    tracks.forEach((item) => {
        // console.log(item);
        musics.trackNames.push(item.name);
        musics.albums.push(item.artists);
        musics.albumArtworks.push('_1');
        musics.trackUrl.push(domain + '/api/v1/music/play1/'+item.path);
    });

    return musics;
}

const Server = async (httpServer) => {

    const domain = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;

    const musics = {
        albums: [],
        trackNames: [],
        albumArtworks: [],
        trackUrl: []
    };

    let tracks = await TrackModel.find({});
    tracks.forEach((item) => {
        // console.log(item);
        musics.trackNames.push(item.name);
        musics.albums.push(item.artists);
        musics.albumArtworks.push('_1');
        musics.trackUrl.push(domain + '/api/v1/music/play1/'+item.path);
    });

    let io = new socketIO(httpServer);
    let SOCKET_LIST = [];
    let admin = {};

    io.on('connection', async (socket) => {
        // console.log('===========> Time ', new Date());
        // console.log('User connected ID: ', socket.conn.id);
        // console.log('remoteAddress: ', socket.conn.remoteAddress);

        SOCKET_LIST[socket.id] = socket;

        socket.on('message', function (msg) {
            // console.log('message: ' + msg);
            io.emit('message', msg);
        });

        socket.on('disconnect', function () {
            console.log('===========> Time ', new Date());
            console.log('User disconnect');
        });

        socket.on('user', (res) => {
            console.log('===========> Time ', new Date());
            if (res){
                console.log('User connected: ', res.username);
            }
        });

        socket.on('admin', (res) => {
            console.log(res);
            admin = res;
        });

        let types = await TypeModel.find({});
        
        var config = {
            host: process.env.SERVER_HOST,
            port: process.env.SERVER_PORT,
            types: types,
        }

        io.emit('config', config);

    });

    // setInterval(async () => {
    //     for (var i in SOCKET_LIST) {
    //         var socket = SOCKET_LIST[i];
    //         // console.log(socket.id);
    //         const tracks = await getTracks();
    //         socket.emit('update', {
    //             tracks: tracks,
    //             admin: admin
    //         });
    //     }
    // }, 1000 / 25);

}

export default Server;