import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { ConvertString } from '../../common/convertstring';

const router = new Router();

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

router.get('/play/:track', async (req, res) => {
    try {

        let track = req.params.track;
        let music = 'upload/music/' + track;
        let stat = fs.statSync(music);
        let range = req.headers.range;
        let readStream;

        if (range !== undefined) {
            let parts = range.replace(/bytes=/, "").split("-");

            let partial_start = parts[0];
            let partial_end = parts[1];

            if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
                return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
            }

            let start = parseInt(partial_start, 10);
            let end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
            let content_length = (end - start) + 1;

            res.status(206).header({
                'Content-Type': 'audio/mpeg',
                'Content-Length': content_length,
                'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
            });

            readStream = fs.createReadStream(music, { start: start, end: end });
        } else {
            res.header({
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
            readStream = fs.createReadStream(music);
        }
        readStream.pipe(res);
    } catch (err) {
        res.status(500).json({
            message: 'song invalid',
            data:{}
        })
    }
});

let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "upload/music");
    },
    filename: (req, file, callback) => {
        console.log(file.mimetype);
        let math = ["audio/mpeg3", "audio/x-mpeg-3", "audio/mp3", "audio/mpeg"];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload mp3.`;
            return callback(errorMess, null);
        }
        let filename = `${Date.now()}-${ConvertString(file.originalname)}`;
        callback(null, filename);
    }
});

let uploadFile = multer({
    storage: diskStorage,
    limits: {
        fieldSize: 15728640
    }
}).single("file");

router.post('/upload', async (req, res) => {
    uploadFile(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }
        // var dirName = path.normalize(__dirname+`/../../../upload/song/music/${req.file.filename}`);
        res.status(200).json({
            message: 'Upload is successfully',
            data: {
                filename: req.file.filename
            }
        });
    });
});

export default router;