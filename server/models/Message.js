const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(

  {
    messageID: {
      type: String
    },
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




module.exports = messageSchema
