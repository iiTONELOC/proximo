const { User, ChatRoom, Server, Message } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { createNewUser, joinChannel, SendMessage, leaveChannel, createServer, DeleteMessage } = require('../utils/chatUtils/ChatUtility');
const Location = require('../utils/Location');
const { aggregate } = require('../models/Servers');

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
            return await Message.find({}).populate('channels');
        },

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
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends'); W
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
            return await SendMessage(args);

            // if (context.user) {
            //     console.log(messageInput)
            // }

            // throw new AuthenticationError('You need to be logged in!');
        },
        deleteAMessage: async (parent, args, context) => {

            return await DeleteMessage(args);
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
        },
        leaveAChannel: async (parent, args, context) => {
            // EXPECTS =>
            // {
            //     "user": "60fc803489194b280c993e7b",
            //         "channel": "60fc803489194b280c993e80",
            // }
            console.log(args)
            try {
                return await leaveChannel(args);
            } catch (error) {
                console.error(error)
            }
        },
        createNewServer: async (parent, args, context) => {
            // get location data for user
            const { latitude, longitude } = await Location.user(args, context);
            // package data to use the createServer method that runs when signing up
            const user = {
                id: args.ownerID,
                _id: args.ownerID
            }
            // create the server
            const name = args.name
            const create = await createServer(user, name, latitude, longitude);
            // update user
            if (!create) {
                throw new Error('Unable to create the server! :\n')
            } else {
                const updateUser = await User.findByIdAndUpdate(args.ownerID, {
                    $push: { servers: create._id }
                }, { new: true })
                    .select('-__v -password')
                    .populate('friends')
                    .populate({ path: 'servers', populate: ['channels', 'messages', 'members'] })
                    .populate({ path: 'channels', populate: 'members' });
                console.log(updateUser)
                if (updateUser) {
                    return create
                } else {
                    // something went wrong, delete server and try again
                    await Server.findByIdAndDelete(create._id); throw new Error('Error Updating User, Canceled server')
                }

            }
        }
        // COMMENTED OUT BELOW
        // PLACE THIS TRY/CATCH BLOCK INTO if statement

        // if (context.user) {
        //     console.log(messageInput)
        // }

        // throw new AuthenticationError('You need to be logged in!');
    },

};

module.exports = resolvers;