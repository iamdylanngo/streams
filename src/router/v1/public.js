import express, { Router } from 'express';
const router = new Router();

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.use('/public', express.static('public'));

export default router;