import {all, fork, put, takeLatest} from "redux-saga/effects";
import {getCategories, getJobList} from "../../../api/jobManagement/index.js";
import {
    setVisibleModalCreateOrUpdate,
    startRequestPostJobFail,
    startRequestPostJobSuccess,
    startRequestUpdateJobFail,
    startRequestUpdateJobSuccess
} from "./index.js";
import {getNotification} from "../../../utils/helper.js";

function* loadRouteData() {
    yield put(getJobList())
    yield put(getCategories())
}

function* handleActions() {
    yield takeLatest(startRequestPostJobSuccess, function* () {
        getNotification('success', 'Đăng tuyển thành công')
        yield put(getJobList())
        yield put(setVisibleModalCreateOrUpdate(false))
    })

    yield takeLatest(startRequestPostJobFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })

    yield takeLatest(startRequestUpdateJobSuccess, function* () {
        getNotification('success', 'Cập nhật thành công')
        yield put(getJobList())
        yield put(setVisibleModalCreateOrUpdate(false))
    })

    yield takeLatest(startRequestUpdateJobFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })
}

export default function* loadJobManagementSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
