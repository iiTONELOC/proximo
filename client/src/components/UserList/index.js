import React, { useEffect, useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
import { io, socket } from "socket.io-client";
// import { QUERY_ME } from '../../utils/queries';


const UserList = ({ data }) => {
    const [socket, setSocket] = useState(false);
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:8080`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    // const { error, data, loading } = useQuery(QUERY_ME);

    return (
        <>
            {data && data.me.UsersInRange && data.me.UsersInRange.map(el => (
                <div key={el.username}>
                    <ul key={el._id} className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 ">
                        <li key={el++} className="col-span-1 flex shadow-sm rounded-md">
                            <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md">
                                {/* MAKE FUNCTION THAT grabs user initials*/}
                                {el ? `PRO` : null}
                            </div>
                            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <a href="#" className="text-gray-900 font-medium hover:text-gray-600">{el.username}</a>
                                    <p className="text-gray-500">{el.online[0] ? `Online` : `Offline`}</p>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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