const { User, ChatRoom, Server, Message } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { createNewUser, joinChannel, SendMessage } = require('../utils/chatUtils/ChatUtility');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')
                    .populate({ path: 'servers', populate: ['channels', 'messages', 'members'] })
                    .populate({ path: 'channels', populate: 'members' })


                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // find all servers or a server, depending on query:
        servers: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Server.find(params)
                .populate({ path: 'channels', populate: ['messages', 'members'] })
                // .populate({ path: 'channels', populate: 'members', })
                ;
        },
        // find all channels or a single channel
        chatRooms: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return ChatRoom.find(params)
                .populate({ path: 'servers', populate: 'channels' })
                .populate('messages')
                .populate('members')
                ;
        },

        // get all users
        // get user by username
        // get user by _id
        users: async (parent, { _id, username }) => {
            const params = _id ? { _id } : username ? { username } : {};
            return User.find(params)
                .select('-__v -password')
                .populate('friends')
                .populate({ path: 'servers', populate: ['channels', 'members'] })
                .populate({ path: 'channels', populate: 'members' })
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
            // EXAMPLE DATA
            //  expects =>
            // {
            //     "text": "TEST MESSAGE",
            //         "username": "Tester2",
            //             "channel": "60fc6a483fd0913968a723cc"
            // }

            // ADD AUTH BACK IN! REMOVED FOR TESTING
            // COMMENTED OUT BELOW
            // PLACE THIS TRY/CATCH BLOCK INTO if statement
            try {
                const success = await SendMessage(args);
                if (!success) {
                    throw new Error(`sendMsg Resolver:`)
                }
                return success
            } catch (error) {
                console.error(error)
            }

            // if (context.user) {
            //     console.log(messageInput)
            // }

            // throw new AuthenticationError('You need to be logged in!');
        },
        joinAChannel: async (parent, args, context) => {
            // EXPECTS =>
            // {
            //     "user": "60fc803489194b280c993e7b",
            //         "channel": "60fc803489194b280c993e80",
            //             "privateChannel": false
            // }
            const { user, channel } = { ...args }
            const privateChannel = args.privateChannel
            try {
                return await joinChannel(user, channel, !privateChannel ? false : privateChannel);
            } catch (error) {
                console.error(error)
            }
            // ADD AUTH BACK IN! REMOVED FOR TESTING
            // COMMENTED OUT BELOW
            // PLACE THIS TRY/CATCH BLOCK INTO if statement

            // if (context.user) {
            //     console.log(messageInput)
            // }

            // throw new AuthenticationError('You need to be logged in!');
        }


    },

};

module.exports = resolvers;