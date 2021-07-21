const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ChatRoom = require('./ChatRoom');

const messageSchema = new Schema(

  {
    channel: [ChatRoom.schema],
    text: {
      type: String,
      required: 'Messages must have content!',
      minlength: 1,
      maxlength: 280
    },
    time: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Message = model('Message', messageSchema);

module.exports = Message;
