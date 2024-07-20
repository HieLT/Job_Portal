import {all, fork} from "redux-saga/effects";

function loadRouteData() {
    // TODO
}

function* handleActions() {
    
}

export default function* loadInformationSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
