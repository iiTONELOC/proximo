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
    channel_id: ID
    text: String
    time: String
    username: String
}
input MessageInput{
    text: String
    time: String
    username: String
}
type ChatRoom{
    _id: ID
    name: String
    messages: [Message]
    location: [Location]
    private: Boolean
    server: [Server]
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
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
}
type Auth {
    token: ID!
    user: User
    
}
`

// export the typeDefs
module.exports = typeDefs