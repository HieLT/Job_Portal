import {all, fork, takeLatest} from "redux-saga/effects";
import { getNotification } from "../../../utils/helper";
import { requestDeleteCandidateFail, requestDeleteCandidateSuccess, requestDeleteCompanyFail, requestDeleteCompanySuccess, 
        requestRestoreCandidateFail, requestRestoreCandidateSuccess, requestRestoreCompanyFail, requestRestoreCompanySuccess} 
        from "./index";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(requestDeleteCandidateSuccess, function *() {
        getNotification('success' , 'Xóa Tài Khoản thành công')
    })
    yield takeLatest(requestDeleteCandidateFail, function *() {
        getNotification('error' , 'Xóa Tài Khoản không thành công')
    })
    yield takeLatest(requestRestoreCandidateSuccess, function *() {
        getNotification('success' , 'Khôi phục tài khoản thành công')
    })
    yield takeLatest(requestRestoreCandidateFail, function *() {
        getNotification('error' , 'Khôi phục tài khoản thật bại')
    })
    yield takeLatest(requestDeleteCompanySuccess, function *() {
        getNotification('success' , 'Xóa Tài Khoản thành công')
    })
    yield takeLatest(requestDeleteCompanyFail, function *() {
        getNotification('error' , 'Xóa Tài Khoản không thành công')
    })
    yield takeLatest(requestRestoreCompanySuccess, function *() {
        getNotification('success' , 'Khôi phục tài khoản thành công')
    })
    yield takeLatest(requestRestoreCompanyFail, function *() {
        getNotification('error' , 'Khôi phục tài khoản thất bại')
    })

}

export default function* loadAdminSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
