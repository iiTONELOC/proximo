import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import MessageForm from '../components/MessageForm';
import Messages from '../components/Messages';
import Auth from '../utils/auth';
const Home = () => {
  const [socket, setSocket] = useState(null);
  const loggedIn = Auth.loggedIn();
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <main>
      {loggedIn && (<div className="flex-row justify-space-between">
        <h1>Global Chat</h1>

        {socket ? (<div><Messages socket={socket} />
          <MessageForm socket={socket}>  </MessageForm></div>) : `Not connected!`}

      </div>)}
    </main>
  );
};

export default Home;
