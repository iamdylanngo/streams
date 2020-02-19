"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Server = httpServer => {
  let io = new _socket.default(httpServer);
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
};

var _default = Server;
exports.default = _default;