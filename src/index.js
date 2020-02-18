import express, { Router } from 'express';
import http from 'http';
import socketIO from 'socket.io';
import fs from 'fs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

let app = express();
let httpServer = http.createServer(app);
let io = new socketIO(httpServer);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

import UserModel from './models/user';
import { User } from './router/v1';

// Connect to MongoDB:
const USER = 'admin';
const PWD = '123456';
const MONGODB_HOST = 'localhost';
const MONGODB_PORT = '27017';
const MONGODB_DATABASE = 'streams';
const db = mongoose.connect(
    `mongodb://${USER}:${PWD}@${MONGODB_HOST}:${MONGODB_PORT}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});


io.on('connection', function (socket) {
    console.log('A User connected');
    console.log('ID: ', socket.conn.id);
    console.log('remoteAddress', socket.conn.remoteAddress);

    socket.on('message', function (msg) {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', function () {
        console.log('User disconnect');
    });
});

httpServer.listen(3000, function () {
    console.log('Listen on *:3000');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static('public'));

app.get('/api/play/:key', function (req, res) {
    let key = req.params.key;
    let music = 'music/' + key + '.mp3';
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

});

app.post('/api/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.loh(username);
    console.loh(password);
});

app.post('/api/register', async (req, res) => {
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

app.use('/api/user', User);

export default Router;