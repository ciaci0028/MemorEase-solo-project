import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import DateFilter from '../Filter/DateFilter';
import moment from 'moment';


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
    <>
    {photoList.length === 0 ? 
      <>
      <p>You do not currently have any photos uploaded!</p>
      <p>Upload new photos <Link to="/upload">here</Link></p>
      </>
    :
    <>
    <div className="container">
      { buttonStatus ? 
        <button onClick={() => setButtonStatus(false)}>Done Editing</button>
        : <button onClick={() => setButtonStatus(true)}>Edit Mode</button>
      }
      <br/><br/>
      <Filter />
      <p>Back to <Link to="/list">full list view</Link></p>
      <DateFilter />
      <p>Your Photos</p>
      {photoList.map(photo => (
        <div key={photo.photoID}>
        <img src={photo.imageURL} />
        <p>Photo of {photo.array_agg.join(", ")} from {moment(photo.photoDate).format('MMMM Do, YYYY')}</p>
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
    </>
    }
    </>
    
    
  );
}

export default ListView;
