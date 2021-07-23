const { Schema, model } = require('mongoose');
const Message = require('./Message');
const locationSchema = require('./Location');
const Server = require('./Servers')

const chatRoomSchema = new Schema(
    {
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }],
        name: {
            type: String,
            required: 'Channels must have a name!',
            minlength: 2,
            maxlength: 25
        },
        location: [locationSchema],
        private: {
            type: Boolean,
            required: false,
            default: false,
        },
        server: [Server.schema]
    }
);

const ChatRoom = model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom