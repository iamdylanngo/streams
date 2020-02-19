"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _multer = _interopRequireDefault(require("multer"));

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

function ConvertString(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  str = str.replace(/\s+/g, '-');
  return str;
}

let diskStorage = _multer.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpeg", "audio/mpeg3", "audio/x-mpeg-3", "audio/mp3"];
    console.log(file.mimetype);

    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }

    let filename = `${Date.now()}-${ConvertString(file.originalname)}`;
    callback(null, filename);
  }
});

let uploadFile = (0, _multer.default)({
  storage: diskStorage
}).single("file");
router.post('/upload', async (req, res) => {
  uploadFile(req, res, err => {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }

    res.sendFile(_path.default.join(`${__dirname}/uploads/${req.file.filename}`));
  });
});
var _default = router;
exports.default = _default;