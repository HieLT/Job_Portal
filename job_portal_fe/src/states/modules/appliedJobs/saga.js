import {all, fork} from "redux-saga/effects";

function* loadRouteData() {

}

function* handleActions() {
}

export default function* loadAppliedJobsSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
