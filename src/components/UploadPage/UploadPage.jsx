import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function UploadPage () {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const [imageURL, setImageURL] = useState('');
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState('');
    const [uploadDate, setUploadDate] = useState('');

    const newImage = {
        imageURL: imageURL,
        userID: user.id,
        photoDate: date,
        uploadDate: uploadDate
    };

    const handleTags = (event) => {
        console.log('in handleTags', event);
        setTags(event);
    }

    console.log('newImage is:', newImage);
    console.log('tags are', tags);

    const handleSubmit = (event) => {
        setUploadDate(moment());
        event.preventDefault();
        console.log('getting info', newImage, tags)
    }

    return (
        <>
            <p>Upload New Photo Here</p>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                >
                </input>
                <br/>
                <input
                    placeholder="Tags"
                    value={tags}
                    onChange={(event) => handleTags(event.target.value)}
                >
                </input>
                <br/>
                <input
                    placeholder="Date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                >
                </input>
                <br/>
                <button>
                    Upload
                </button>
            </form>
        </>
    )
};

export default UploadPage;