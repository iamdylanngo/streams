import { Router } from 'express';
import UserModel from '../../models/user';
import crypto from 'crypto';

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

        let checkUser = await UserModel.findOne({email: new RegExp('^'+req.body.email+'$', "i")});
        if (checkUser) {
            return handlerError(res, 400, 'user is exists');
        }

        const passwordHash = crypto.createHash('md5').update(req.body.password).digest("hex");

        let user = await new UserModel({
            email: req.body.email,
            password: passwordHash,
            name: req.body.name,
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
       
        if (!req.body.email) {
            return handlerError(res, 400, 'email is require.');
        }
        if (!req.body.password) {
            return handlerError(res, 400, 'password is require.');
        }

        let user = await UserModel.findOne({email: new RegExp('^'+req.body.email+'$', "i")});
        if (!user) {
            return handlerError(res, 400, 'user is not exists');
        }

        const passwordHash = crypto.createHash('md5').update(req.body.password).digest("hex");

        if (user.password != passwordHash) {
            return handlerError(res, 400, 'password incorrect');
        }

        return res.status(200).json({
            message: "login successfully",
            data: {...user, password: ''}
        });

    } catch (err) {
        return res.status(500).json({
            message: err,
            data: {}
        })
    }
});

export default router;