import {all, fork, takeLatest, put} from "redux-saga/effects";
import {
    startRequestCreateCandidateFail,
    startRequestCreateCandidateSuccess,
    startRequestCreateCompanySuccess,
    startRequestUpdateCandidateFail,
    startRequestUpdateCandidateSuccess, startRequestUpdateCompanyFail,
    startRequestUpdateCompanySuccess,
    startRequestUploadCandidateAvatarFail,
    startRequestUploadCandidateAvatarSuccess
} from "./index.js";
import {getNotification} from "../../../../utils/helper.js";
import {getMe} from "../../../../api/auth/index.js";

function* loadRouteData() {
    yield put(getMe())
}

function* handleActions() {
    /* Candidate */
    yield takeLatest(startRequestCreateCandidateSuccess, function* () {
        getNotification('success', 'Cập nhật thành công')
        yield put(getMe())
    });

    yield takeLatest(startRequestCreateCandidateFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    });

    yield takeLatest(startRequestUpdateCandidateSuccess, function* () {
        getNotification('success', 'Cập nhật thành công')
    })

    yield takeLatest(startRequestUpdateCandidateFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })

    yield takeLatest(startRequestUploadCandidateAvatarSuccess, function* () {
        getNotification('success', 'Cập nhật thành công')
        yield put(getMe())
    })

    yield takeLatest(startRequestUploadCandidateAvatarFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })

    /* Company */
    yield takeLatest(startRequestCreateCompanySuccess, function* () {
        getNotification('success', 'Cập nhật thành công')
        yield put(getMe())
    });

    yield takeLatest(startRequestCreateCompanySuccess, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    });

    yield takeLatest(startRequestUpdateCompanySuccess, function () {
        getNotification('success', 'Cập nhật thành công')
    })

    yield takeLatest(startRequestUpdateCompanyFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })
}

export default function* loadInformationSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
