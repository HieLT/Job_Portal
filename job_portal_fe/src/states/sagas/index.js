import {all, fork} from 'redux-saga/effects'
import appSaga from '../modules/app/saga.js';
import profileSaga from '../modules/profile/saga.js';
import routeSaga from '../modules/routing/saga';

export default function* sagas() {
    yield all([
        fork(routeSaga),
        // fork(profileSaga),
        fork(appSaga),
    ]);
}
