import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Autocomplete from '../UploadPage/Autocomplete';
import DatePicker from 'react-datepicker';

function EditPage () {
    const history = useHistory();
    const dispatch = useDispatch();

    // Fetching the active tags from the redux store
    const currentTags = useSelector(store => store.uploadTags);
    // Fetching the selected photo from the redux store
    const photo = useSelector(store => store.activePhoto);

    useEffect( () => {
        console.log('photo is', photo);
        photo.array_agg && dispatch({ type: 'SET_EDIT_TAGS', payload: photo.array_agg});
    }, [photo]);

    const handleSubmit = () => {
        history.push('/list');


        console.log(photo, currentTags);
        dispatch({
            type: 'UPDATE_EDITED_PHOTO',
            payload: {
                imageURL: photo.imageURL,
                description: photo.description,
                date: photo.to_char,
                tags: currentTags
            }
        })
    };

    return (
        <>
        <h1>Edit Page</h1>
        <img
            src={photo.imageURL}
        />
        Description: 
        <input
            value={photo.description}
            onChange={(event) => dispatch({
                type: 'UPDATE_ACTIVE_PHOTO', 
                payload: {description: event.target.value}
            })}
        >
        </input><br/>
        Current Tags:
        {currentTags !== undefined &&
        currentTags.map(tag => (
            <Chip
                key={tag}
                label={tag}
                onDelete={() => dispatch({ type: 'DELETE_UPLOAD_TAGS', payload: tag})}
            />
        ))}
        <br/>
        New Tags:
        <Autocomplete />
        <br/>
        Date:
        <DatePicker 
            selected={'Feb 01 2022 10:33:42 GMT-0600'}
            onChange={(date) => dispatch({
                type: 'UPDATE_ACTIVE_PHOTO',
                payload: {
                    photoDate: date,
                }})}
                renderInput={(params) => <TextField {...params} />}
        />
        <br/>
        <button onClick={() => handleSubmit()}>
            Accept Changes
        </button>
        <br/>
        <br/>
        <br/>
        <br/>
        </>
    )
};

export default EditPage;