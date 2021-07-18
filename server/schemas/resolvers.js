const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const Location = require('../utils/Location');
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('comments')
                    .populate('location')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // comments: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return Comment.find(params).sort({ createdAt: -1 });
        // },
        // comment: async (parent, { _id }) => {
        //     return Comment.findOne({ _id });
        // },


        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('comments')
                .populate('location')
                .populate('friends');
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
            // grabs the location either from browser or clients ip address
            const { latitude, longitude } = await Location.user(args, context);
            // must be a LET instead of a CONST here
            // create the user first then we update location
            let user = await User.create({ ...args });

            try {
                // grab user by username
                const updatedUser = await User.findOneAndUpdate(
                    { username: user.username },
                    { $push: { location: { latitude: latitude, longitude: longitude } } },
                    { new: true }
                );
                // sign user and return updated info
                const token = signToken(updatedUser);
                user = { ...updatedUser }
                return { token, user };
            } catch (error) {
                // in the event there is an error,
                // return all data minus location data
                console.error(error);
                const token = signToken(user);
                return { token, user };
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
        // addFriend: async (parent, { friendId }, context) => {
        //     if (context.user) {
        //         const updatedUser = await User.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $addToSet: { friends: friendId } },
        //             { new: true }
        //         ).populate('friends');

        //         return updatedUser;
        //     }

        //     throw new AuthenticationError('You need to be logged in!');
        // }


    },

};

module.exports = resolvers;