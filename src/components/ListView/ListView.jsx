import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import DateFilter from '../Filter/DateFilter';
import moment from 'moment';
// Masonry
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
// Photo Zoom
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';


function ListView() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const photoList = useSelector(store => store.photos);

  //Button for toggling into edit mode
  const [buttonStatus, setButtonStatus] = useState(false);
  const [description, setDescription] = useState('');
  const [clickedPhoto, setClickedPhoto] = useState({ array_agg: []});


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

  // Label for Masonry
  const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  // Variable for pop up box
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // More for Modal pop up
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleOpen = (photo) => {
    setOpen(true);
    setClickedPhoto(photo);
    console.log('clicked photo is', photo)
    setModalImage(photo.imageURL);
    setDescription(photo.description)
  };

  const handleClose = () => setOpen(false);

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
      <div className="smallerContainer">
        <Filter />
        <DateFilter />
        { buttonStatus ? 
          <EditOffOutlinedIcon className="editButton" onClick={() => setButtonStatus(false)} />
          : <EditOutlinedIcon className="editButton" onClick={() => setButtonStatus(true)} />
        }
      </div>
    <Box className="masonry" sx={{ width: 450, minHeight: 829 }}>
      <Masonry columns={3} spacing={2}>
        {photoList.map((photo) => (
          <div key={photo.id}>
            {/* <Label>{photo.description}<br/>
            {moment(photo.photoDate).format('MMMM Do, YYYY')}
            </Label> */}
            <img
              src={`${photo.imageURL}?w=162&auto=format`}
              srcSet={`${photo.imageURL}?w=162&auto=format&dpr=2 2x`}
              alt={photo.description}
              loading="lazy"
              className="listImages"
              onClick={() => handleOpen(photo)}
              id={photo.id}
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />
            {/* {photo.array_agg.length > 0 && <Label>Tags: {photo.array_agg.join(", ")}</Label>} */}
            { buttonStatus && 
              <div>
                <button className="editDeleteButton" onClick={() => handleEdit(photo.photoID)}>Edit</button>
                <button className="editDeleteButton" onClick={() => handleDelete(photo.photoID)}>Delete</button>
              </div>
            }
          </div>
        ))}
      </Masonry>
    </Box>
    </div>
    </>
    }
    <div>
      <Modal
        open={open}
        onClick={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={modalImage} />
          <p className="descriptionCopy">{description && description}</p>
          <p className="descriptionCopy">{clickedPhoto && moment(clickedPhoto.photoDate).format('MMMM Do, YYYY')}</p>
          <p className="descriptionCopy">Tags: {clickedPhoto && clickedPhoto?.array_agg.join(", ")}</p>
        </Box>
      </Modal>
    </div>
    </>
  );
}

export default ListView;
