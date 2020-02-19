"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();
router.post('/create', async (req, res) => {
  try {
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
router.post('/login', async (req, res) => {
  try {
    console.log('login');
    console.log(req.body.username);
    const query = await _user.default.find();
    console.log(quey);
    return res.send({
      message: "login successfully",
      data: {}
    });
  } catch (err) {
    return res.send({
      message: err,
      data: {}
    });
  }
});
var _default = router;
exports.default = _default;