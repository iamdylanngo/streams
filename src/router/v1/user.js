import { Router } from 'express';
const router = new Router();

import UserModel from '../../models/users';

const handlerError = (res, httpCode, message) => res.status(httpCode).json({
    message: message,
    data: {}
});

router.post('/create', async (req, res) => {
    try {

        if (!req.body.username) {
            return handlerError(res, 400, 'username is require.');
        }
        if (!req.body.password) {
            return handlerError(res, 400, 'password is require.');
        }

        let checkUser = await UserModel.findOne({username: new RegExp('^'+req.body.username+'$', "i")});
        if (checkUser) {
            return handlerError(res, 400, 'user is exists');
        }

        let user = await new UserModel({
            username: req.body.username,
            password: req.body.password,
            nickname: req.body.username,
            rules: 0,
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
       
        if (!req.body.username) {
            return handlerError(res, 400, 'username is require.');
        }
        if (!req.body.password) {
            return handlerError(res, 400, 'password is require.');
        }

        let user = await UserModel.findOne({username: new RegExp('^'+req.body.username+'$', "i")});
        if (!user) {
            return handlerError(res, 400, 'user is not exists');
        }

        if (user.password != req.body.password) {
            return handlerError(res, 400, 'password incorrect');
        }

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

export default router;