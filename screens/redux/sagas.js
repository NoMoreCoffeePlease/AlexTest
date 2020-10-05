import {takeEvery, put} from 'redux-saga/effects';
import {
    GET_COUNTRY,
    GET_COUNTRY_REQUEST
} from './actions'

function* getCountry() {
    yield takeEvery(GET_COUNTRY_REQUEST, getCountryAction);
}

function* getCountryAction(action) {
    try{
        yield put({
            type: GET_COUNTRY,
            payload: 'Ungaria',
        });
    } catch (err) {}
}

export {getCountry}