import {all, fork, takeLatest} from "redux-saga/effects";
import {requestUpdateStatusFail, requestUpdateStatusSuccess} from "./index.js";
import {getNotification} from "../../../utils/helper.js";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(requestUpdateStatusSuccess, function () {
        getNotification('success', 'Cập nhật trạng thái thành công')
    })

    yield takeLatest(requestUpdateStatusFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })
}

export default function* loadCompanyDashboardSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
