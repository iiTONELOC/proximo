// import React, { useEffect, useState, useRef } from 'react';
// import { io } from "socket.io-client";
// import MessageForm from '../components/MessageForm';
// import Messages from '../components/Messages';
// import Auth from '../utils/auth';
// import immer from "immer";


// // const Test = () => {
// //   const [socket, setSocket] = useState(null);
// //   const loggedIn = Auth.loggedIn();
// //   useEffect(() => {
// //     const newSocket = io(`http://${window.location.hostname}:8080`);
// //     setSocket(newSocket);
// //     return () => newSocket.close();
// //   }, [setSocket]);

// //   function App() {
// //     const [username, setUsername] = useState("");
// //     const [connected, setConnected] = useState(false);
// //     const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: "general", reciverId: ''});
// //     const [connectedRooms, setConnectedRooms] = useSate(["general"]);
// //     const [allUsers, setAllUsers] = useState([]);
// //     const [messages, setMessages] = useState(initialMessageState);
// //     const [message, setMessage] = useState("");
// //     const socketRef = useRef();

// //     function sendMessage() {
// //       const payload = {
// //         content: message,
// //         to: currentChat.isChannel ? currentChat.chatName : currentChat.reciverId,
// //         sender: username,
// //         chatName: currentChat.chatName,
// //         isChannel: currentChat.isChannel
// //       };
// //       socketRef.current.emit("send Message", payload);
// //       const newMessages = immer(messages, draft => {
// //         sender: username,
// //         content: message, 
// //       });
// //     };
// //     setMessages(newMessages);
// //   }

// //   function connect() {
// //     setConnected(true);
// //     socketRef.current = io.connect('/');
// //     socketRef.current.emit('join server', username);
// //     socketRef.current.emit('join room', 'gereral', (messages) => roomJoinCallback(messages, "general"));
// //     socketRef.current.on('new user', allUsers => {
// //       setAllUsers(allUsers);
// //     });
// //     socketRef.current.on("new message", ({content, sender, chatName}) => {
// //       setMessages(messages => {
// //         const newMessages = immer(messages, draft => {
// //           if (draft[chatName]) {
// //             draft[chatName].push({content, sender});
// //           } else {
// //             draft[chatName] = [{ content, sender}];
// //           }
// //         });
// //         return newMessages;
// //       });
// //     });
// //   }

// //   function roomJoinCallback(incomingMessages, room) {
// //     const newMessages = immer(messages, draft => {
// //       draft[room] = incomingMessages;
// //     });
// //     setMessages(newMessages);
// //   };

// //   //uses the callback function in the server side
// //   function joinRoom(room) {
// //     const newConnectedRooms = immer(connectedRooms, draft => {
// //       draft.push(room);
// //     });
// //     socketRef.current.emit("join room", room (messages) => roomJoinCallback(messages, room));
// //     setConnectedRooms(newConnectedRooms);
// //   };

// //   funciton toggleChat(currentChat) {
// //     if(!messages[currentChat.chatName]) {
// //       const newMessages = immer(messages, draft => {
// //         draft[currentChat.chatName] =[];
// //       });
// //       setMessages(newmessages);
// //     }
// //     setCurrentChat(currentChat);
// //   }

// //   let body;
// //     body = (
// //       //make a chat component
// //       <Chat 
// //       message={message}
// //       handleMessageChange={handleMessageChange}
// //       sendMessage={sendMessage}
// //       yourId={socketRef.current ? socket.ref.current.id : ''}
// //       allUsers={allUsers}
// //       joinRoom={joinRoom}
// //       connectedRooms={connectedRooms}
// //       currentChat={currentChat}
// //       toggleChat={toggleChat}
// //       messages={messages[currentChat.chatName]}
// //       />
// //     )

//   return (
//     <main>
//       {loggedIn && (<div className="flex-row justify-space-between">
//         <h1>**THIS IS A TEST ** Global Chat</h1>

//         {socket ? (<div><Messages socket={socket} />
//           <MessageForm socket={socket}>  </MessageForm></div>) : `Not connected!`}

//       </div>)}

//     </main>
//   );
// };

// export default Test;
