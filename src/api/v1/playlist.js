import { Router } from 'express';
import PlaylistModel from '../../models/playlist';

const router = new Router();

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
    message: message,
    data: {}
});

router.post('/create', async (req, res) => {
    try {
        if (!req.body.title) {
            return handlerError(res, 400, 'title is require.');
        }
        if (!req.body.userId) {
            return handlerError(res, 400, 'userId is require.');
        }
        if (!req.body.imagePath) {
            return handlerError(res, 400, 'imagePath is require.');
        }

        let playlist = await new PlaylistModel({
            title: req.body.title,
            userId: req.body.userId,
            imagePath: req.body.imagePath,
        });

        playlist.save((err) => {
            if (err) {
                console.log(err);
            }
        });

        res.status(200).json({
            message: 'Create playlist is successfully',
            data: playlist
        });

    } catch(err) {
        if (err) {
            console.log(err);
            handlerError(res, 500, err);
        }
    }
});

export default router;