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

        dispatch({
            type: 'UPDATE_EDITED_PHOTO',
            payload: {
                id: photo.id,
                imageURL: photo.imageURL,
                description: photo.description,
                date: photo.photoDate,
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
            selected={photo.photoDate && new Date(photo.photoDate)}
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