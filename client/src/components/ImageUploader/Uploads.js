import React from 'react';
import { useQuery } from '@apollo/client'; // import useQuery hook
import gql from 'graphql-tag';

// FilesQuery
export const FileQuery = gql`
  {
    me {
    _id
    username
    email
    profilePicture
    friendCount
    friends {
        _id
        username
    }
    }
  }
`;

export default function Uploads() {
    const { loading, data } = useQuery(
        FileQuery,
    ); /* useQuery returns an object with **loading, 
   data, and error** but we only care about the loading state and the data object.
   */

    if (loading) {
        // display loading when files are being loaded
        return <h1>Loading...</h1>;
    } else if (!data) {
        return <h1>No images to show</h1>;
    } else {
        return (
            <>
                <h1 className='text-center'>Recent uploads</h1>
                {
                    data ? <img src={data.profilePicture} className='img' alt={data && 'img'} /> : 'Upload a picture'
                }
            </>
        );
    }
}