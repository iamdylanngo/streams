import { Router } from 'express';
const router = new Router();

import SongModel from '../../models/song';

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
    message: message,
    data: {}
});

router.post('/create', async (req, res) => {
    try {
        if (!req.body.title) {
            return handlerError(res, 400, 'title is require.');
        }
        if (!req.body.artist) {
            return handlerError(res, 400, 'artist is require.');
        }
        if (!req.body.genreId) {
            return handlerError(res, 400, 'genreId is require.');
        }
        if (!req.body.userId) {
            return handlerError(res, 400, 'userId is require.');
        }
        if (!req.body.musicPath) {
            return handlerError(res, 400, 'musicPath is require.');
        }
        if (!req.body.imagePath) {
            return handlerError(res, 400, 'imagePath is require.');
        }

        let song = await new SongModel({
            title: req.body.title.trim(),
            artist: req.body.artist.trim(),
            genreId: req.body.genreId,
            userId: req.body.userId,
            length: req.body.length,
            musicPath: req.body.musicPath,
            imagePath: req.body.imagePath,
            public: false
        });

        song.save((err) => {
            if (err) {
                console.log(err);
            }
        });

        res.status(200).json({
            message: 'Create track is successfully',
            data: song
        });

    } catch(err) {
        if (err) {
            handlerError(res, 500, 'Create track is fail');
        }
    }
});

router.get('/get', async (req, res) => {
    try {
        let songs = await SongModel.find({});
        if (songs) {
            const host = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;
            songs = songs.map(item => {
                return {
                    _id: item._id,
                    title: item.title,
                    artist: item.artist,
                    genreId: item.genreId,
                    userId: item.userId,
                    imagePath: host + '/image/music/'+ item.imagePath,
                    musicPath: host + '/api/v1/music/play/' + item.musicPath,
                };
            });
            res.status(200).json({
                message: 'get songs is successfully',
                data: songs
            });
        } else {
            res.status(500).json({
                message: 'get songs is fail',
                data: {}
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err,
            data: {}
        });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const identifier = req.params.id;
        let song = await SongModel.findOne({ _id: identifier });
        if (song) {
            const host = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;
            let songResult = {
                _id: song._id,
                title: song.title,
                artist: song.artist,
                genreId: song.genreId,
                userId: song.userId,
                imagePath: host + '/image/music/'+ song.imagePath,
                musicPath: host + '/api/v1/music/play/' + song.musicPath,
            };
            res.status(200).json({
                message: 'get songs is successfully',
                data: songResult
            });
        } else {
            res.status(500).json({
                message: 'get songs is fail',
                data: {}
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err,
            data: {}
        });
    }
});

export default router;