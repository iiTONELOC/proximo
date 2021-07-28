const express = require('../server/node_modules/express');
const CHATPORT = process.env.PORT || 3000
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const NetAddress = require('./utils/network');
const ChatAPI = require('./utils/chat-handler')
const server = require('http').createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

app.use(cors())
app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
const ChatServer = () => {
    server.listen(CHATPORT, () => {
        console.log(`Chat Server connected @ http://localhost:${CHATPORT}\nOr on your network: http://${NetAddress()}:${CHATPORT} `)
        // GLOBAL CHAT
        ChatAPI.globalChat(io);
    });
}

module.exports = ChatServer;