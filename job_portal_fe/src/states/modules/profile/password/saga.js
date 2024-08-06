import {all, fork, takeLatest, put, select} from "redux-saga/effects";
import {
    requestChangePasswordFail,
    requestChangePasswordSuccess,
    setChangePasswordData,
    setErrorChangePassword
} from "./index.js";
import {getNotification} from "../../../../utils/helper.js";

function loadRouteData() {
    // TODO
}

function* handleActions() {
    yield takeLatest(requestChangePasswordSuccess, function* () {
        getNotification('success', 'Thay đổi mật khẩu thành công')
        const initialData = {
            currentPassword: '',
            newPassword: '',
            oldPassword: ''
        }
        yield put(setChangePasswordData(initialData))
        yield put(setErrorChangePassword(initialData))
    })

    yield takeLatest(requestChangePasswordFail, function* (action) {
        if (action.payload.status === 400) {
            const errorChangePassword = yield select(state => state.password.errorChangePassword)
            yield put(setErrorChangePassword({
                ...errorChangePassword,
                currentPassword: 'Mật khẩu hiện tại không đúng!'
            }))
        } else {
            getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
        }
    })
}

export default function* loadChangePasswordSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
