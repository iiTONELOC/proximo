import React, { useEffect, useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
import { io } from "socket.io-client";
import MessageForm from '../MessageForm';
import Messages from '../Messages';
import Auth from '../../utils/auth';


// import { QUERY_CHANNELS, QUERY_ME } from '../utils/queries';


const Public = () => {
    const [socket, setSocket] = useState(null);
    const loggedIn = Auth.loggedIn();
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:8080`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    // const onMessage = (content) => {
    //   if (this.selectedUser) {
    //     socket.emit("private message", {
    //       content,
    //       to: this.selectedUser.userID,
    //     });
    //     this.selectedUser.messages.push({
    //       content,
    //       fromSelf: true,
    //     });
    //   }
    // }

    return (

        <>
            {loggedIn && (
                <div className="w-full p-1">
                    {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                    <div className="w-full ">
                        <ul>{socket ? (
                            <li><Messages socket={socket} /></li>
                        ) : `Not connected!`}
                        </ul>
                    </div>
                    <div className="w-full ">
                        {socket ? (
                            <div><MessageForm socket={socket}></MessageForm></div>
                        ) : `Not connected!`}
                    </div>
                </div>
            )}
        </>
    );
};

export default Public;