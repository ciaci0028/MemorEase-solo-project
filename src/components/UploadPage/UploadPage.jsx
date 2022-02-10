import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function UploadPage () {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch({ type: 'FETCH_TAGS' })
    }, []);

    const user = useSelector(store => store.user);
    const fetchedTags = useSelector(store => store.tags);
    const uploadTags = useSelector(store => store.uploadTags);

    const [startDate, setStartDate] = useState(new Date());
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [uploadDate, setUploadDate] = useState(moment().clone().format('MM-DD-YYYY'));

    const [tag, setTag] = useState('');


    const newImage = {
        imageURL: imageURL,
        description: description,
        photoDate: startDate,
        uploadDate: uploadDate,
        tags: uploadTags
    };

    const handleTags = (event) => {
        console.log('in handleTags', event);

        dispatch({
            type: 'SET_UPLOAD_TAGS'
        })
    };


    console.log('newImage is:', newImage);
    console.log('fetched tags are', fetchedTags);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('getting info', newImage);

        dispatch({
            type: 'POST_PHOTO',
            payload: newImage
        });

    };

    const handleNewTagClick = () => {
        dispatch({
            type: 'SET_UPLOAD_TAGS',
            payload: tag
        })

        setTag('');
    };

    console.log('uploading tags are', uploadTags);

    
    return (
        <>
            <p>Upload New Photo Here</p>
            <div>
                <input
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                >
                </input>
                <br/>
                <input
                    placeholder="New Tags"
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                >
                </input>
                <button
                    onClick={()=> handleNewTagClick()}
                >Submit new tag</button>
                <Autocomplete 
                    options={fetchedTags[0] && fetchedTags[0].array_agg}
                    renderInput={(params) => <TextField {...params} label="Current Tags" 
                    onSelect={(event) => console.log('selected', event.renderInput)}
                    />}
                />  
                <br/>
                {uploadTags &&
                    uploadTags.map(tag => (
                        <Chip 
                            key={tag}
                            label={tag}
                            onClick={() => console.log('clicked')}
                            onDelete={() => console.log(() => dispatch({type: 'DELETE_UPLOAD_TAGS', payload: {tag}}))}
                        />
                    ))
                }
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
                <button onClick={handleSubmit}n>
                    Upload
                </button>
            </div>
        </>
    )
};

export default UploadPage;