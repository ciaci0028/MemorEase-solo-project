import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Chip from '@mui/material/Chip';

import ChipInput from './ChipInput';


function UploadPage () {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch({ type: 'FETCH_TAGS' })
    }, []);

    const user = useSelector(store => store.user);
    const fetchedTags = useSelector(store => store.tags);

    const [startDate, setStartDate] = useState(new Date());
    const [imageURL, setImageURL] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [uploadDate, setUploadDate] = useState(moment().clone().format('MM-DD-YYYY'));


    const newImage = {
        imageURL: imageURL,
        description: description,
        photoDate: startDate,
        uploadDate: uploadDate,
        tags: tags
    };

    const handleTags = (event) => {
        console.log('in handleTags', event);
        setTags(event);
    };


    console.log('newImage is:', newImage);
    console.log('tags are', tags);
    console.log('fetched tags are', fetchedTags);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('getting info', newImage);

        dispatch({
            type: 'POST_PHOTO',
            payload: newImage
        });

    };


    
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
                {fetchedTags[0] &&
                    fetchedTags[0].array_agg.map(tag => (
                        <Chip 
                            key={tag}
                            label={tag}
                            onClick={() => console.log('clicked')}
                            onDelete={() => console.log('deleted')}
                        />
                    ))
                }
                <ChipInput />
                <input
                    placeholder="New Tags"
                    value={tags}
                    onChange={(event) => handleTags(event.target.value)}
                >
                </input>
                <br/>
                <input
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                >
                </input>
                <DatePicker 
                    selected={startDate} onChange={(date) => setStartDate(date)}
                />
                <br/>
                <button>
                    Upload
                </button>
            </form>
        </>
    )
};

export default UploadPage;