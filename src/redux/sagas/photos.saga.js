import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Saga for retrieving photos for user
function* fetchPhotos() {
    try {
        const response = yield axios.get(`/api/photos/`);
        yield put({
            type: 'SET_PHOTOS',
            payload: response.data
        })
    }
    catch (error) {
        console.log('photo fetch failed', error);
    }
};

// Function for deleting photo
function* deletePhoto(action) {
    try {
        const response = yield axios.delete(`/api/photos/${action.payload}`);
        yield put({ type: 'FETCH_PHOTOS' })
    }
    catch (error) {
        console.log('delete photo saga error', error);
    }
};

// Function for retrieving a random memory
function* retrieveMemory () {
    try {
        const response = yield axios.get(`/api/memory/`);
        yield put({ type: 'SET_MEMORY', payload: response.data })
    }
    catch (error) {
        console.log('retrieve memory failure', error);
    }
};

// Functiong for the upload/posting a new photo
function* postPhoto (action) {
    try {
        const response = yield axios.post(`/api/photos`, action.payload);
    }
    catch (error) {
        console.log('post photo error', error)
    }
};

// Function grabs the active photo to prepare for editing
function* activePhoto (action) {
    try {
        const response = yield axios.get(`/api/edit/${action.payload}`);
        yield put({ type: 'SET_ACTIVE_PHOTO', payload: response.data })        
    }
    catch (error) {
        console.log('active photo error', error)
    }
};

// Function for the put and editing the selected photo
function* updatePhoto (action) {
    try {
        
        yield axios.put(`/api/photos/${action.payload.id}`, action.payload);
    }
    catch (error) {
        console.log('failed to update photo', error)
    }
}

// make this fetchable by whole app
function* fetchPhotosSaga () {
    yield takeEvery('FETCH_PHOTOS', fetchPhotos);
    yield takeEvery('DELETE_PHOTO', deletePhoto);
    yield takeEvery('RETRIEVE_MEMORY', retrieveMemory);
    yield takeEvery('POST_PHOTO', postPhoto);
    yield takeEvery('FETCH_ACTIVE_PHOTO', activePhoto);
    yield takeEvery('UPDATE_EDITED_PHOTO', updatePhoto);
}

export default fetchPhotosSaga;