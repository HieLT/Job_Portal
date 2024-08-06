import {all, fork, put} from "redux-saga/effects";
import { GetJob } from "../../../api/home";
import { getCategories } from "../../../api/jobManagement/index";
function* loadRouteData() {
    yield put(GetJob('','','','',1))
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
