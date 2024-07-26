import {all, fork, put} from "redux-saga/effects";
import {getAppliedCandidate} from "../../../api/jobManagement/index.js";

function* loadRouteData() {
    yield put(getAppliedCandidate())
}

function* handleActions() {

}

export default function* loadApplicantSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
