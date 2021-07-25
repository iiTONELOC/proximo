import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import MessageForm from '../components/MessageForm';
import Messages from '../components/Messages';
import Auth from '../utils/auth';
const Home = () => {
  // const [socket, setSocket] = useState(null);
  const loggedIn = Auth.loggedIn();
  const user = Auth.getProfile()
  console.log(user)
  console.log(user.data.username)

  //
  const username = user.data.username
  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:8080`);
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);
  
  

  return (
    <main>
      {!loggedIn && (<h1>This is home</h1>)}
      {loggedIn && (<div className="flex-row justify-space-between">
        <h1>Welcome home {username}</h1>

       
      </div>)}

    </main>
  );
};

export default Home;
