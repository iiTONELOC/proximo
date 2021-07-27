import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        _id
        username
    }
    }
}
`;
export const LOGOUT_USER = gql`
mutation logout($user_id: ID!){
  logout(user_id: $user_id){
    _id
    username
    online
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
    user {
        _id
        username
        email
    }
    }
}
`;

export const ADD_FRIEND = gql`
mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
    _id
    username
    friendCount
    friends {
        _id
        username
    }
    }
}
`;

export const SEND_MESSAGE = gql`
mutation sendMessage($text: String!, $username: String!, $channel: ID!) {
    sendMessage(text: $text, username: $username, channel: $channel) {
    _id
    channels{
      _id
      name
    }
    text
    time
    username
    }
}
`
export const JOIN_CHANNEL = gql`
mutation joinAChannel($user: ID!, $channel: ID!, $privateChannel: Boolean!) {
   joinAChannel(user: $user, privateChannel: $privateChannel, channel: $channel) {
    _id
    name
    private
    server{
      _id
      name
    }
    members{
      _id
      username
      profilePicture
    }
    }
}
`;

export const LEAVE_CHANNEL = gql`
mutation leaveAChannel($user: ID!, $channel: ID!) {
   leaveAChannel(user: $user, channel: $channel) {
    _id
    name
    private
    server{
      _id
      name
    }
    members{
      _id
      username
      profilePicture
    }
    }
}
`;

export const CREATE_SERVER = gql`
mutation createNewServer($name: String!, $ownerID: ID!, ) {
   createNewServer(name: $name, ownerID: $ownerID) {
    _id
    name
   channels{
    _id
    name
  }
    createdAt
    location{
      latitude
     longitude
    }
    }
}
`;

export const DELETE_MSG = gql`
mutation deleteAMessage($messageID: ID!) {
    deleteAMessage(messageID:$messageID) {
    _id
  }
}
`;