import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Saga for retrieving photos
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

function* deletePhoto(action) {
    try {
        const response = yield axios.delete(`/api/photos/${action.payload}`);
        yield put({ type: 'FETCH_PHOTOS' })
    }
    catch (error) {
        console.log('delete photo saga error', error);
    }
};

function* retrieveMemory () {
    try {
        const response = yield axios.get(`/api/memory/`);
        yield put({ type: 'SET_MEMORY', payload: response.data })
    }
    catch (error) {
        console.log('retrieve memory failure', error);
    }
}

// make this fetchable by whole app
function* fetchPhotosSaga () {
    yield takeEvery('FETCH_PHOTOS', fetchPhotos);
    yield takeEvery('DELETE_PHOTO', deletePhoto);
    yield takeEvery('RETRIEVE_MEMORY', retrieveMemory);
}

export default fetchPhotosSaga;