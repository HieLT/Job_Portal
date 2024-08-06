import {all, fork, put, takeLatest} from "redux-saga/effects";
import {getAppliedCandidate} from "../../../api/jobManagement/index.js";
import {
    requestConfirmDownloadedResumeFail,
    requestConfirmDownloadedResumeSuccess,
    requestConfirmSeenResumeFail,
    requestConfirmSeenResumeSuccess
} from "./index.js";
import {downloadFile, getNotification} from "../../../utils/helper.js";

function* loadRouteData() {
    yield put(getAppliedCandidate())
}

function* handleActions() {
    yield takeLatest(requestConfirmSeenResumeSuccess, function* (action) {
        const fileUrl = action.payload.resume_path
        yield put(getAppliedCandidate())
        window.open(fileUrl)
    })

    yield takeLatest(requestConfirmSeenResumeFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })

    yield takeLatest(requestConfirmDownloadedResumeSuccess, function* (action) {
        yield put(getAppliedCandidate())
        downloadFile(action.payload.resume_path)
            .then(() => getNotification('success', 'Tải xuống thành công'))
            .catch(() => getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau'))
    })

    yield takeLatest(requestConfirmDownloadedResumeFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    })
}

export default function* loadApplicantSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
