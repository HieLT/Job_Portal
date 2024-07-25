import {
    startRequestGetAllJob , startRequestGetAllJobSuccess , startRequestGetAllJobFail,
    startRequestGetDetailJob,startRequestGetDetailJobSuccess,startRequestGetDetailJobFail
} from "../../states/modules/home/index.js"
import callApi from "../callApi";


export const getAllJob = () => (dispatch , getState) => {
    return callApi({
        method: 'get',
        apiPath : 'job/get-all',
        actionTypes :[startRequestGetAllJob,startRequestGetAllJobSuccess,startRequestGetAllJobFail],
        dispatch,
        getState
    })
}


export const getDetailJob = (id) => (dispatch , getState) => {
    return callApi({
        method: 'get',
        apiPath : `job/get-detail?id=${id}`,
        actionTypes :[startRequestGetDetailJob,startRequestGetDetailJobSuccess,startRequestGetDetailJobFail],
        dispatch,
        getState
    })
}
