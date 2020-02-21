"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _tracks = _interopRequireDefault(require("../../models/tracks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
  message: message,
  data: {}
});

router.post('/create', async (req, res) => {
  try {
    if (!req.body.name) {
      return handlerError(res, 400, 'name is require.');
    }

    if (!req.body.artists) {
      return handlerError(res, 400, 'artists is require.');
    }

    if (!req.body.user_id) {
      return handlerError(res, 400, 'user_id is require.');
    }

    if (!req.body.path) {
      return handlerError(res, 400, 'path is require.');
    }

    let track = await new _tracks.default({
      name: req.body.name,
      artists: req.body.artists,
      user_id: req.body.user_id,
      path: req.body.path
    });
    track.save(err => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json({
      message: 'Create track is complete',
      data: track
    });
  } catch (err) {
    if (err) {
      handlerError(res, 500, 'Create track error');
    }
  }
});
var _default = router;
exports.default = _default;