import {all, fork, put} from "redux-saga/effects";
import { getJob } from "../../../api/home";
import { getCategories } from "../../../api/jobManagement/index";
function* loadRouteData() {
    yield put(getJob('','','','',1))
    yield put(getCategories())
}

function* handleActions() {

}

export default function* loadHomeSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
