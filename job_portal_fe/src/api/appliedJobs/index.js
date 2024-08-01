import callApi from "../callApi";
import {
    requestGetAppliedJobsFail,
    requestGetAppliedJobsSuccess,
    startRequestGetAppliedJobs
} from "../../states/modules/appliedJobs/index.js";

export const getAppliedJobs = () => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'candidate/job-applied',
        actionTypes: [startRequestGetAppliedJobs, requestGetAppliedJobsSuccess, requestGetAppliedJobsFail],
        dispatch,
        getState
    })
}
