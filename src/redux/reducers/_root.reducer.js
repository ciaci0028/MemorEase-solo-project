import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import photos from './photos.reducer';
import tags from './tags.reducer';
import memory from './memory.reducer';
import activePhoto from './activePhoto.reducer';
import uploadTags from './uploadTags.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  photos, // will import photos according to SQL query
  tags, //import all tags for filtering
  memory, // random memory or on this day
  activePhoto, // active selected photo for editing
  uploadTags, // local state only, to store tags while user is uploading
});

export default rootReducer;
