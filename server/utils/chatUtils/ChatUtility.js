const { User, ChatRoom, Server } = require('../../models');
const Location = require('../../utils/Location');

module.exports = {
    createNewUser: async (args,context) => {
        // get location data for user
        const { latitude, longitude } = await Location.user(args, context);
        //  create new user
        const user = await User.create({ ...args });

        // create a new server and public channel within that server for our new user:
        const createServer_createChannel = await Server.create({
            name: `${user.username}'s Personal Server`,
            ownerID: user._id,
            location: { user_id: user._id, latitude: latitude, longitude: longitude },
        }).then(async ({ _id }) => {
            // create chatroom
            const c = await ChatRoom.create({
                name: `${user.username}'s Personal Chat`,
                location: { user_id: user._id, latitude: latitude, longitude: longitude },
                private: true,
                server: _id
            })
            // update the server with channel id
            const s = await Server.findOneAndUpdate({ _id: _id }, {
                $push: { channels: c._id }
            }, { new: true })
            // return id's to update the user
            const updatedUser = await User.findByIdAndUpdate(
                { _id: user._id },
                {
                    $push: {
                        location: { user_id: user._id, latitude: latitude, longitude: longitude },
                        servers: s._id ,
                        channels: c._id 
                    }
                },
                { new: true }
            ).select('-__v -password');
            return updatedUser
        }).catch(e => {
            console.error(e)
        })
        
        return createServer_createChannel;
    }
}