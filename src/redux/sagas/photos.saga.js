import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Saga for retrieving photos
function* fetchPhotos() {
    try {
        const response = yield axios.get(`/${action.payload}`)
    }
    catch (error) {
        console.log('photo fetch failed', error);
    }
};

// make this fetchable by whole app
function* fetchPhotosSaga () {
    yield takeEvery('GET_PHOTOS', fetchPhotos);
}

export default fetchPhotosSaga;