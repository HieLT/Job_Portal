import {
    startRequestSubmitJob, startRequestSubmitJobSuccess, startRequestSubmitJobFail
     
} from "../../states/modules/job/index.js"
import callApi from "../callApi";


export const applyJob = (data) => (dispatch , getState) => {
    return callApi({
        content :'multipart/form-data',
        method: 'post',
        apiPath : 'candidate/apply-job',
        actionTypes :[startRequestSubmitJob,startRequestSubmitJobSuccess,startRequestSubmitJobFail],
        variables : data,
        dispatch,
        getState
    })
}




