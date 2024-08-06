import {all, fork, put, select, takeLatest} from "redux-saga/effects";
import {
    requestSignupFail,
    requestSignupSuccess,
    requestVerifyEmailFail,
    setErrorSignup,
    setVerifyResult, startRequestForgotPasswordFail, startRequestForgotPasswordSuccess,
    startRequestGetMeFail,
    startRequestLoginFail,
    startRequestLoginSuccess, startRequestResetPasswordFail, startRequestResetPasswordSuccess
} from "./index.js";
import {setAuthToken} from "../../../utils/localStorage";
import {goToPage} from "../app/index.js";
import {getNotification} from "../../../utils/helper.js";
import {USER_ROLE} from "../../../utils/constants.js";
import _ from "lodash";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(startRequestLoginSuccess, function* (action) {
        let token = action.payload.account.token;
        setAuthToken(token);
        if (!_.isEmpty(action.payload.profile)) {
            yield put(goToPage({
                path: '/'
            }))
        } else {
            if (action.payload.account?.role === USER_ROLE['ADMIN']) {
                yield put(goToPage({
                    path: "/admin/dashboard"
                }))
            } else {
                yield put(goToPage({
                    path: "/account/profile"
                }))
            }
        }
    });

    yield takeLatest(startRequestLoginFail, function (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            getNotification('error', 'Email hoặc mật khẩu không đúng!');
        } else if (statusError === 404 || statusError === 401) {
            getNotification('error', 'Người dùng không tồn tại!');
        } else if (statusError === 403) {
            if (action.payload.data.message === 'Your account has been deleted') {
                getNotification('error', 'Tài khoản của bạn đã bị khóa!');
            } else {
                getNotification('error', 'Email chưa được kich hoạt!');
            }
        } else {
            getNotification('error', 'Đã xảy ra lỗi, vui lòng thử lại sau!');
        }
    });

    yield takeLatest(startRequestGetMeFail, function (action) {
        let status = action.payload.status
        if (status === 401) {
            getNotification('error', action.payload.data.message)
        }
    });

    yield takeLatest(requestSignupSuccess, function* () {
        yield put(goToPage({
            path: "/login"
        }))
        getNotification('success', 'Đăng ký thành công')
    });

    yield takeLatest(requestSignupFail, function* (action) {
        const errorSignup = yield select(state => state.auth.errorSignup)
        if (action.payload.status === 400) {
            yield put(setErrorSignup({
                ...errorSignup,
                email: 'Email đã tồn tại!'
            }));
        } else {
            getNotification('error', 'Đã xảy ra lỗi, vui lòng thử lại sau!')
        }
    })

    yield takeLatest(requestVerifyEmailFail, function* (action) {
        if (action.payload.status === 400) {
            yield put(setVerifyResult({
                type: 0,
                message: 'Mã xác thực không hợp lệ'
            }))
        } else {
            yield put(setVerifyResult({
                type: 0,
                message: 'Xác thực email thất bại'
            }))
        }
    })

    yield takeLatest(startRequestForgotPasswordSuccess, function () {
        getNotification('success', 'Đường dẫn cập nhật mật khẩu đã được gửi đến email của bạn')
    })

    yield takeLatest(startRequestForgotPasswordFail, function (action) {
        if (action.payload.status === 404) {
            getNotification('error', 'Không có tài khoản nào dùng email này')
        } else {
            getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
        }
    })

    yield takeLatest(startRequestResetPasswordSuccess, function* () {
        getNotification('success', 'Đặt lại mật khẩu thành công')
        yield put(goToPage({path: '/login'}))
    })

    yield takeLatest(startRequestResetPasswordFail, function (action) {
        if (action.payload.status === 400) {
            getNotification('error', 'Mã xác thực không hợp lệ')
        } else {
            getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
        }
    })
}

export default function* loadAuthSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
