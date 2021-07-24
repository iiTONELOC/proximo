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
              members{
                _id
                username
                profilePicture
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
      UsersInRange{
        servers{
          _id
          ownerID
          channels{
            _id
            name
            private
            members{
              _id
              username
            }
          }
        }
      }
        friendCount
            location{
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
            servers{
                _id
                name
            channels{
                _id
      					name
                private
              	messages{
                  _id
                  username
                  text
                  time
                }
              	members{
                  _id
                  username
                  profilePicture
                }

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
    }
    messages{
      _id
      username
      text
      time
    }
    members{
      _id
      username
      profilePicture
    }
  }
}
`;

export const QUERY_SERVERS = gql`
query{
  servers{
    _id
    name
    ownerID
    channels{
      _id
      name
      private
      messages{
        _id
        username
        text
        time
      }
      members{
        _id
        username
        profilePicture
      }
    }
    location{
      latitude
      longitude
    }
  }
}
`;

