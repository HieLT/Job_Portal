import {all, fork, put, takeLatest} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {getNotification} from "../../../utils/helper.js";
import {
    requestCreateFail,
    requestCreateSuccess,
    requestDeleteFail,
    requestDeleteSuccess,
    requestUpdateFail,
    requestUpdateSuccess,
    setDataFilter,
    setErrorCreateOrUpdate
} from "./index.js";
import _ from "lodash";
import {getListAdmins} from "../../../api/user/index.js";
import {userInitialData} from "./initialState.js";

function* loadRouteData() {
    yield put(setTitlePage('Admin management'));
    yield put(setBreadcrumb([
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/admins',
            name: 'Admin management'
        },
    ]))
    yield put(getListAdmins(userInitialData.dataFilter));
}

function* handleActions() {
    yield takeLatest(requestCreateSuccess, function* () {
        getNotification('success', 'Created successfully!');
        yield put(setDataFilter(userInitialData.dataFilter));
        yield put(getListAdmins());
    });

    yield takeLatest(requestCreateFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.error
            yield put(setErrorCreateOrUpdate({
                username: _.get(errors, 'username', ''),
                first_name: _.get(errors, 'first_name', ''),
                last_name: _.get(errors, 'last_name', ''),
                email: _.get(errors, 'email', ''),
                password: _.get(errors, 'password', ''),
                mobile: _.get(errors, 'mobile', ''),
            }));
        } else if (statusError === 401) {
            getNotification('error', 'Thông tin không hợp lệ.');
        } else {
            getNotification('error', 'Please try again later!');
        }
    });

    yield takeLatest(requestUpdateSuccess, function* () {
        getNotification('success', 'Updated successfully!');
        yield put(setDataFilter(userInitialData.dataFilter));
        yield put(getListAdmins());
    });

    yield takeLatest(requestUpdateFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.error
            yield put(setErrorCreateOrUpdate({
                username: _.get(errors, 'username', ''),
                first_name: _.get(errors, 'first_name', ''),
                last_name: _.get(errors, 'last_name', ''),
                email: _.get(errors, 'email', ''),
                password: _.get(errors, 'password', ''),
                mobile: _.get(errors, 'mobile', ''),
            }));
        } else if (statusError === 401) {
            getNotification('error', 'Thông tin không hợp lệ.');
        } else {
            getNotification('error', 'Please try again later!');
        }
    });

    yield takeLatest(requestDeleteSuccess, function* () {
        getNotification('success', 'Deleted successfully!');
        yield put(setDataFilter(userInitialData.dataFilter));
        yield put(getListAdmins());
    });

    yield takeLatest(requestDeleteFail, function* () {
        getNotification('error', 'Please try again later!');
        yield;
    });
}

export default function* loadUserSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
