import {all, fork, takeLatest, put} from "redux-saga/effects";
import {requestUpdateStatusFail, requestUpdateStatusSuccess} from "./index.js";
import {getNotification} from "../../../utils/helper.js";
import {getJobsAboutToExpire, getQuantity} from "../../../api/companyDashboard/index.js";

function* loadRouteData() {
    yield put(getQuantity())
    yield put(getJobsAboutToExpire())
}

function* handleActions() {
    yield takeLatest(requestUpdateStatusSuccess, function* () {
        getNotification('success', 'Cập nhật trạng thái thành công')
        yield put(getJobsAboutToExpire())
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
