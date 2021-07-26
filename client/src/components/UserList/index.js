import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { io, socket } from "socket.io-client";
import { QUERY_ME_BASIC } from '../../utils/queries';

const UserList = () => {
    const [socket, setSocket] = useState(false);
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:8080`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    const { error, data } = useQuery(QUERY_ME_BASIC);

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
        }
    ];

    if(socket) {
        users.push({
            socketId: socket.id,
            username: data.me.username,
            userId: data.me._id,
        });
    } else {
        console.log(error);
    }

    const userList = users.map((user) => {
        return user.username;
    });

    return (
        <div>
            <div>
                <ul>
                    <li>{userList}</li>
                </ul>
            </div>
        </div>
    );
}

export default UserList;