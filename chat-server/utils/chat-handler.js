class ChatAPI {
    // GLOBAL CHAT
    static globalChat(io) {
        io.on('connection', (socket) => {
            socket.on('loggedIn', (user) => ChatAPI.handleUserLogin(user, io));
            socket.on('loggingOut', (_id) => ChatAPI.handleLogOut(_id, io))
            socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
            socket.on('private message', (value) => ChatAPI.handlePrivateMessage(value, socket, io));
            // socket.once('disconnect', () => ChatAPI.handleDisconnect(socket, io));
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
    static handleUserLogin(user, io) {
        // grab logged in user info,
        // find users in range
        //  emit to that socket only
        io.sockets.emit('activeUser', user)
    }
    static handleLogOut(_id, io,) {
        io.sockets.emit('inactiveUser', _id);
    }
    // static handleDisconnect(socket, io) {
    //     console.log(socket.user)
    // }
}

module.exports = ChatAPI;