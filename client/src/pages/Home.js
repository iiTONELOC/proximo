import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import MessageForm from '../components/MessageForm';
import Messages from '../components/Messages';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
const Home = () => {
  // const [socket, setSocket] = useState(null);
  const loggedIn = Auth.loggedIn();
  


  //console.log(user)
  //console.log(user.data.username)

  //
  // if (user)
  // {const username = user.data.username}
  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:8080`);
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);
  
  

  return (
    <main>
      <h1>Welcome to Proximo! < br/> < br/>Chat with strangers that are geographically close to you. Make new friends. Go forth and prosper. Click on global chat to get started!
      </h1>
      
       
    

    </main>
  );
};

export default Home;
