import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Saga for retrieving photos
function* fetchPhotos() {
    try {
        const response = yield axios.get('/')
    }
    catch (error) {
        console.log('photo fetch failed', error);
    }
}