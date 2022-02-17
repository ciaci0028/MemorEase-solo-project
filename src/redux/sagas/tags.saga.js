import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Saga for retrieving tags for a user
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

// Saga for posting a new tag
function* postTag(action) {
    try {
        yield axios.post(`/api/tags`, action.payload);
    }
    catch (error) {
        console.log('post tag failure', error)
    }
}

function* fetchTagsSaga() {
    yield takeEvery('FETCH_TAGS', fetchTags);
    yield takeEvery('POST_TAG', postTag);
};

export default fetchTagsSaga;
