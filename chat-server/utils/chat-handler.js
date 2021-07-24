
class ChatAPI {
    // GLOBAL CHAT
    static globalChat(io) {
        let clients = [];

        io.on('connection', (socket) => {
            console.log(socket);
            clients.push({id: socket.id});
            console.log(clients);
            socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
        });
    };

    //PUBLIC CHAT
    static publicChat(io) {
        socket.on('create', (room) => {
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