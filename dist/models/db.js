"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectMongoDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectMongoDB = () => {
  _mongoose.default.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("connected to mongodb");
  }).catch(err => {
    console.log(err);
  });
};

exports.connectMongoDB = connectMongoDB;