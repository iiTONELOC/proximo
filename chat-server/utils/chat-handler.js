class ChatAPI {
    // GLOBAL CHAT
    static globalChat(io) {
        let clients = [];
        console.log(clients);

        io.on('connection', (socket) => {
            clients.push({
                socket: socket.id
            });
            socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
        });
    };

    //PUBLIC CHAT
    static publicChat(io) {
        socket.on('createPublic', (room) => {
            socket.join(room);
            socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
        });
    };

    //PRIVATE CHAT
    static privateChat(io) {
        socket.on('createPrivate', (room) => {
            socket.join(room);
            socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
        });
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