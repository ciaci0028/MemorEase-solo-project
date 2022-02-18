import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import DateFilter from '../Filter/DateFilter';
import moment from 'moment';
// Card MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function ListView() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const photoList = useSelector(store => store.photos);

  //Button for toggling into edit mode
  const [buttonStatus, setButtonStatus] = useState(false);


  // Upon page load, fetch the user's photos
  useEffect(() => {
    dispatch({ type: 'FETCH_PHOTOS', payload: user.id })
  }, []);

  // function for starting delete sequence once in edit mode
  const handleDelete = (photoID) => {
    dispatch({
      type: 'DELETE_PHOTO',
      payload: photoID
    })
  }; // end handleDelete

  // Function for entering into edit mode
  const handleEdit = (photoID) => {
    console.log('in handleEdit', photoID);
  
    dispatch({
      type: 'FETCH_ACTIVE_PHOTO',
      payload: photoID
    });

    history.push('/edit');
  }; // end handleEdit

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
      <br/><br/>
      <Filter />
      <DateFilter />
      { buttonStatus ? 
        <button className="editButton" onClick={() => setButtonStatus(false)}>Done Editing</button>
        : <button className="editButton" onClick={() => setButtonStatus(true)}>Enter Edit Mode</button>
      }
      <p>Back to <Link to="/list">full list view</Link></p>
      <p className="yourPhotosCopy">Your Photos</p>
      {photoList.map(photo => (
        <Card className="photoCards" sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              max-height="500"
              image={photo.imageURL}
              alt={photo.description}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {photo.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tags: {photo.array_agg.join(", ")}
              </Typography>
              <Typography>
                {moment(photo.photoDate).format('MMMM Do, YYYY')}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
    </>
    }
    </>
    
    
  );
}

export default ListView;
