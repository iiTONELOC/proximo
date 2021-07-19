const express = require('express');
const CHATPORT = process.env.CHATPORT || 8080
const socketIo = require('socket.io');
const cors = require('cors');
const chatApp = express();
const server = require('http').createServer(chatApp);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
chatApp.use(cors())

const ChatServer = () => {
    server.listen(CHATPORT, () => {
        console.log('Chat Server is active on port ' + CHATPORT)
        io.on('connection', (socket) => {
            socket.emit('message', 'TEST MESSAGE');
            // console.log(socket)
        });
    });
}

module.exports = ChatServer;