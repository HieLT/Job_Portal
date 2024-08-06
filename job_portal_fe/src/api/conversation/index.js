import callApi from "../callApi";
import store from "../../states/configureStore.js";
import {USER_ROLE} from "../../utils/constants.js";
import {
    requestGetAppliedCompaniesFail,
    requestGetAppliedCompaniesSuccess,
    requestGetConversationsFail,
    requestGetConversationsSuccess,
    requestGetOldMessagesFail,
    requestGetOldMessagesSuccess,
    startRequestGetAppliedCompanies,
    startRequestGetConversations,
    startRequestGetOldMessages
} from "../../states/modules/conversation/index.js";

export const getAllConversations = () => (dispatch, getState) => {
    const me = store.getState().auth.authUser
    const path = (me?.account?.role === USER_ROLE['CANDIDATE'] ? 'candidate/' : 'company') + '/get-history-chat'

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [startRequestGetConversations, requestGetConversationsSuccess, requestGetConversationsFail],
        dispatch,
        getState
    })
}

export const startConversation = (receiverId) => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `chat/start-conversation?recipient=${receiverId}`,
        actionTypes: [startRequestGetOldMessages, requestGetOldMessagesSuccess, requestGetOldMessagesFail],
        dispatch,
        getState
    })
}

export const getAppliedCompanies = () => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `candidate/job-applied`,
        actionTypes: [startRequestGetAppliedCompanies, requestGetAppliedCompaniesSuccess, requestGetAppliedCompaniesFail],
        dispatch,
        getState
    })
}
