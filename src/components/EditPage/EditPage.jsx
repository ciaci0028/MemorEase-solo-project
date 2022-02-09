import { useSelector } from 'react-redux';

function EditPage () {

    const photo = useSelector(store => store.activePhoto);

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
        </>
    )
};

export default EditPage;