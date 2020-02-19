"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();
router.get('/play/:key', async (req, res) => {
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
router.get('/get-config', async (req, res) => {
  try {
    return res.status(200).json({
      message: "getconfig",
      data: {
        url: process.env.SERVER_HOST + ':' + process.env.SERVER_PORT
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
      data: {}
    });
  }
});
var _default = router;
exports.default = _default;