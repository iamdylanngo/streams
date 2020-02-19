"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
  message: message,
  data: {}
});

router.post('/create', async (req, res) => {
  try {
    if (!req.body.username) {
      return handlerError(res, 400, 'username is require.');
    }

    if (!req.body.password) {
      return handlerError(res, 400, 'password is require.');
    }

    let checkUser = await _user.default.findOne({
      username: new RegExp('^' + req.body.username + '$', "i")
    });

    if (checkUser) {
      return handlerError(res, 400, 'user is exists');
    }

    let user = await new _user.default({
      username: req.body.username,
      password: req.body.password,
      nickname: req.body.username,
      rules: 0
    });
    user.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res.status(200).json({
      message: "register successfully",
      data: user
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
      data: {}
    });
  }
});
router.post('/login', async (req, res) => {
  try {
    if (!req.body.username) {
      return handlerError(res, 400, 'username is require.');
    }

    if (!req.body.password) {
      return handlerError(res, 400, 'password is require.');
    }

    let user = await _user.default.findOne({
      username: new RegExp('^' + req.body.username + '$', "i")
    });

    if (!user) {
      return handlerError(res, 400, 'user is not exists');
    }

    if (user.password != req.body.password) {
      return handlerError(res, 400, 'password incorrect');
    }

    return res.status(200).json({
      message: "login successfully",
      data: user
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