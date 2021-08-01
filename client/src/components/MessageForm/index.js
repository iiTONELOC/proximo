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
        socket.emit('message', messageData);
        console.log(characterCount)
        try {
            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className=" w-full bg-gray-100 sm:rounded-lg mb-12">
            <div className="px-4 py-5 sm:p-6">
                <form className="mt-1 font-medium flex items-center justify-start">
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
                        className="mt-3 w-2/6 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 ml-3 sm:w-1/3 md:w-1/6 text-sm"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageForm;