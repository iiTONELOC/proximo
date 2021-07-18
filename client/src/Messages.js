import React, { useEffect, useState } from 'react';


function Messages({ socket }) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            setMessages(message)
        };


        socket.on('message', messageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
        };
    }, [socket]);

    return (
        <div className="message-list">
            {console.log(messages)}
        </div>
    );
}

export default Messages;