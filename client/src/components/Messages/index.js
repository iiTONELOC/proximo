import React, { useEffect, useState } from 'react';


const Messages = ({ socket, data }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const messageListener = (message) => {
            console.log(message, "HERE")
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
        <>
            <div className="w-full">
                <div className="text-center">
                    <span className="text-2xl p-3 block text-base text-center text-white font-semibold tracking-wide uppercase">
                        Global Chat
                    </span>
                </div>
                <div className="w-full">
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
                                            <span className="user pl-7 pr-4 font-medium text-white">{message.user.name}</span>
                                            <span className="date font-medium text-white text-opacity-50">Today at: {new Date(message.time).toLocaleTimeString()}</span>
                                        </div>
                                        <span className="message pl-7 font-md text-white">{message.value}</span>
                                    </div>
                                </div>
                            )) : `No Messages!`
                    }
                </div>
            </div>
        </>
    );
};

export default Messages;