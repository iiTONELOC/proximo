const { User, ChatRoom, Server } = require('../../models');
const Location = require('../../utils/Location');

module.exports = {
    createNewUser: async (args, context) => {
        // get location data for user
        const { latitude, longitude } = await Location.user(args, context);
        //  create new user
        const user = await User.create({ ...args });
        const data = await user;
        // create server
        const createServer = () => Server.create({
            name: `${data.username}'s Personal Server`,
            ownerID: user.id,
            location: { user_id: user._id, latitude: latitude, longitude: longitude },
        }).then(data => data).catch(e => console.error(e));
        const server = await createServer();
        // create channel 
        const createChannel = () => ChatRoom.create({
            name: `${user.username}'s Personal Chat`,
            location: { user_id: user._id, latitude: latitude, longitude: longitude },
            private: true,
            server: server
        }).then(data => data).catch(e => console.error(e))
        // update server with channel
        const channel = await createChannel();
        const updateServer = () => Server.findByIdAndUpdate(server._id,
            { $push: { channels: channel._id } },
            { new: true }).catch(e => console.error(e));
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
        console.log(updatedUser)
        return user

    }
}