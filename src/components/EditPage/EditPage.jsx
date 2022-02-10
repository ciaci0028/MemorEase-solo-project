import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";


function EditPage () {
    const history = useHistory();

    const photo = useSelector(store => store.activePhoto);

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
        <input
            value={photo.array_agg}
        >
        </input><br/>
        Current Date:
        <input
            value={photo.photoDate}
        >
        </input>
        <br/>
        New Date:
        <DatePicker 
            // selected={photo.photoDate}
        />
        <br/>
        <button onClick={() => handleSubmit()}>
            Accept Changes
        </button>
        </>
    )
};

export default EditPage;