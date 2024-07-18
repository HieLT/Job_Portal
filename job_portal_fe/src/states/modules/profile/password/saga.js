import {all, fork} from "redux-saga/effects";

function loadRouteData() {
    // TODO
}

function* handleActions() {
}

export default function* loadChangePasswordSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
