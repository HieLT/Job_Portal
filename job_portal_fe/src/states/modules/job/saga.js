import {all, fork, takeLatest} from "redux-saga/effects";
import { startRequestSubmitJobFail, startRequestSubmitJobSuccess } from "./index";
import { getNotification } from "../../../utils/helper";

function* loadRouteData() {

}

function* handleActions() {
    yield takeLatest(startRequestSubmitJobSuccess, function () {
        getNotification('success', 'Ứng tuyển thành công')
    })  
    yield takeLatest(startRequestSubmitJobFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })
}

export default function* loadJobSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
