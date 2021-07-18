const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const chatApp = express();
const chatServer = require('http').createServer(chatApp);
const io = socketIo(chatServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
chatApp.use(cors())

const CHAT = () => {
    chatServer.listen(8080, () => {
        io.on('connection', (socket) => {
            socket.emit('message', 'TEST MESSAGE');
            console.log(socket)
        });
    });
}

module.exports = CHAT;