import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Filter from '../Filter/Filter';

function ListView() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const photoList = useSelector(store => store.photos);

  //Button for toggling into edit mode
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_PHOTOS', payload: user.id })
  }, []);

  // function for starting delete sequence once in edit mode
  const handleDelete = (photoID) => {
    dispatch({
      type: 'DELETE_PHOTO',
      payload: photoID
    })
  };

  // Function for entering into edit mode
  const handleEdit = (photoID) => {
    console.log('in handleEdit', photoID);
  
    dispatch({
      type: 'FETCH_ACTIVE_PHOTO',
      payload: photoID
    });

    history.push('/edit');
  };

  return (
    <div className="container">
      { buttonStatus ? 
        <button onClick={() => setButtonStatus(false)}>Done Editing</button>
        : <button onClick={() => setButtonStatus(true)}>Edit Mode</button>
      }
      <br/><br/>
      <Filter />
      <p>Your Photos</p>
      {photoList.map(photo => (
        <div key={photo.photoID}>
        <img src={photo.imageURL} />
        <p>Photo of {photo.array_agg.join(", ")} from {photo.to_char}</p>
        <p>{photo.description}</p>
        { buttonStatus && 
          <div>
            <button onClick={() => handleEdit(photo.photoID)}>Edit</button>
            <button onClick={() => handleDelete(photo.photoID)}>Delete</button>
          </div>
        }
        </div>
      ))}
    </div>
  );
}

export default ListView;
