const { gql } = require('apollo-server-express');
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    location: [Location]
    friends: [User]
    messages: [Message]
    servers: [Server]
    channels: [ChatRoom]
    profilePicture: String
    UsersInRange: [User]
}
type Location {
    user_id: ID
    latitude: String
    longitude: String
}
type Message{
    _id: ID
    channels: [ChatRoom]
    text: String
    time: String
    username: String
}
input MessageInput{
    text: String
    username: String
    channel_id: ID
}
type ChatRoom{
    _id: ID
    name: String
    messages: [Message]
    location: [Location]
    private: Boolean
    server: [Server]
    members:[User]
}

type Server{
    _id: ID
    ownerID: ID
    name: String
    channels: [ChatRoom]
    location: [Location]
    createdAt: String
    
}
type Query {
    me: User
    users: [User]
    chatRooms: [ChatRoom]
    allMessages: [Message]
    servers: [Server]
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    sendMessage(text: String!, username: String!, channel: ID!): Message
    joinAChannel(user: ID!, channel: ID!, privateChannel: Boolean): ChatRoom
    leaveAChannel(user: ID!, channel: ID!):ChatRoom
    createAChannel(server: ID!, name: String!, private: Boolean!): ChatRoom
    createNewServer(name: String!, ownerID: ID!): Server
}
type Auth {
    token: ID!
    user: User
    
}
`

// export the typeDefs
module.exports = typeDefs