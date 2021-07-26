import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { io } from "socket.io-client";
import MessageForm from '../components/MessageForm';
import Messages from '../components/Messages';
import Auth from '../utils/auth';
import UserList from '../components/UserList';


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
      <div class="px-4">
        <UserList></UserList>
        {/* <div>
          <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Projects</h2>
          <ul class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li class="col-span-1 flex shadow-sm rounded-md">
              <div class="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md">
                GA
              </div>
              <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <a href="#" class="text-gray-900 font-medium hover:text-gray-600">Graph API</a>
                  <p class="text-gray-500">16 Members</p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="sr-only">Open options</span>
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
      {loggedIn && (<div className="flex-row justify-space-between">
        <h1>**THIS IS A TEST ** Global Chat</h1>

        {socket ? (<div><Messages socket={socket} />
          <MessageForm socket={socket}>  </MessageForm></div>) : `Not connected!`}
      </div>)}
    </main>
  );
};

export default Public;
