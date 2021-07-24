//do we need to create a new server??
    const socket = require("socket.io");
    const io = socket(server);

    let users = [];

    const messages = {
        general: [],
        random: [],
        jokes: [],
        javascript: []
    };

    // private CHAT and ROOM
    io.on("connection", socket => {
        socket.on('join server', (username) => {
            const user = {
                username,
                id: socket.id,
            };
            users.push(user);
            io.emit("new user", users);
        });

        socket.on("join room",(roomName, cb) => {
            socket.join(roomName);
            cb(messages[roomName]);
        });
        console.log(users);
    });

    socket.on("send message", ({content, to, sender, chatName, isChannel}) => {
        if (isChannel) {
            const payload = {
                content,
                chatName,
                sender,
            };
            socket.to(to).emit("new message", payload);
        } else {
            const payload = {
                content,
                chatName: sender,
                sender
            };
            socket.to(to).emit('new message', payload);
        }
        if (messages[chatName]) {
            messages[chatName].push({
                sender,
                content
            });
        }
    });

//need a disconnect .on