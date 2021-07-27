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
                <span className="text-2xl p-3 block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                    Global Chat
                </span>
            </div>
            <div className="card-body">
                {messages ?
                    [...Object.values(messages)]
                        .sort((a, b) => a.time - b.time)
                        .map((message) => (
                            <div
                                key={message.id}
                                className="message-container flex justify-start"
                                title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                            >
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        <span className="user pl-7 pr-4 font-medium text-indigo-600">{message.user.name}</span>
                                        <span className="date font-medium text-indigo-600 text-opacity-50">Today at: {new Date(message.time).toLocaleTimeString()}</span>
                                    </div>
                                    <span className="message pl-7 font-md text-indigo-600">{message.value}</span>
                                </div>
                            </div>
                        )) : `No Messages!`
                }
            </div>
        </div>
    );
};

export default Messages;