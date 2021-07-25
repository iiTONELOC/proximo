const { User, ChatRoom, Server, Message } = require('../../models');
const Location = require('../../utils/Location');
// CAN BE USED IN THE MUTATIONS OR IN THE IO SERVER ITSELF, AS LONG AS THE SOCKET EMITS 
// NECESSARY INFO IN THE PAYLOAD

// creates a new server for the user,
const createServer = (user, name, latitude, longitude) => Server.create({
    name: name ? name : `${user.username}'s Personal Server`,
    ownerID: user.id,
    location: { user_id: user._id, latitude: latitude, longitude: longitude },
}).then(data => data).catch(e => console.error(e));
// creates a channel for the passed in user, user is not updated yet so requires server
// name and private are optional
const createChannel = (user, latitude, longitude, server, name, private) => ChatRoom.create({
    name: name ? name : `${user.username}'s Personal Chat`,
    location: { user_id: user._id, latitude: latitude, longitude: longitude },
    private: private ? private : false,
    server: server
}).then(data => data).catch(e => console.error(e))
// join channel

module.exports = {
    createNewUser: async (args, context) => {
        // get location data for user
        const { latitude, longitude } = await Location.user(args, context);
        //  create new user
        const user = await User.create({ ...args });
        // create server
        const server = await createServer(user, latitude, longitude);
        // create channel 
        const channel = await createChannel(user, latitude, longitude, server);
        // update server with channel

        const updateServer = () => Server.findByIdAndUpdate(server._id,
            { $push: { channels: channel._id } },
            { new: true }).catch(e => console.error(e));
        try {
            updateServer();
            // update user
            const updatedUser = await User.findByIdAndUpdate(
                { _id: user._id },
                {
                    $push: {
                        location: { user_id: user._id, latitude: latitude, longitude: longitude },
                        servers: server._id,
                        channels: channel._id
                    }
                },
                { new: true }
            ).select('-__v -password');
            return updatedUser
        } catch (error) {
            console.error(error)
            User.findByIdAndRemove(user._id)
        }
    },
    joinChannel: async (user, channel, privateChannel) => {
        // ensure the room is not private
        const isPrivate = await ChatRoom.findById(channel);
        // check that the user is not already in the room
        const alreadyThere = isPrivate.members.filter(el => el._id == user);
        if (alreadyThere.length > 0) {
            throw new Error("You are already in this chat!")
        }
        // if we are not requesting a private channel
        if (!privateChannel) {
            // check and make sure the room is indeed a public room
            if (isPrivate.private === false) {
                return ChatRoom.findByIdAndUpdate(channel, {
                    $push: { members: user },
                }, { new: true })
                    .select('-__v -password')
                    .populate({ path: 'server' })
                    .populate('members');
            }
            throw new Error('You must be invited to this channel!')
        }
        // maybe we should implement a user generated key for private chats
    },
    leaveChannel: async ({ user, channel }) => {
        try {
            const didLeave = await ChatRoom.findByIdAndUpdate(channel, {
                $pull: { members: user }
            }, { new: true })
                .populate({ path: 'servers', populate: 'channels' })
                .populate('messages')
                .populate('members');
            return didLeave
        } catch (error) {
            console.error(error)
        }
    },
    createServer: createServer,
    createChannel: createChannel,
    SendMessage: async (args) => {
        try {
            const { channel } = args
            // make sure the channel exists
            const isChannel = await ChatRoom.findById(channel);
            // create the message
            const newMessage = await Message.create({ ...args })
            const { _id } = newMessage;
            // update created message with channel information
            const updateMessage = await Message.findByIdAndUpdate(_id,
                { $push: { channels: isChannel._id } },
                { new: true })
                .populate('channels')
                .catch(async e => {
                    // somewhere the creation failed, delete msg from db
                    if (_id) {
                        const dMsg = await Message.findByIdAndDelete(_id);
                        console.log(dMsg)
                        return false
                    }
                    console.error(e)
                    return false
                });
            // now update the channel
            const updateChannel = await ChatRoom.findByIdAndUpdate(channel, {
                $push: { messages: updateMessage._id }
            }, { new: true });
            if (updateChannel) {
                return updateMessage
            } else {
                throw new Error('Cannot send message!')
            }

        } catch (error) {
            console.error(error);
            return false
        }
    },
}