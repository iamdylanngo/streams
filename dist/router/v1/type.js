"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _types = _interopRequireDefault(require("../../models/types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
  message: message,
  data: {}
});

router.get('/get', async (req, res) => {
  try {
    let types = await _types.default.find({});
    res.status(200).json({
      message: 'Get type is complete',
      data: types
    });
  } catch (err) {
    if (err) {
      handlerError(res, 500, 'Create type error');
    }
  }
});
router.post('/create', async (req, res) => {
  try {
    if (!req.body.name) {
      return handlerError(res, 400, 'name is require.');
    }

    if (!req.body.id) {
      return handlerError(res, 400, 'id is require.');
    }

    let type = await new _types.default({
      name: req.body.name,
      id: req.body.id
    });
    type.save(err => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json({
      message: 'Create type is complete',
      data: type
    });
  } catch (err) {
    if (err) {
      handlerError(res, 500, 'Create type error');
    }
  }
});
var _default = router;
exports.default = _default;