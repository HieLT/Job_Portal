import callApi from "../callApi.js";
import {
    startRequestCreateCandidate,
    startRequestCreateCandidateFail,
    startRequestCreateCandidateSuccess,
    startRequestCreateCompany,
    startRequestCreateCompanyFail,
    startRequestCreateCompanySuccess,
    startRequestUpdateCandidate,
    startRequestUpdateCandidateFail,
    startRequestUpdateCandidateSuccess,
    startRequestUpdateCompany,
    startRequestUpdateCompanyFail,
    startRequestUpdateCompanySuccess,
    startRequestUploadCandidateAvatar,
    startRequestUploadCandidateAvatarFail,
    startRequestUploadCandidateAvatarSuccess
} from "../../states/modules/profile/information/index.js";
import {
    startRequestDeleteCv, startRequestDeleteCvFail, startRequestDeleteCvSuccess,
    startRequestUploadCv,
    startRequestUploadCvFail,
    startRequestUploadCvSuccess
} from "../../states/modules/profile/cv/index.js";

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
        apiPath: `candidate/update-profile`,
        actionTypes: [startRequestUpdateCandidate, startRequestUpdateCandidateSuccess, startRequestUpdateCandidateFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const createCompany = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `company/create`,
        actionTypes: [startRequestCreateCompany, startRequestCreateCompanySuccess, startRequestCreateCompanyFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const updateCompanyProfile = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `company/update-profile`,
        actionTypes: [startRequestUpdateCompany, startRequestUpdateCompanySuccess, startRequestUpdateCompanyFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const uploadCandidateCv = (data) => async (dispatch, getState) => {
    return callApi({
        content: 'multipart/form-data',
        method: 'put',
        apiPath: `candidate/upload-resume`,
        actionTypes: [startRequestUploadCv, startRequestUploadCvSuccess, startRequestUploadCvFail],
        variables: data,
        dispatch,
        getState
    })
}

export const deleteCandidateCv = () => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `candidate/delete-resume`,
        actionTypes: [startRequestDeleteCv, startRequestDeleteCvSuccess, startRequestDeleteCvFail],
        variables: {},
        dispatch,
        getState
    })
}

export const uploadCandidateAvatar = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `candidate/upload-avatar`,
        actionTypes: [
            startRequestUploadCandidateAvatar,
            startRequestUploadCandidateAvatarSuccess,
            startRequestUploadCandidateAvatarFail
        ],
        variables: {...data},
        dispatch,
        getState
    })
}
