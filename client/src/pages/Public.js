import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { io } from "socket.io-client";
import MessageForm from '../components/MessageForm';
import Messages from '../components/Messages';
import Auth from '../utils/auth';
import UserList from '../components/UserList';

import { QUERY_CHANNELS, QUERY_ME } from '../utils/queries';
import Header from '../components/Header'

const Public = () => {
  const [socket, setSocket] = useState(null);
  const loggedIn = Auth.loggedIn();
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const onMessage = (content) => {
    if (this.selectedUser) {
      socket.emit("private message", {
        content,
        to: this.selectedUser.userID,
      });
      this.selectedUser.messages.push({
        content,
        fromSelf: true,
      });
    }
  }

  return (
    <main>
      <Header />
      <UserList />
        {loggedIn && (<div className="flex-row justify-space-between">
          <h1>**THIS IS A TEST ** Global Chat</h1>

          {socket ? (<div><Messages socket={socket} />
            <MessageForm socket={socket}>  </MessageForm></div>) : `Not connected!`}
        </div>)}
    </main>
  );
};

export default Public;