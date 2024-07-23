import {all, fork, put, takeLatest} from "redux-saga/effects";
import {
    setIsOpenModalDelete,
    startRequestDeleteCvFail,
    startRequestDeleteCvSuccess,
    startRequestUploadCvFail,
    startRequestUploadCvSuccess
} from "./index.js";
import {getNotification} from "../../../../utils/helper.js";
import {getMe} from "../../../../api/auth/index.js";

function loadRouteData() {
    // TODO
}

function* handleActions() {
    yield takeLatest(startRequestUploadCvSuccess, function* () {
        getNotification('success', 'Cập nhật CV thành công')
        yield put(getMe())
    })
    yield takeLatest(startRequestUploadCvFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })

    yield takeLatest(startRequestDeleteCvSuccess, function* () {
        getNotification('success', 'Xóa CV thành công')
        yield put(setIsOpenModalDelete(false))
        yield put(getMe())
    })
    yield takeLatest(startRequestDeleteCvFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })
}

export default function* loadCVSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
