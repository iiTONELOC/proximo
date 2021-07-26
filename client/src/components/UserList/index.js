import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { io, socket } from "socket.io-client";
import { QUERY_ME } from '../../utils/queries';

const UserList = () => {
    const [socket, setSocket] = useState(false);
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:8080`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    const { error, data, loading } = useQuery(QUERY_ME);

    let users = [
        {
            socketId: 'test',
            username: 'Billy',
            userId: 'test',
        },
        {
            socketId: 'test',
            username: 'Terry',
            userId: 'test',
        },
        {
            socketId: 'test',
            username: 'Willy',
            userId: 'test',
        },
        {
            socketId: 'test',
            username: 'Hilly',
            userId: 'test',
        },
        {
            socketId: 'test',
            username: 'Jilly',
            userId: 'test',
        },
    ];

    //console.log(data.me);

    if (socket) {
        if (data?.me) {
            users.push({
                socketId: socket.id,
                username: data.me.username,
                userId: data.me._id,
            });
        }
    } else {
        console.log(error);
    }

    const userList = users.map((user) => {
        return <div>
            <ul class="mt-3 grid grid-cols-1 gap-5">
                <li class="col-span-1 flex shadow-sm rounded-md">
                    <div class="flex-shrink-0 flex items-center justify-center w-16 bg-green-600 text-white text-sm font-medium rounded-l-md">
                        GA
                    </div>
                    <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div class="flex-1 px-4 py-2 text-sm truncate">
                            <a href="#" class="text-gray-900 font-medium hover:text-gray-600">{user.username}</a>
                            <p class="text-gray-500">16 Members</p>
                        </div>
                        <div class="flex-shrink-0 pr-2">
                            <button class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span class="sr-only">Open options</span>
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>;
    });

    return (
        <div>
            <ul>
                <li>{userList}</li>
            </ul>
        </div>
    );
}

export default UserList;