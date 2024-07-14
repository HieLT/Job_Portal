import {all, fork, put, takeLatest} from "redux-saga/effects";
import {
    requestSignupFail,
    requestSignupSuccess,
    setErrorLogin,
    setErrorSignup,
    startRequestGetMeFail,
    startRequestLoginFail,
    startRequestLoginSuccess
} from "./index.js";
import {setAuthToken} from "../../../utils/localStorage";
import {getMe} from "../../../api/auth/index.js";
import {goToPage} from "../app/index.js";
import _ from "lodash";
import {getNotification} from "../../../utils/helper.js";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(startRequestLoginSuccess, function* (action) {
        let token = action.payload.data.token;
        setAuthToken(token);
        yield put(goToPage({
            path: "/"
        }))
        yield put(getMe());
    });

    yield takeLatest(startRequestLoginFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.error
            if (!_.isEmpty(errors)) {
                yield put(setErrorLogin({
                    username: _.get(errors, 'username', ''),
                    password: _.get(errors, 'password', '')
                }));
            } else {
                getNotification('error', action.payload.data.message);
            }
        } else if (statusError === 401) {
            getNotification('error', 'Incorrect username or password!');
        } else if (statusError === 404){
            getNotification('error', action.payload.data.message);
        } else {
            getNotification('error', 'Please try again later!');
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
        getNotification('success', 'Signed up successfully')
    });

    yield takeLatest(requestSignupFail, function* (action) {
        let errors = action.payload.data.error
        if (action.payload.status === 400) {
            if (_.isEmpty(errors)) {
                getNotification('error', action.payload.data.message)
            } else {
                yield put(setErrorSignup({
                    email: _.get(errors, 'email', ''),
                    mobile: _.get(errors, 'mobile', ''),
                    username: _.get(errors, 'username', ''),
                    password: _.get(errors, 'password', '')
                }));
            }
        } else {
            getNotification('error', 'Please try again later!')
        }
    })
}

export default function* loadAuthSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
