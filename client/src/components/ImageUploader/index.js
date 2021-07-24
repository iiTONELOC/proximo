import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UploadMutation } from '../../utils/mutations';
import { FileQuery } from './Uploads'; // import FileQuery we created in the Uploads.js file

export default function WithPreviews(props) {
    const [file, setFile] = useState({}); // empty state that will be populated with a file object
    const [uploadFile] = useMutation(UploadMutation);

    // submit function
    const handleUpload = async () => {
        if (file) {
            const { preview } = { ...file };
            try {
                uploadFile({
                    variables: { pictureData: preview },
                    refetchQueries: [{ query: FileQuery, variables: { pictureData: preview } }], // update the store after a successful upload.
                });
                setFile({}); // reset state after a successful upload
                console.log('Uploaded successfully: ', file);
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('No files to upload');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/png, ,image/gif, image/jpg, image/jpeg',
        onDrop: (acceptedFile) => {
            // add error message handling with state to alert user.
            try {
                setFile(
                    // convert preview string into a URL
                    Object.assign(acceptedFile[0], {
                        preview: URL.createObjectURL(acceptedFile[0]),
                    }),
                );
            } catch (error) {
                // usually unsupported file type
                console.error(error)
            }
        },
    });

    const thumbs = (
        <div className='thumb' key={file.name}>
            <div className='thumb-inner'>
                <img src={file.preview} className='img' alt={file.length && 'img'} />
            </div>
        </div>
    );

    useEffect(
        () => () => {
            URL.revokeObjectURL(file.preview);
        },
        [file],
    );

    return (
        <section className='container'>
            <div {...getRootProps({ className: 'dropzone my-3 p-5 border-dashed border-4 border-green-700' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop a file here, or click to select file</p>
            </div>
            <aside className='thumb-container'>
                {thumbs}
                <button
                    type='submit'
                    className={`rounded-full py-3 px-6 from-blue-50`}
                    style={{ display: file && !Object.keys(file).length && 'none' }}
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </aside>
        </section>
    );
}