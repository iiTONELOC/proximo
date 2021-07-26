class ChatAPI {
    // GLOBAL CHAT
    static globalChat(io) {
        let clients = [];

        io.sockets.on('connection', (socket) => {
            clients.push(socket.id);
        });

        socket.onAny((event, ...args) => {
            console.log(event, args);
        });

        socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
        socket.on('private message', (value) => ChatAPI.handleMessage(value, socket, io));
    };

    // METHODS
    static handleMessage(value, socket, io) {
        const message = {
            id: Date.now(),
            user: {
                id: Date.now(),
                name: `TEST USER`
            } || '',
            value,
            time: Date.now()
        };
        ChatAPI.sendMessage(message, io);
    }
    static sendMessage(message, io) {
        io.sockets.emit('message', message);
    }
}

module.exports = ChatAPI;