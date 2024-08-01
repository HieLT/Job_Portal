import callApi from "../callApi";
import {
    requestUpdateStatusFail,
    requestUpdateStatusSuccess,
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