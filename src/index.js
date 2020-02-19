import express, { Router } from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import { connectMongoDB } from './models/db';
import dotenv from 'dotenv';
import { User, Music } from './router/v1';
import Server from './server';

let app = express();
let httpServer = http.createServer(app);
// let io = new socketIO(httpServer);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// get configuration .env
dotenv.config();
// connect mongodb
connectMongoDB();
// instance server
Server(httpServer);

httpServer.listen(process.env.SERVER_PORT, function () {
    console.log('Listen on *:' + process.env.SERVER_PORT);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/music.html');
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get('/upload', function (req, res) {
    res.sendFile(__dirname + '/upload.html');
});

app.use('/public', express.static('public'));

app.use('/api/v1/user', User);
app.use('/api/v1/music', Music);

export default Router;