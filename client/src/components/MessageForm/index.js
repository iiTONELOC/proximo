import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { io } from "socket.io-client";


const MessageForm = ({ socket }) => {

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
        socket.emit('message', value);
        socket.emit('messagePublic', value);
        try {
            // add thought to database
            // await addThought({
            //     variables: { value }
            // });
            console.log(value)

            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
            <p className={`m-0 ${characterCount === 280 /*|| error ? 'text-error' : ''*/}`}>
                Character Count: {characterCount}/280
                {/* {error && <span className="ml-2">Something went wrong...</span>} */}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
    
                            <div className="mt-1">
                                <input
                                type="text"
                                name="email"
                                id="email"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Send Message"
                                onChange={handleChange}
                                />
                            </div> 
                <button className="btn col-12 col-md-3 mt-2" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MessageForm;