'use strict';

// ---------------------------------------------------------------------------
//                  GLOBAL VARIABLE DEFINITION
// ---------------------------------------------------------------------------

const f = require('../functions');

// ---------------------------------------------------------------------------
//                  EXPORTED FUNCTIONS
// ---------------------------------------------------------------------------

exports.song = function (req, res) {
  let title = 'Play song';
  let o = {
    // directoryData: f.getFileDescriptions(),
    supportedCiphers: f.getCiphers(),
  };
  // The o object is handed over to EJS with the key/name 'esjObj'
  res.render('song.ejs', { title: title });
};

exports.index = function (req, res) {
  let title = 'Music | Home';
  const url = f.getUrl();
  res.render('index.ejs', { title: title, url: url });
}

exports.song = async function (req, res) {
  const song = await f.songInfo(req.params.identifier);
  const url = f.getUrl();
  console.log(song);
  console.log(url);
  res.render('song.ejs', { song : song, url: url });
}

exports.profile = function (req, res) {
  let title = 'Music | Profile';
  const url = f.getUrl();
  res.render('profile.ejs', { title: title, url: url });
}

exports.upload = function (req, res) {
  let title = 'Music | Upload';
  const url = f.getUrl();
  res.render('upload.ejs', { title: title, url: url });
}

exports.genre = function (req, res) {
  let title = 'Music | Genre';
  const url = f.getUrl();
  res.render('genre.ejs', { title: title, url: url });
}

exports.jwplayer = function (req, res) {
  let title = 'Music | Genre';
  const url = f.getUrl();
  res.render('jwplayer.ejs', { title: title, url: url });
}

exports.helloJson = function (req, res) {
  let o = {
    memUseInBytes: f.getMemUsage(),
  };
  res.json(o);
};
