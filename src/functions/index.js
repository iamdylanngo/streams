'use strict';

// ---------------------------------------------------------------------------
//                  GLOBAL VARIABLE DEFINITION
// ---------------------------------------------------------------------------

const crypto = require('crypto');
const fs = require('fs');
const process = require('process');

import SongModel from '../models/song';

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
    message: message,
    data: {}
});

// const HTTPCONF = './site-config/http-server.json';
// const FILEDESC = './model/file-descriptions.json';

// ---------------------------------------------------------------------------
//                  EXPORTED FUNCTIONS
// ---------------------------------------------------------------------------

// exports.getHttpServerConfig = function() {
//   let json = fs.readFileSync(HTTPCONF);
//   return JSON.parse(json);
// };

// exports.getFileDescriptions = function() {
//   let json = fs.readFileSync(FILEDESC);
//   return JSON.parse(json);
// };

exports.getCiphers = function() {
  return crypto.getCiphers();
};

exports.getMemUsage = function() {
  return process.memoryUsage();
};

exports.getUrl = function() {
  return `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
}

exports.songInfo = async function(identifier) {
  try {
    let song = await SongModel.findOne({ musicPath: identifier });
    return song;
  } catch(err) {
    console.log(err);
  }
}
