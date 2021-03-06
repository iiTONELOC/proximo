const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ChatRoom = require('./ChatRoom');
const locationSchema = require('./Location');
const serverSchema = new Schema(

    {
        channels: [{
            type: Schema.Types.ObjectId,
            ref: 'ChatRoom'
        }],
        name: {
            type: String,
            required: 'Servers must have a name!',
            minlength: 1,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        ownerID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        location: [locationSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const Server = model('Server', serverSchema);

module.exports = Server;