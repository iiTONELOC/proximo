const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const locationSchema = require('./Location');
const Message = require('./Message');
const ChatRoom = require('./ChatRoom');
const Distance = require('../utils/Distance');
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    profilePicture: {
      type: String,
      required: false,
      default: null
    },
    messages: [Message.schema],
    servers: [{
      type: Schema.Types.ObjectId,
      ref: 'Server'
    }],
    channels: [{
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom'
    }],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    location: [locationSchema],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

userSchema.virtual('UsersInRange').get(async function () {
  // query all active users return an array of users within 2 miles for now, change distance later
  const Users = await User.find();
  // calculate distance between users
  const [data] = this.location
  const { latitude, longitude } = data;
  const userData = Users.map((el) => {
    const [data2] = el.location;
    const lat2 = data2.latitude;
    const long2 = data2.longitude;
    const tooFar = Distance(latitude, longitude, lat2, long2)
    if (this._id.toString() === el._id.toString()) {
      // no need to calculate distance on the the same user
    } else {
      // if not user, calculate current distance between this user and all others
      if (tooFar < 2) {
        return data._id
      }
    }
  })

  // filter array to remove null values
  return userData.filter(el=>el != null)
})

const User = model('User', userSchema);

module.exports = User;
