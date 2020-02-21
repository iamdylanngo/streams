"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _types = _interopRequireDefault(require("./models/types"));

var _tracks = _interopRequireDefault(require("./models/tracks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTracks = async () => {
  const domain = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;
  const musics = {
    albums: [],
    trackNames: [],
    albumArtworks: [],
    trackUrl: []
  };
  let tracks = await _tracks.default.find({});
  tracks.forEach(item => {
    // console.log(item);
    musics.trackNames.push(item.name);
    musics.albums.push(item.artists);
    musics.albumArtworks.push('_1');
    musics.trackUrl.push(domain + '/api/v1/music/play1/' + item.path);
  });
  return musics;
};

const Server = async httpServer => {
  const domain = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;
  const musics = {
    albums: [],
    trackNames: [],
    albumArtworks: [],
    trackUrl: []
  };
  let tracks = await _tracks.default.find({});
  tracks.forEach(item => {
    // console.log(item);
    musics.trackNames.push(item.name);
    musics.albums.push(item.artists);
    musics.albumArtworks.push('_1');
    musics.trackUrl.push(domain + '/api/v1/music/play1/' + item.path);
  });
  let io = new _socket.default(httpServer);
  let SOCKET_LIST = [];
  io.on('connection', async socket => {
    console.log('===========> Time ', new Date());
    console.log('User connected ID: ', socket.conn.id);
    console.log('remoteAddress: ', socket.conn.remoteAddress);
    SOCKET_LIST[socket.id] = socket;
    socket.on('message', function (msg) {
      // console.log('message: ' + msg);
      io.emit('message', msg);
    });
    socket.on('disconnect', function () {
      console.log('===========> Time ', new Date());
      console.log('User disconnect');
    });
    let types = await _types.default.find({});
    var config = {
      host: process.env.SERVER_HOST,
      port: process.env.SERVER_PORT,
      types: types
    };
    io.emit('config', config);
  });
  setInterval(async () => {
    for (var i in SOCKET_LIST) {
      var socket = SOCKET_LIST[i]; // console.log(socket.id);

      const tracks = await getTracks();
      socket.emit('updatemusic', tracks);
    }
  }, 1000 / 25);
};

var _default = Server;
exports.default = _default;