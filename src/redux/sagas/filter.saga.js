import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Saga for retrieving photos
function* fetchFilteredPhotos(action) {
    console.log('in fetch filtered photos', action.payload);
    try {
        const response = yield axios.get(`/api/photos/filter/${action.payload}`);
        console.log('filter response is', response.data);
        yield put({
            type: 'SET_PHOTOS',
            payload: response.data
        })
    }
    catch (error) {
        console.log('filter fetch failed', error);
    }
};

function* filterByDate(action) {
    console.log('in filter saga by date', action.payload);

    try {
        const response = yield axios.get(`/api/photos/${action.payload.month}/${action.payload.day}`);
        yield put({
            type: 'SET_PHOTOS',
            payload: response.data
        })
    }
    catch (error) {
        console.log('error in fetching photos by date', error)
    }
}

// make this fetchable by whole app
function* fetchFilterSaga () {
    yield takeEvery('FILTER_PHOTOS', fetchFilteredPhotos);
    yield takeEvery('FILTER_BY_DATE', filterByDate);
}

export default fetchFilterSaga;