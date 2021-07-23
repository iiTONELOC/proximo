import { gql } from '@apollo/client';


export const QUERY_USERS = gql`
query {
    users{
        _id
        username
        email
        profilePicture
        friendCount
            location{
                user_id
                latitude
                longitude
            }
            friends{
                username
            }
            messages{
                _id
            }
            servers{
                _id
                ownerID
                name
            channels{
                _id
                    location{
                        latitude
                        longitude
                    }
                private
            }
        }
    }
}
`;

export const QUERY_ME = gql`
query {
    me{
        _id
        username
        friendCount
            location{
                user_id
                latitude
                longitude
            }
            friends{
              	_id
                username
              servers{
                _id
                name
                channels{
                  _id
                  private
                }
              }
              location{
                latitude
                longitude
              }
            }
            messages{
                _id
            }
            servers{
                _id
                name
            channels{
                _id
      					name
                private
            }
        }
    }
}
`;

export const QUERY_ME_BASIC = gql`
{
    me {
    _id
    username
    email
    friendCount
    friends {
        _id
        username
    }
    }
}
`;

export const QUERY_GLOBAL_MESSAGES = gql`
query{
    allMessages{
        messageID
        text
        time
        username
    }
}
`;

export const QUERY_CHANNELS = gql`
query{
  chatRooms{
    _id
    name
    private
    server{
      _id
      name
      ownerID
      location{
        latitude
        longitude
      }
    }
  }
}
`;

export const QUERY_SERVERS = gql`
query {
  servers{
  _id
    name
    ownerID
    location{
      latitude
      longitude
    }
    channels{
      _id
      name
      private
    }
  }
}
`;

