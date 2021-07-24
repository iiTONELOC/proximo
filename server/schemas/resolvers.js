const { User, ChatRoom, Server, Message } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { createNewUser, joinChannel, SendMessage } = require('../utils/chatUtils/ChatUtility')
const Location = require('../utils/Location');
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')
                    .populate('messages')
                    .populate({ path: 'servers', populate: 'channels' })
                    .populate({ path: 'channels', populate: 'messages', populate: 'members' });

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // find all servers or a server, depending on query:
        servers: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Server.find(params).populate({ path: 'channels' });
        },
        // find all channels or a single channel
        chatRooms: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return ChatRoom.find(params).populate({ path: 'servers', populate: 'channels' })
        },

        // get all users
        // get user by username
        // get user by _id
        users: async (parent, { _id, username }) => {
            const params = _id ? { _id } : username ? { username } : {};
            return User.find(params)
                .select('-__v -password')
                .populate('friends')
                .populate('messages')
                .populate({ path: 'servers', populate: 'channels' })
                .populate({ path: 'channels', populate: 'messages', populate: 'members' });
        },
        allMessages: async (parent, args, context) => {
            const allMessages = await Message.find({}).populate('channels');

            return allMessages
        }
    }, Mutation: {
        addUser: async (parent, args, context) => {
            try {
                // custom method 
                // located in utils/chatUtils/ChatUtility.js
                const user = await createNewUser(args, context);
                const token = signToken(user);
                return { token, user };
            } catch (error) {
                console.error(error)
            }

        },
        login: async (parent, { email, password }) => {

            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        sendMessage: async (parent, args, context) => {

            return SendMessage(args);

            // if (context.user) {
            //     console.log(messageInput)
            // }

            // throw new AuthenticationError('You need to be logged in!');
        }


    },

};

module.exports = resolvers;