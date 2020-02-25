import { Router } from 'express';
const router = new Router();

import GenreModel from '../../models/genre';

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
    message: message,
    data: {}
});

router.get('/get', async (req, res) => {
    try {
        let genres = await GenreModel.find({});
        
        res.status(200).json({
            message: 'Get type is complete',
            data: genres
        });

    } catch(err) {
        if (err) {
            handlerError(res, 500, 'Create type error');
        }
    }
});

router.post('/create', async (req, res) => {
    try {

        if (!req.body.title) {
            return handlerError(res, 400, 'title is require.');
        }
        if (!req.body.order) {
            return handlerError(res, 400, 'order is require.');
        }

        let genre = await new GenreModel({
            title: req.body.title,
            order: req.body.order,
        });

        genre.save((err) => {
            if (err) {
                console.log(err);
            }
        });

        res.status(200).json({
            message: 'Create type is complete',
            data: genre
        });

    } catch (err) {
        if (err) {
            handlerError(res, 500, 'Create type error');
        }
    }
});

export default router;