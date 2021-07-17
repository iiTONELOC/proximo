const { gql } = require('apollo-server-express');
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    Location: Location
    friends: [User]
}
type Location {
    userID: ID
    latitude: Int
    longitude: Int
}



type Query {
    me: User
    users: [User]
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
}
type Auth {
    token: ID!
    user: User
}
`

// export the typeDefs
module.exports = typeDefs