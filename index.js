const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    let address = socket.handshake.address;
    let id = socket.id;
    console.log(address);
    console.log(id);

    console.log('a user connected from ' + address.address + ':' + address.port);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('sendMsg', (msg) => {
        console.log('message: ' + msg);
       io.emit("getMsg", msg);
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});