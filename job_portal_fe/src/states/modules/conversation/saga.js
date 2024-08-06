import {all, fork, put, select, takeLatest} from "redux-saga/effects";
import {getAllConversations, getAppliedCompanies} from "../../../api/conversation/index.js";
import {USER_ROLE} from "../../../utils/constants.js";
import {requestGetOldMessagesFail, requestGetOldMessagesSuccess} from "./index.js";
import {getNotification} from "../../../utils/helper.js";

function* loadRouteData() {
    const me = yield select(state => state.auth.authUser)
    yield put(getAllConversations())
    if (me?.account?.role === USER_ROLE['CANDIDATE']) {
        yield put(getAppliedCompanies())
    }
}

function* handleActions() {
    yield takeLatest(requestGetOldMessagesSuccess, function* () {
        const isNewConversation = yield select(state => state.conversation.isNewConversation)
        if (isNewConversation) {
            yield put(getAllConversations())
        }
    })

    yield takeLatest(requestGetOldMessagesFail, function () {
        getNotification('error', 'Không thể lấy tin nhắn trước đó')
    })
}

export default function* loadConversationSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
