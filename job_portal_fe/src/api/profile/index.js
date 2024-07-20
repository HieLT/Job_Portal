import callApi from "../callApi.js";
import {
    startRequestCreateCandidate,
    startRequestCreateCandidateFail,
    startRequestCreateCandidateSuccess,
    startRequestUpdateCandidate,
    startRequestUpdateCandidateFail,
    startRequestUpdateCandidateSuccess
} from "../../states/modules/profile/information/index.js";

export const createCandidate = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `candidate/create`,
        actionTypes: [startRequestCreateCandidate, startRequestCreateCandidateSuccess, startRequestCreateCandidateFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const updateCandidateProfile = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `candidate/update`,
        actionTypes: [startRequestUpdateCandidate, startRequestUpdateCandidateSuccess, startRequestUpdateCandidateFail],
        variables: {...data},
        dispatch,
        getState
    })
}
