class ChatAPI {
    // GLOBAL CHAT
    static globalChat(io) {
        io.on('connection', (socket) => {
            // console.log('NEW CONNECTION', socket)
            socket.on('message', (value) => ChatAPI.handleMessage(value, socket, io));
            socket.on('private message', (value) => ChatAPI.handleMessage(value, socket, io));
        });
    };

    // METHODS
    static handleMessage(value, socket, io) {

        // const message = {
        //     id: Date.now(),
        //     user: {
        //         id: Date.now(),
        //         name: `TEST USER`
        //     } || '',
        //     value,
        //     time: Date.now()
        // };
        // 

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
    static sendMessage(message, io) {
        console.log('new message', message);
        console.log('new msg socket info', io)
        io.sockets.emit('message', message);
    }
}

module.exports = ChatAPI;