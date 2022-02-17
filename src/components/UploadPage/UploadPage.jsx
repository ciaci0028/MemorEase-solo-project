import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import Autocomplete from './Autocomplete';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';


function UploadPage () {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch({ type: 'FETCH_TAGS' })
        dispatch({ type: 'CLEAR_UPLOAD_TAGS' })
    }, []);

    // Grabbing the tags to be uploaded from the redux store
    const uploadTags = useSelector(store => store.uploadTags);
    
    // Creating local state for all of the variables that are
    // changing as the user uploads an image
    const [startDate, setStartDate] = useState(new Date());
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [uploadDate, setUploadDate] = useState(moment().clone().format('MM-DD-YYYY'));
    const [toggleButton, setToggleButton] = useState(false);

    // New image object to be dispatched to server
    const newImage = {
        imageURL: imageURL,
        description: description,
        photoDate: startDate,
        uploadDate: uploadDate,
        tags: uploadTags
    };

    // When user hits submit, on form
    const handleSubmit = (event) => {
        // prevent default from happening on form
        event.preventDefault();

        // dispatch the newImage object to the server
        dispatch({
            type: 'POST_PHOTO',
            payload: newImage
        });

        // Loop through the tags that are being uploaded
        // and post any new tags to the server
        // -- Existing tags will cause a 500 error
        for (let tag of uploadTags){
            dispatch({
                type: 'POST_TAG',
                payload: {
                    tag: tag,
                    imageURL: newImage.imageURL
                }
            })
        };

        // Set toggle button to true to bring user to 
        // image upload success page
        setToggleButton(true);

    };

    // When user successfully uploads an image,
    // and clicks the "add new image button"
    // It will go back to the upload form
    const uploadNewImage = () => {

        // Reset the object back to blank
        setImageURL('');
        setDescription('');
        setStartDate(new Date());

        // Clear the tags from the redux store
        // back to an empty array
        dispatch({ type: 'CLEAR_UPLOAD_TAGS' })

        // Toggle back to false to get back to form
        setToggleButton(false);
    };

    return (
        <>
            {/* 
                ternary to either show image form or 
                image upload success  
            */}
            {toggleButton ?
            <div className="uploadSuccess">
                <p>Upload Success!</p>
                <img src={newImage.imageURL} />
                <p>{newImage.description}</p>
                <button onClick={uploadNewImage}>Upload Another Photo</button>
                <br />
                <Link to='/list'>Back to List View</Link>
            </div>
            : <div>
                <p>Upload New Photo Here</p>
                <input
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                >
                </input>
                <br/>
                <Autocomplete />
                <br/>
                {uploadTags &&
                    uploadTags.map(tag => (
                        <Chip 
                            key={tag}
                            label={tag}
                            onClick={() => console.log('clicked')}
                            onDelete={() => dispatch({ type: 'DELETE_UPLOAD_TAGS', payload: tag})}
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
                <button onClick={handleSubmit}>
                    Upload
                </button>
            </div>}
        </>
    )
};

export default UploadPage;