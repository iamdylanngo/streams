"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const TrackSchema = new Schema({
  name: String,
  artists: String,
  user_id: String,
  path: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
TrackSchema.plugin(_mongoosePaginateV.default);

var _default = _mongoose.default.model('tracks', TrackSchema);

exports.default = _default;