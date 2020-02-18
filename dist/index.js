"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _fs = _interopRequireDefault(require("fs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("./models/user"));

var _v = require("./router/v1");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let app = (0, _express.default)();

let httpServer = _http.default.createServer(app);

let io = new _socket.default(httpServer);
app.use(_bodyParser.default.json()); // support json encoded bodies

app.use(_bodyParser.default.urlencoded({
  extended: true
})); // support encoded bodies

// Connect to MongoDB:
const USER = 'admin';
const PWD = '123456';
const MONGODB_HOST = 'localhost';
const MONGODB_PORT = '27017';
const MONGODB_DATABASE = 'streams';

const db = _mongoose.default.connect(`mongodb://${USER}:${PWD}@${MONGODB_HOST}:${MONGODB_PORT}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("connected to DB");
}).catch(err => {
  console.log(err);
});

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
httpServer.listen(3000, function () {
  console.log('Listen on *:3000');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use('/public', _express.default.static('public'));
app.get('/api/play/:key', function (req, res) {
  let key = req.params.key;
  let music = 'music/' + key + '.mp3';

  let stat = _fs.default.statSync(music);

  let range = req.headers.range;
  let readStream;

  if (range !== undefined) {
    let parts = range.replace(/bytes=/, "").split("-");
    let partial_start = parts[0];
    let partial_end = parts[1];

    if (isNaN(partial_start) && partial_start.length > 1 || isNaN(partial_end) && partial_end.length > 1) {
      return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
    }

    let start = parseInt(partial_start, 10);
    let end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
    let content_length = end - start + 1;
    res.status(206).header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': content_length,
      'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
    });
    readStream = _fs.default.createReadStream(music, {
      start: start,
      end: end
    });
  } else {
    res.header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    });
    readStream = _fs.default.createReadStream(music);
  }

  readStream.pipe(res);
});
app.post('/api/login', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.loh(username);
  console.loh(password);
});
app.post('/api/register', async (req, res) => {
  try {
    let user = await new _user.default({
      username: req.body.username,
      password: req.body.password,
      rules: 0
    });
    user.save(function (err) {
      console.log(err);
    });
    return res.send({
      message: "register successfully",
      data: user
    });
  } catch (err) {
    return res.send({
      message: err,
      data: {}
    });
  }
});
app.use('/api/user', _v.User);
var _default = _express.Router;
exports.default = _default;