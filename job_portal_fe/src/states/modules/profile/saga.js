import {all, call, fork, select, takeLatest} from "redux-saga/effects";
import {setTab} from "./index.js";
import loadInformationSaga from "./information/saga.js";
import loadChangePasswordSaga from "./password/saga.js";
import loadCVSaga from "./cv/saga.js";
import {getNotification} from "../../../utils/helper.js";
import _ from "lodash";
import {USER_ROLE} from "../../../utils/constants.js";

function* loadRouteData() {
    const authUser = yield select(state => state.auth.authUser)
    if (_.isEmpty(authUser.profile)) {
        const isCandidate = authUser?.account?.role === USER_ROLE['CANDIDATE']
        getNotification(
            'warning',
            `Vui lòng cập nhật thông tin ${isCandidate ? 'cá nhân' : 'doanh nghiệp'} trước`
        )
    }
}

function* handleActions() {
    yield takeLatest(setTab, function* (action) {
        const chosenTab = action.payload
        switch (chosenTab) {
            case 'information':
                yield call(loadInformationSaga)
                break
            case 'cv':
                yield call(loadCVSaga)
                break
            case 'password':
                yield call(loadChangePasswordSaga)
                break
        }
    })
}

export default function* loadProfileSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
