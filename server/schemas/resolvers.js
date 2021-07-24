const { User, ChatRoom, Server, File } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { createNewUser, joinChannel } = require('../utils/chatUtils/ChatUtility')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('location')
                    .populate('friends')
                    .populate('messages')
                    .populate('servers')
                    .populate('channels');

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
            return ChatRoom.find(params).populate({ path: 'server', path: 'members' })
        },

        // get all users
        // get user by username
        // get user by _id
        users: async (parent, { _id, username }) => {
            const params = _id ? { _id } : username ? { username } : {};
            return User.find(params)
                .select('-__v -password')
                .populate({
                    path: 'servers',
                }).populate({
                    path: 'channels',
                    path: "server",
                })
        },
    },
    Mutation: {
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
        // addComment: async (parent, args, context) => {
        //     if (context.user) {
        //         const comment = await Comment.create({ ...args, username: context.user.username });

        //         await User.findByIdAndUpdate(
        //             { _id: context.user._id },
        //             { $push: { comments: Comment._id } },
        //             { new: true }
        //         );

        //         return comment;
        //     }

        //     throw new AuthenticationError('You need to be logged in!');
        // },
        // addReaction: async (parent, { commentId, reactionBody }, context) => {
        //     if (context.user) {
        //         const updatedComment = await Comment.findOneAndUpdate(
        //             { _id: commentId },
        //             { $push: { reactions: { reactionBody, username: context.user.username } } },
        //             { new: true, runValidators: true }
        //         );

        //         return updatedComment;
        //     }

        //     throw new AuthenticationError('You need to be logged in!');
        // },
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
        uploadFile: async (parent, { pictureData }, context) => {
            console.log(pictureData)
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { profilePicture: pictureData },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },


    },


};

module.exports = resolvers;