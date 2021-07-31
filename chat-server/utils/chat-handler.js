class ChatAPI {
    // GLOBAL CHAT
    static globalChat(io) {
        io.on('connection', (socket) => {
            socket.on('loggedIn', (user) => ChatAPI.handleUserLogin(user, socket, io));
            socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
            socket.on('private message', (value) => ChatAPI.handlePrivateMessage(value, socket, io));
        });
    };

    // METHODS
    static handleMessage(value, socket, io) {

        const message = {
            id: Date.now(),
            user: {
                id: value.id,
                name: value.username
            },
            value: value.value,
            time: Date.now()
        }
        ChatAPI.sendMessage(message, io);
    }
    static handlePrivateMessage(value, io) {
        console.log(value)
    }
    static sendMessage(message, io) {
        io.sockets.emit('message', message);
    }
    static handleUserLogin(user, socket, io) {
        // grab logged in user info,
        // find users in range
        //  emit to that socket only
        io.sockets.emit('activeUser', user)
    }
}

module.exports = ChatAPI;