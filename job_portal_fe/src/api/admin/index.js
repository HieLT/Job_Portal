import {
    startRequestGetAllCompany, startRequestGetAllCompanySuccess, startRequestGetAllCompanyFail,
    startRequestGetAllCandidate , startRequestGetAllCandidateSuccess , startRequestGetAllCandidateFail
} from "../../states/modules/admin/index.js"
import callApi from "../callApi";

// export const adminDashboardData = () => (dispatch , getState) =>{
//     return callApi({
//         method : 'get',
//         apiPath :'',
//         variables : data,
//         dispatch , 
//         getState
//     })
// }

export const getAllCompany = () => (dispatch , getState) => {

    return callApi({
        method: 'get',
        apiPath : 'admin/get-company',
        actionTypes :[startRequestGetAllCompany,startRequestGetAllCompanySuccess,startRequestGetAllCompanyFail],
        dispatch,
        getState
    })
}

export const getAllCandidate = () => (dispatch , getState) => {

    return callApi({
        method: 'get',
        apiPath : 'admin/get-candidate',
        actionTypes :[startRequestGetAllCandidate,startRequestGetAllCandidateSuccess,startRequestGetAllCandidateFail],
        dispatch,
        getState
    })
}
