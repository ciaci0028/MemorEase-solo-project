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

// make this fetchable by whole app
function* fetchPhotosSaga () {
    yield takeEvery('FETCH_PHOTOS', fetchPhotos);
}

export default fetchPhotosSaga;