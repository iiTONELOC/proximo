const { User, ChatRoom, Server } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { createNewUser } = require('../utils/chatUtils/ChatUtility')
const Location = require('../utils/Location');
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
        // find all servers:

        servers: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Server.find(params).populate({ path: 'channels' });
        },
        // comment: async (parent, { _id }) => {
        //     return Comment.findOne({ _id });
        // },


        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate({
                    path: 'servers',
                }).populate({
                    path: 'channels',
                    path: "server",
                    path: 'name'

                })
        },
        // get a user by username
        // user: async (parent, { username }) => {
        //     return User.findOne({ username })
        //         .select('-__v -password')
        //         .populate('comments')
        //         .populate('location')
        //         .populate('friends');
        // },
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
        }


    },

};

module.exports = resolvers;