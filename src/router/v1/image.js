import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { ConvertString } from '../../common/convertstring';

const router = new Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/song/imgs');
    },
    filename: function (req, file, callback) {
        let math = ["image/x-png", "image/png", "image/gif", "image/jpeg"];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image.`;
            return callback(errorMess, null);
        }
        let filename = `${Date.now()}-${ConvertString(file.originalname)}`;
        callback(null, filename);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1048576
    }
}).single('file');

router.post('/upload', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }
        const { filename: image } = req.file
        // console.log(req.file);

        await sharp(req.file.path)
            .resize(240, 240)
            .toFormat("jpeg")
            .jpeg({ quality: 50 })
            .toFile(
                path.resolve(req.file.destination, 'resizes', image)
            );

        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: 'upload is successfully',
            data: {
                filename: req.file.filename
            }
        });

    });
});

export default router;