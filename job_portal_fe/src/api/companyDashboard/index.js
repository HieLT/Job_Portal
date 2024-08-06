import callApi from "../callApi";
import {
    requestGetJobsAboutToExpireFail,
    requestGetJobsAboutToExpireSuccess,
    requestGetQuantityFail,
    requestGetQuantitySuccess,
    requestUpdateStatusFail,
    requestUpdateStatusSuccess,
    startRequestGetJobsAboutToExpire,
    startRequestGetQuantity,
    startRequestUpdateStatus
} from "../../states/modules/companyDashboard/index.js";

export const updateStatus = (data) => (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `job/update-status`,
        actionTypes: [startRequestUpdateStatus, requestUpdateStatusSuccess, requestUpdateStatusFail],
        variables: {...data},
        dispatch,
        getState
    })
}

export const getQuantity = () => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'company/get-jobs',
        actionTypes: [startRequestGetQuantity, requestGetQuantitySuccess, requestGetQuantityFail],
        dispatch,
        getState
    })
}

export const getJobsAboutToExpire = () => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'company/get-jobs',
        actionTypes: [startRequestGetJobsAboutToExpire, requestGetJobsAboutToExpireSuccess, requestGetJobsAboutToExpireFail],
        dispatch,
        getState
    })
}
