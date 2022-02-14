import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Chip from '@mui/material/Chip';
import Autocomplete from '../UploadPage/Autocomplete';

function EditPage () {
    const history = useHistory();
    const dispatch = useDispatch();

    // Fetching the active tags from the redux store
    const currentTags = useSelector(store => store.uploadTags);
    // Fetching the selected photo from the redux store
    const photo = useSelector(store => store.activePhoto);
    // Setting value of description to change as typing
    const [photoDescription, setPhotoDescription] = useState(photo.description);
    // Local state for photoDate edits
    const [newDate, setNewDate] = useState(photo.to_char);

    useEffect( () => {
        if (photo.array_agg) {dispatch({ type: 'SET_EDIT_TAGS', payload: photo.array_agg})};
    }, []);

    const handleSubmit = () => {
        history.push('/list');


        console.log(newDate, photoDescription, photo.imageURL, photo.id, currentTags);
        // dispatch({
        //     type: 'UPDATE_EDITED_PHOTO',
        //     payload: {
        //         imageURL: photo.imageURL,
                
        //     }
        // })

    };

    return (
        <>
        <h1>Edit Page</h1>
        <img
            src={photo.imageURL}
        />
        Description: 
        <input
            value={photoDescription}
            onChange={(event) => setPhotoDescription(event.target.value)}
        >
        </input><br/>
        Current Tags:
        {currentTags &&
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
            selected={newDate}
            onChange={(date) => setNewDate(date)}
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