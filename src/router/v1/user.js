import { Router } from 'express';
import UserModel from '../../models/user';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { ConvertString } from '../../common/convertstring';

const router = new Router();

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
    message: message,
    data: {}
});

router.post('/create', async (req, res) => {
    try {

        if (!req.body.email) {
            return handlerError(res, 400, 'email is require.');
        }
        if (!req.body.password) {
            return handlerError(res, 400, 'password is require.');
        }
        if (!req.body.name) {
            return handlerError(res, 400, 'name is require.');
        }

        let checkUser = await UserModel.findOne({ email: new RegExp('^' + req.body.email + '$', "i") });
        if (checkUser) {
            return handlerError(res, 400, 'user is exists');
        }

        const passwordHash = crypto.createHash('md5').update(req.body.password).digest("hex");

        let user = await new UserModel({
            email: req.body.email,
            password: passwordHash,
            name: req.body.name,
            rules: 0,
            imagePath: req.body.imagePath ?? '',
        });

        user.save(function (err) {
            if (err) {
                console.log(err);
            }
        });

        return res.status(200).json({
            message: "register successfully",
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
            data: {}
        })
    }
});

router.post('/login', async (req, res) => {
    try {

        if (!req.body.email) {
            return handlerError(res, 400, 'email is require.');
        }
        if (!req.body.password) {
            return handlerError(res, 400, 'password is require.');
        }

        let user = await UserModel.findOne({ email: new RegExp('^' + req.body.email + '$', "i") });
        if (!user) {
            return handlerError(res, 400, 'user is not exists');
        }

        const passwordHash = crypto.createHash('md5').update(req.body.password).digest("hex");

        if (user.password != passwordHash) {
            return handlerError(res, 400, 'password incorrect');
        }

        const host = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;
        user.password = '';
        user.imagePath = host + '/image/user/' + user.imagePath;
        return res.status(200).json({
            message: "login successfully",
            data: user
        });

    } catch (err) {
        return res.status(500).json({
            message: err,
            data: {}
        })
    }
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/img');
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

router.post('/upload/:id', async (req, res) => {
    console.log(req.params.id);
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
                path.resolve(req.file.destination, 'user', image)
            );

        fs.unlinkSync(req.file.path);

        // update avatar
        let doc = await UserModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                imagePath: req.file.filename
            },
            {
                new: true,
                upsert: true
            }
        );

        if (!doc) {
            return handlerError(res, 500, 'Save imagePath is fail');
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