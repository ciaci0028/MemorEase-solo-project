import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Chip from '@mui/material/Chip';
import Autocomplete from '../UploadPage/Autocomplete';

function EditPage () {
    const history = useHistory();

    const uploadTags = useSelector(store => store.uploadTags);
    const photo = useSelector(store => store.activePhoto);
    console.log('in edit, upload tags are', uploadTags);

    const handleSubmit = () => {
        history.push('/list');
    }

    return (
        <>
        <h1>Edit Page</h1>
        <img
            src={photo.imageURL}
        />
        Description: 
        <input
            value={photo.description}
        >
        </input><br/>
        Current Tags:
        {photo.array_agg &&
        photo.array_agg.map(tag => (
            <Chip
                key={tag}
                label={tag}
                onDelete={() => console.log('deleted photo')}
            />
        ))}
        <br/>
        New Tags:
        <Autocomplete />
        <button
            onClick={() => console.log('new Tag submitted')}
        >Submit New Tag</button>
        <br/>
        Date:
        <DatePicker 
            value={photo.to_char}
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