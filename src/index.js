import express, { Router } from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import { connectMongoDB } from './models/db';
import dotenv from 'dotenv';
import { User, Music, Song, Genre, Image } from './router/v1';
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
// Server(httpServer);

httpServer.listen(process.env.SERVER_PORT, function () {
    console.log('Server listen on port *:' + process.env.SERVER_PORT);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/upload', function (req, res) {
    res.sendFile(__dirname + '/public/upload.html');
});

app.use('/public', express.static('src/public'));

app.use('/api/v1/music', Music);
app.use('/api/v1/user', User);
app.use('/api/v1/song', Song);
app.use('/api/v1/genre', Genre);
app.use('/api/v1/image', Image);

export default Router;