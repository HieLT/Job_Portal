import {
    startRequestGetJob , startRequestGetJobSuccess , startRequestGetJobFail,
    startRequestGetDetailJob,startRequestGetDetailJobSuccess,startRequestGetDetailJobFail
} from "../../states/modules/home/index.js"
import callApi from "../callApi";


export const getJob = ({key='' , experience_required='', category='' , type='' , page=1}) => (dispatch , getState) => {
    if (!experience_required) experience_required ='';
    if (!category) category='';
    if (!type) type='';
    return callApi({
        method: 'get',
        apiPath : 'job/search',
        actionTypes :[startRequestGetJob,startRequestGetJobSuccess,startRequestGetJobFail],
        variables:{key, experience_required, category,type,page},
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
