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
}
type Location {
    user_id: ID
    latitude: String
    longitude: String
}
type Message{
    messageID: String
    text: String
    time: String
    username: String
}
input MessageInput{
    messageID: String
    text: String
    time: String
    username: String
}
type ChatRoom{
    chatID: String
    messages: [Message]
    location: [Location]
    private: Boolean
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