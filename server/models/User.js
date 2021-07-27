const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const locationSchema = require('./Location');
const Message = require('./Message');
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
    online: [{
      type: Boolean,
      required: true,
      default: false
    }],
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
  const Users = await User.find().select('-__v -password')
    .populate('friends')
    .populate({ path: 'servers', populate: ['channels', 'members'], })
    ;
  // filter out currentUser
  const AllUsers = Users.filter(el => el._id.toString() != this._id.toString());

  const [data] = this.location
  //  lat-lon 1
  const { latitude, longitude } = data;
  // map over users
  const d = AllUsers.map((el) => {
    const [data2] = el.location;
    // lat-lon 2
    const lat2 = data2.latitude;
    const long2 = data2.longitude;
    // calculate distance between users
    const howFar = Distance(latitude, longitude, lat2, long2)
    // less than 2 miles away, return
    if (howFar < 2) {
      if (el.online[0] === true) {
        return el
      }
    }
  });
  console.log(d)
  return d
})

const User = model('User', userSchema);

module.exports = User;

