import {all, fork, put, takeLatest} from "redux-saga/effects";
import {
    requestChangePasswordFail,
    requestChangePasswordSuccess,
    setDataChangePassword,
    setErrorChangePassword,
    setErrorInformation,
    startRequestUpdateInformationFail,
    startRequestUpdateInformationSuccess
} from "./index.js";
import {getNotification} from "../../../utils/helper.js";
import _ from "lodash";
import {getMe} from "../../../api/auth/index.js";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(startRequestUpdateInformationSuccess, function* () {
        getNotification('success', 'Cập nhật thông tin thành công!');
        yield put(getMe());
    })

    yield takeLatest(startRequestUpdateInformationFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.errors
            yield put(setErrorInformation({
                name: _.get(errors, 'name[0]', ''),
                email: _.get(errors, 'email[0]', ''),
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            getNotification('error', (message ? message : 'Thông tin không hợp lệ!'));
        } else {
            getNotification('error', 'Please try again later!');
        }
    });

    yield takeLatest(requestChangePasswordSuccess, function* () {
        getNotification('success', 'Thay đổi mật khẩu thành công!');
        yield put(setDataChangePassword({
            currentPassword: '',
            password: '',
            confirmPassword: '',
        }));
    })

    yield takeLatest(requestChangePasswordFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.errors
            yield put(setErrorChangePassword({
                currentPassword: _.get(errors, 'current_password[0]', ''),
                password: _.get(errors, 'password[0]', ''),
                confirmPassword: _.get(errors, 'password_confirmation[0]', ''),
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            const errors = action.payload.data.error;
            if (errors) {
                yield put(setErrorChangePassword({
                    currentPassword: _.get(errors, 'current_password', ''),
                    password: _.get(errors, 'password', ''),
                    confirmPassword: _.get(errors, 'password_confirmation', ''),
                }));
            } else {
                getNotification('error', (message ? message : 'Thông tin không hợp lệ!'));
            }
        } else {
            getNotification('error', 'Please try again later!');
        }
    });
}

export default function* loadProfileSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
