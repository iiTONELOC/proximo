import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import MessageForm from '../components/MessageForm';
import Messages from '../components/Messages';

const Home = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <h1>Global Chat</h1>
        {socket ? <Messages socket={socket} /> : `Not connected!`}
        <MessageForm></MessageForm>
      </div>
    </main>
  );
};

export default Home;
