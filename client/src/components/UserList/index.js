import React, { useEffect, useState } from 'react';
import { useQuery /* , useMutation */ } from '@apollo/client';
// import { io, socket } from "socket.io-client";
import { QUERY_ME } from '../../utils/queries';


const UserList = ({ socket }) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const { data, loading } = useQuery(QUERY_ME);
    useEffect(() => {
        const activeUserListener = async (user) => {
            // list of all users available to this user, online or not
            const usersInMyRange = data.me.UsersInRange;
            // currently the me query only updates on page reload
            // list of all the users currently online for that user
            // were gonna add this to a new object
            const active = usersInMyRange.map(el => {
                if (el.online[0] === true) {
                    return el
                } else {
                    return null
                }
            }).filter(el => el !== null);
            // when a new user signs on
            // check user against usersInMyRange to see if we should show user info
            const newUser = user.username;
            const canShow = usersInMyRange.filter(el => el.username === newUser);
            console.log('HERE', usersInMyRange)
            // create a new object to return will all our active users
            const allActiveUsersInRange = Object.assign(active, canShow);
            // add active users to state
            setActiveUsers(allActiveUsersInRange);
        }
        // sometimes the socket is null while awaiting the connection
        // optional chain will prevent the undefined error
        socket?.on('activeUser', activeUserListener);


        // return () => {
        //     socket.off('message', messageListener);
        //     socket.off('deleteMessage', deleteMessageListener);
        // };
    }, [socket, data]);

    while (socket?.length === 0) {
        return <h1 className='p-1 text-red-500'>No active users!</h1>
    }
    if (loading) {
        return <h1>Loading please wait...</h1>
    }

    return (
        <>
            {activeUsers.length > 0 && activeUsers.map((el, idx) => (
                <div key={idx}>
                    <ul key={el._id} className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 ">
                        <li key={el++} className="col-span-1 flex shadow-sm rounded-md">
                            <div key={Date.now()} className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md">
                                {/* MAKE FUNCTION THAT grabs user initials*/}
                                {el ? `PRO` : null}
                            </div>
                            <div key={el + idx} className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div key={el.username + idx} className="flex-1 px-4 py-2 text-sm truncate">
                                    <a key={`link` + idx} href="/" className="text-gray-900 font-medium hover:text-gray-600">{el.username}</a>
                                    {/* <p key={el.username} className="text-gray-500">{el.online[0] ? `Online` : `Offline`}</p> */}
                                </div>
                                <div key={idx + idx} className="flex-shrink-0 pr-2">
                                    <button key={'button' + el.name + idx} className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">{el ? `Open options` : null}</span>
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            ))}
        </>
    );
}

export default UserList;