"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = require("./models/db");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _v = require("./router/v1");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let app = (0, _express.default)();

let httpServer = _http.default.createServer(app); // let io = new socketIO(httpServer);


app.use(_bodyParser.default.json()); // support json encoded bodies

app.use(_bodyParser.default.urlencoded({
  extended: true
})); // support encoded bodies
// get configuration .env

_dotenv.default.config(); // connect mongodb


(0, _db.connectMongoDB)(); // instance server

(0, _server.default)(httpServer);
httpServer.listen(process.env.SERVER_PORT, function () {
  console.log('Listen on *:' + process.env.SERVER_PORT);
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/music.html');
});
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});
app.use('/public', _express.default.static('public'));
app.use('/api/v1/user', _v.User);
app.use('/api/v1/music', _v.Music);
var _default = _express.Router;
exports.default = _default;