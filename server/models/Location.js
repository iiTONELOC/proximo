const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const locationSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    latitude: {
      type: Number,
      required: false,
      default: null
    },
    longitude: {
      type: Number,
      required: false,
      default: null
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);




module.exports = locationSchema;
