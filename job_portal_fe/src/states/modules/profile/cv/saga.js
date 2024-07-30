import {all, fork, put, takeLatest, select} from "redux-saga/effects";
import {
    setIsOpenModalDelete, setNewFile,
    startRequestDeleteCvFail,
    startRequestDeleteCvSuccess,
    startRequestUploadCvFail,
    startRequestUploadCvSuccess
} from "./index.js";
import {getNotification} from "../../../../utils/helper.js";
import {getMyResumes} from "../../../../api/profile/index.js";
import _ from "lodash";

function* loadRouteData() {
    yield put(setNewFile({}))
    const authUser = yield select(state => state.auth.authUser)
    if (!_.isEmpty(authUser?.profile)) {
        yield put(getMyResumes())
    }
}

function* handleActions() {
    yield takeLatest(startRequestUploadCvSuccess, function* () {
        getNotification('success', 'Cập nhật CV thành công')
        yield put(getMyResumes())
    })
    yield takeLatest(startRequestUploadCvFail, function (action) {
        const statusCode = action.payload.status
        if (statusCode === 400) {
            getNotification('error', 'Tên file đã tồn tại!')
        } else {
            getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
        }
    })

    yield takeLatest(startRequestDeleteCvSuccess, function* () {
        getNotification('success', 'Xóa CV thành công')
        yield put(setIsOpenModalDelete(false))
        yield put(getMyResumes())
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
