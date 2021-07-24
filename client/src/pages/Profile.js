import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
//import { ADD_FRIEND } from '../utils/mutations';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/MessageForm';
import Auth from '../utils/auth';

const Profile = () => {

  const { loading, error, data } = useQuery(QUERY_ME)

  console.log(data)


  // const { username, friends } = {...data.me}

  // console.log(friends)
  // console.log(username)
  // const username = data.me.username

//   //const [addFriend] = useMutation(ADD_FRIEND);
  // useEffect(() => {
  //   const username = useQuery(QUERY_ME, {
  //     variables: { username }
  //   });
  // })

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//    variables: { username: userParam }
//  });

//  const { loading, data } = useQuery(QUERY_ME, {
//   variables: { username }
// });
//   //const user = data?.me || data?.user || {};
//   const handleClick = async () => {
//     try {
//       await addFriend({
//         variables: { id: user._id }
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Redirect to="/profile" />;
//   }
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this page. Use the navigation links above to sign up or log in!
//       </h4>
//     );
//   }
  return (
    <div>
       <div className="App h-screen w-full flex justify-center items-center bg-green-500">
        <h2 class="text-sm text-gray-500"> This is the profile page ** Insert picture of you **
          {/* Viewing {userParam ? `${user.username}'s` : 'your'} profile. */}
        </h2>

        {/* {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )} */}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8"> This is a profile picture of you

          {/* <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} /> */}
        </div>

        <div className="col-12 mb-3 col-lg-8"> This is profile information</div>

        <div className="col-12 col-lg-3 mb-3">
        Friend list
        <ul>
            <li>
            Friend 1 with picture as icon
            </li>
            <li>
            Friend 2 with picture as icon
            </li>
        </ul>


          {/* <FriendList
            username={ username }
            // friendCount={user.friendCount}
            friends = { friends }
          /> */}
        </div>
      </div>
      {/* <div className="mb-3">{!userParam && <ThoughtForm />}</div> */}
    </div>
  );
};

export default Profile;
