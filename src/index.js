import express, { Router } from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import { connectMongoDB } from './models/db';
import dotenv from 'dotenv';
import { User, Music, Song, Genre, Image, Playlist } from './api/v1';
import Server from './server';
import routes from './routes/index';

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

// Configure Express to use EJS templates
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// ---------------------------------------------------------------------------
//                  EXPRESS ROUTES
// ---------------------------------------------------------------------------

app.get('/', routes.index);
app.get('/song/:identifier', routes.song);
app.get('/profile', routes.profile);
app.get('/upload', routes.upload);
app.get('/genre', routes.genre);
app.get('/jwplayer', routes.jwplayer);

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/profile', function (req, res) {
//     res.sendFile(__dirname + '/public/profile.html');
// });

// app.get('/upload', function (req, res) {
//     res.sendFile(__dirname + '/public/upload.html');
// });

// app.get('/genre', function (req, res) {
//     res.sendFile(__dirname + '/public/genre.html');
// });

app.use('/public', express.static('src/public'));
app.use('/image', express.static('upload/img'));

app.use('/api/v1/music', Music);
app.use('/api/v1/user', User);
app.use('/api/v1/song', Song);
app.use('/api/v1/genre', Genre);
app.use('/api/v1/image', Image);
app.use('/api/v1/playlist', Playlist);

export default Router;