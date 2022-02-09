import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../Filter/Filter';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function ListView() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const photoList = useSelector(store => store.photos);

  //Button for toggling into edit mode
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_PHOTOS', payload: user.id })
  }, []);

  console.log('photos are', photoList);

  const handleEditMode = () => {
    ;
  };

  // function for starting delete sequence
  const handleDelete = (photoID) => {
    console.log('in handleDelete, photoID is', photoID);

    dispatch({
      type: 'DELETE_PHOTO',
      payload: photoID
    });

  }

  console.log('button status', buttonStatus);

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
        <p>Photo of {photo.array_agg.join(", ")} from {photo.photoDate}</p>
        <p>{photo.description}</p>
        { buttonStatus && 
          <div>
            <button>Edit</button>
            <button onClick={() => handleDelete(photo.photoID)}>Delete</button>
          </div>
        }
        </div>
      ))}
    </div>
  );
}

export default ListView;
