const express = require('../server/node_modules/express');
const CHATPORT = process.env.CHATPORT || 8080
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const NetAddress = require('./utils/network');
const chat = require('./utils/chat-handler')
const server = require('http').createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
app.use(cors())

const ChatServer = () => {
    server.listen(CHATPORT, () => {

        console.log(`Chat Server connected @ http://localhost:${CHATPORT}\nOr on your network: http://${NetAddress()}:${CHATPORT} `)
        chat(io)

    });
}

module.exports = ChatServer;