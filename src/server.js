import socketIO from 'socket.io';

const Server = (httpServer) => {
    let io = new socketIO(httpServer);
    
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
}

export default Server;