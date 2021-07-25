import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { io } from "socket.io-client";
import MessageForm from '../components/MessageForm';
import Messages from '../components/Messages';
import Auth from '../utils/auth';
import { JOIN_CHANNEL } from '../utils/mutations';
import { QUERY_CHANNELS } from '../utils/queries';


const Public = () => {
  const [socket, setSocket] = useState(null);
  const loggedIn = Auth.loggedIn();
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const [publicChat, setPublicChat] = useState(false);
  const { loading, error, data } = useQuery(QUERY_CHANNELS);
  const { user, channel, privateChannel } = useMutation(JOIN_CHANNEL);

  console.log(privateChannel);

  const createRoom = async event => {
    event.preventDefault();
    if(!privateChannel) {
      try {
        socket.emit('createPublic', (room) => {
          socket.join(room);
          console.log(room);
        });
        console.log(socket);
  
        
        setPublicChat(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <main>
      {loggedIn && <button onClick={createRoom} type='submit'> Create Room </button>}
      {loggedIn && (<div className="flex-row justify-space-between">
        <h1>**THIS IS A TEST ** Global Chat</h1>

        {socket ? (<div><Messages socket={socket} />
          <MessageForm socket={socket}>  </MessageForm></div>) : `Not connected!`}

      </div>)}

      {publicChat && (<div className="flex-row justify-space-between">
        <h1>**THIS IS A TEST ** Public Chat</h1>

        {socket ? (<div><Messages socket={socket} />
          <MessageForm socket={socket}>  </MessageForm></div>) : `Not connected!`}

      </div>)}
    </main>
  );
};

export default Public;
