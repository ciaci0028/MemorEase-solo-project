import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Saga for retrieving tags
function* fetchTags(action) {
    try {
        const response = yield axios.get(`/api/tags/${action.payload}`);

        yield put({
            type: 'SET_TAGS',
            payload: response.data
        })
    }
    catch (error) {
        console.log('tag fetch failed', error);
    }
};

function* fetchTagsSaga() {
    yield takeEvery('FETCH_TAGS', fetchTags);
};

export default fetchTagsSaga;
