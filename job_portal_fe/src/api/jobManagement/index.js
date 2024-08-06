import callApi from "../callApi";
import {
    requestUpdateJobStatusFail,
    requestUpdateJobStatusSuccess,
    startRequestGetCategories,
    startRequestGetCategoriesFail,
    startRequestGetCategoriesSuccess,
    startRequestGetJobList,
    startRequestGetJobListFail,
    startRequestGetJobListSuccess,
    startRequestPostJob,
    startRequestPostJobFail,
    startRequestPostJobSuccess,
    startRequestUpdateJob,
    startRequestUpdateJobFail,
    startRequestUpdateJobStatus,
    startRequestUpdateJobSuccess
} from "../../states/modules/jobManagement/index.js";
import {
    requestConfirmDownloadedResumeFail,
    requestConfirmDownloadedResumeSuccess,
    requestConfirmSeenResumeFail,
    requestConfirmSeenResumeSuccess,
    requestGetAppliedCandidateFail,
    requestGetAppliedCandidateSuccess,
    startRequestConfirmDownloadedResume,
    startRequestConfirmSeenResume,
    startRequestGetAppliedCandidate
} from "../../states/modules/applicant/index.js";
import store from "../../states/configureStore.js";

export const getJobList = () => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'company/get-jobs',
        actionTypes: [startRequestGetJobList, startRequestGetJobListSuccess, startRequestGetJobListFail],
        dispatch,
        getState
    })
}

export const getCategories = () => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'job/categories',
        actionTypes: [startRequestGetCategories, startRequestGetCategoriesSuccess, startRequestGetCategoriesFail],
        dispatch,
        getState
    })
}

export const postJob = (data) => (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: 'job/create',
        actionTypes: [startRequestPostJob, startRequestPostJobSuccess, startRequestPostJobFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const updateJob = (data) => (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: 'job/update',
        actionTypes: [startRequestUpdateJob, startRequestUpdateJobSuccess, startRequestUpdateJobFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const updateJobStatus = (data) => (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `job/update-status`,
        actionTypes: [startRequestUpdateJobStatus, requestUpdateJobStatusSuccess, requestUpdateJobStatusFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const getAppliedCandidate = () => (dispatch, getState) => {
    const location = store.getState().app.location
    return callApi({
        method: 'get',
        apiPath: `job/candidate-applied?id_job=${location.params.id}`,
        actionTypes: [startRequestGetAppliedCandidate, requestGetAppliedCandidateSuccess, requestGetAppliedCandidateFail],
        variables: {},
        dispatch,
        getState
    })
}

export const confirmSeenResume = ({applicationId, jobId}) => (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `application/update-seen-at`,
        actionTypes: [startRequestConfirmSeenResume, requestConfirmSeenResumeSuccess, requestConfirmSeenResumeFail],
        variables: {
            id_application: applicationId,
            id_job: jobId
        },
        dispatch,
        getState
    })
}

export const confirmDownloadedResume = ({applicationId, jobId}) => (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `application/update-downloaded-at`,
        actionTypes: [startRequestConfirmDownloadedResume, requestConfirmDownloadedResumeSuccess, requestConfirmDownloadedResumeFail],
        variables: {
            id_application: applicationId,
            id_job: jobId
        },
        dispatch,
        getState
    })
}
