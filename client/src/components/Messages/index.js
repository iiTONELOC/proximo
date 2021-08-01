import React, { useEffect, useState } from 'react';
import CurrentUserCard from './currentUserCard';
import OtherUsersCard from './otherMessageCard';

const Messages = ({ socket, data }) => {
    const [messages, setMessages] = useState([]);

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
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages');

    }, [socket, data]);

    return (
        <>
            <div className="w-full">
                <div className="text-center">
                    <span className="text-2xl p-3 block text-base text-center text-white font-semibold tracking-wide uppercase">
                        Global Chat
                    </span>
                </div>
                <div className="w-full" >
                    {messages && data ?
                        [...Object.values(messages)]
                            .sort((a, b) => a.time - b.time)
                            .map((message) => (
                                message.user.id === data.me._id ?
                                    <CurrentUserCard key={message.value} message={message}></CurrentUserCard>
                                    : <OtherUsersCard key={message.time.toString()} message={message}></OtherUsersCard>
                            )) : `No Messages!`
                    }
                </div>
            </div>
        </>
    );
};

export default Messages;

/* <div key={message.id}

                                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                ><div className=" w-full flex-row justify-start">


                                        <div className="w-1/6 flex-row justify-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className='w-4/6'><p className=" italic text-md font-medium text-black">{message.user.name}</p></span>

                                        </div>
                                        <div className="ml-7 w-full">
                                            <ul className='w-full'>
                                                <li className="ml-5 text-sm text-black w-full">
                                                    <p >{message.value}</p>
                                                </li>
                                                <li className='w-full text-sm text-gray-400 text-right pr-4'>
                                                    {new Date(message.time).toLocaleTimeString()}
                                                </li>
                                            </ul>

                                        </div>
                                    </div>

                                </div> */