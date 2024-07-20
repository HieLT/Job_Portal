import {all, call, fork, takeLatest} from "redux-saga/effects";
import {setTab} from "./index.js";
import loadInformationSaga from "./information/saga.js";
import loadChangePasswordSaga from "./password/saga.js";
import loadCVSaga from "./cv/saga.js";
import {startRequestCreateCandidateFail, startRequestCreateCandidateSuccess} from "./information/index.js";
import {getNotification} from "../../../utils/helper.js";
import {setProfile} from "../../../utils/localStorage.js";

function* loadRouteData() {
    //
}

function* handleActions() {
    let chosenTab = 'information'
    yield takeLatest(setTab, function* (action) {
        chosenTab = action.payload
        switch (chosenTab) {
            case 'cv':
                yield call(loadCVSaga)
                break
            case 'password':
                yield call(loadChangePasswordSaga)
                break
            default:
                yield call(loadInformationSaga)
                break
        }
    })

    yield takeLatest(startRequestCreateCandidateSuccess, function () {
        getNotification('success', 'Cập nhật thành công')
        setProfile(1)
    });

    yield takeLatest(startRequestCreateCandidateFail, function () {
        getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau')
    });
}

export default function* loadProfileSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
