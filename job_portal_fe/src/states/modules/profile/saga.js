import {all, fork, select, takeLatest, call} from "redux-saga/effects";
import {setTab} from "./index.js";
import loadInformationSaga from "./information/saga.js";
import loadChangePasswordSaga from "./password/saga.js";
import loadCVSaga from "./cv/saga.js";

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
}

export default function* loadProfileSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
