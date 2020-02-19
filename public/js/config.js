var host = 'localhost';
var port = '3001';

socket.on('init', function (msg) {
   host =  msg.host;
   port = msg.port;
});