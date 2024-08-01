import {all, fork, put} from "redux-saga/effects";
import {getAppliedJobs} from "../../../api/appliedJobs/index.js";

function* loadRouteData() {
    yield put(getAppliedJobs())
}

function* handleActions() {
}

export default function* loadAppliedJobsSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
