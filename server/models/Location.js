const { Schema, model, } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const locationSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    // If we want to allow users to add their favorite locations or something
    // similar the place ref is created, just need to make the schema
    // placeID: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Place',
    // },
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



const Location = model('Location', locationSchema);

module.exports = Location;
