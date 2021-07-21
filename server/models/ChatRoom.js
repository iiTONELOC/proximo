const { Schema, model } = require('mongoose');
const messageSchema = require('./Message');
const locationSchema = require('./Location');

const chatRoomSchema = new Schema(
    {
        chatID: {
            type: String,
            required: true,
            unique: true
        },
        messages: [messageSchema],
        location: [locationSchema],
        private: {
            type: Boolean,
            required: true
        }

    }
);

const ChatRoom = model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom