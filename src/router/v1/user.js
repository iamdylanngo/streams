import { Router } from 'express';
const router = new Router();

import UserModel from '../../models/user';

router.post('/create', async (req, res) => {
    try {
        let user = await new UserModel({
            username: req.body.username,
            password: req.body.password,
            rules: 0,
        });

        user.save(function (err) {
            console.log(err);
        });

        return res.send({
            message: "register successfully",
            data: user
        })
    } catch (err) {
        return res.send({
            message: err,
            data: {}
        })
    }
});

router.post('/login', async (req, res) => {
    try {
       console.log('login');
       console.log(req.body.username);
        const query = await UserModel.find();

        console.log(quey);

        return res.send({
            message: "login successfully",
            data: {}
        });

    } catch (err) {
        return res.send({
            message: err,
            data: {}
        })
    }
});

export default router;