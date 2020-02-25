import { Router } from 'express';
import multer from 'multer';
import { ConvertString } from '../../common/convertstring';
const router = new Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/song/imgs');
    },
    filename: function (req, file, callback) {
        let math = ["image/x-png","image/gif","image/jpeg"];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image.`;
            return callback(errorMess, null);
        }
        let filename = `${Date.now()}-${ConvertString(file.originalname)}`;
        callback(null, filename);
    }
});

var upload = multer({ storage: storage }).single('file');

router.post('/upload', async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).json({
                message: 'upload is fail'
            });
        }

        res.status(200).json({
            message: 'upload is successfully',
            data: {
                filename: req.file.filename
            }
        });

    });
});

export default router;