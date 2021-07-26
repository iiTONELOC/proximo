import React, { useEffect, useState } from 'react';


const Messages = ({ socket }) => {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket.on('message', messageListener);
        socket.on('messagePublic', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
            socket.off('messagePublic', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);
    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-light">Global Chat</span>
            </div>
            <div className="card-body">
                {messages ?
                    [...Object.values(messages)]
                        .sort((a, b) => a.time - b.time)
                        .map((message) => (
                            <div
                                key={message.id}
                                className="message-container"
                                title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                            >
                                <span className="user">{message.user.name}:</span>
                                <span className="message">{message.value}</span>
                                <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
                            </div>
                        )) : `No Messages!`
                }
            </div>
        </div>
    );
};

export default Messages;