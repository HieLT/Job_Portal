import {all, fork, put} from "redux-saga/effects";
import { getAllJob } from "../../../api/home";
function* loadRouteData() {
    yield put(getAllJob())
}

function* handleActions() {

}

export default function* loadHomeSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
