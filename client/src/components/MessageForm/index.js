import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
import { } from '../../utils/mutations';
// import { QUERY_ME } from '../../utils/queries';
const MessageForm = ({ socket, data }) => {

    const [value, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        const userName = data.me.username;


        const messageData = {
            value: value,
            username: userName,
            id: data.me._id
        }
        // socket.emit('message', messageData);
        socket.emit('messagePublic', messageData);
        console.log(characterCount)
        try {
            // console.log(messageData)
            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        // <div>
        //     <p className={`m-0 ${characterCount === 280 /*|| error ? 'text-error' : ''*/}`}>
        //         Character Count: {characterCount}/280
        //         {/* {error && <span className="ml-2">Something went wrong...</span>} */}
        //     </p>
        //     <form
        //         className="flex-row justify-center justify-space-between-md align-stretch"
        //         onSubmit={handleFormSubmit}
        //     >
        //         <textarea
        //             placeholder="Be Polite"
        //             value={value}
        //             className="form-input col-12 col-md-9"
        //             onChange={handleChange}
        //         ></textarea>
        //         <button className="btn col-12 col-md-3" type="submit">
        //             Submit
        //         </button>
        //     </form>
        // </div>
        <div className=" w-full bg-gray-100 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <form className="mt-1 font-medium flex items-center justify-around">
                    <div className="w-full">
                        <input
                            placeholder="Message"
                            value={value}
                            className="bg-gray-400 shadow-sm block w-full sm:text-sm py-2 border border-indigo-600 rounded"
                            onChange={handleChange}
                        ></input>
                    </div>
                    <button
                        onClick={handleFormSubmit}
                        type="submit"
                        className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageForm;