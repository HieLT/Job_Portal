import callApi from "../callApi.js";
import {
    requestUploadCompanyLogoFail,
    requestUploadCompanyLogoSuccess,
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
    startRequestUploadCandidateAvatarSuccess,
    startRequestUploadCompanyLogo
} from "../../states/modules/profile/information/index.js";
import {
    requestGetResumesFail,
    requestGetResumesSuccess,
    startRequestDeleteCv,
    startRequestDeleteCvFail,
    startRequestDeleteCvSuccess,
    startRequestGetResumes,
    startRequestUploadCv,
    startRequestUploadCvFail,
    startRequestUploadCvSuccess
} from "../../states/modules/profile/cv/index.js";
import {
    requestChangePasswordFail,
    requestChangePasswordSuccess,
    startRequestChangePassword
} from "../../states/modules/profile/password/index.js";

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

export const deleteCandidateCv = (resumeId) => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `candidate/delete-resume`,
        actionTypes: [startRequestDeleteCv, startRequestDeleteCvSuccess, startRequestDeleteCvFail],
        variables: {id_resume: resumeId},
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

export const uploadCompanyLogo = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `company/update-logo`,
        actionTypes: [
            startRequestUploadCompanyLogo,
            requestUploadCompanyLogoSuccess,
            requestUploadCompanyLogoFail
        ],
        variables: {...data},
        dispatch,
        getState
    })
}

export const getMyResumes = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `candidate/get-resumes`,
        actionTypes: [
            startRequestGetResumes,
            requestGetResumesSuccess,
            requestGetResumesFail
        ],
        variables: {},
        dispatch,
        getState
    })
}

export const requestChangePassword = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `/auth/change-password`,
        actionTypes: [
            startRequestChangePassword,
            requestChangePasswordSuccess,
            requestChangePasswordFail
        ],
        variables: {
            oldPassword: data.currentPassword,
            newPassword: data.newPassword
        },
        dispatch,
        getState
    })
}
