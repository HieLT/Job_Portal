import {all, fork, put, select, takeLatest} from "redux-saga/effects";
import {
    requestSignupFail,
    requestSignupSuccess,
    requestVerifyEmailFail,
    setErrorSignup,
    setVerifyResult,
    startRequestGetMeFail,
    startRequestLoginFail,
    startRequestLoginSuccess
} from "./index.js";
import {setAuthEmail, setAuthRole, setAuthToken, setProfile} from "../../../utils/localStorage";
import {getMe} from "../../../api/auth/index.js";
import {goToPage} from "../app/index.js";
import {getNotification} from "../../../utils/helper.js";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(startRequestLoginSuccess, function* (action) {
        let token = action.payload.account.token;
        let email = action.payload.account.email;
        let role = action.payload.account.role;
        setAuthToken(token);
        setAuthEmail(email);
        setAuthRole(role);
        if (!action.payload.profile) {
            setProfile(0)
        } else {
            setProfile(1)
        }
        yield put(goToPage({
            path: "/account/profile"
        }))
        // yield put(getMe());
    });

    yield takeLatest(startRequestLoginFail, function (action) {
        let statusError = action.payload.status
        if (statusError === 401) {
            getNotification('error', 'Email hoặc mật khẩu không đúng!');
        } else if (statusError === 404) {
            getNotification('error', 'Người dùng không tồn tại!');
        } else if (statusError === 403) {
            getNotification('error', 'Email chưa được kich hoạt!');
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
}

export default function* loadAuthSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
