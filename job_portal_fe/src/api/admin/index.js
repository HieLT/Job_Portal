import {
    startRequestGetAllCompany, startRequestGetAllCompanySuccess, startRequestGetAllCompanyFail,
    startRequestGetAllCandidate , startRequestGetAllCandidateSuccess , startRequestGetAllCandidateFail,
    startRequestDeleteCandidate, requestDeleteCandidateSuccess, requestDeleteCandidateFail,
    startRequestRestoreCandidate, requestRestoreCandidateSuccess, requestRestoreCandidateFail,
    startRequestDeleteCompany, requestDeleteCompanySuccess, requestDeleteCompanyFail,
    startRequestRestoreCompany, requestRestoreCompanySuccess, requestRestoreCompanyFail,
    startRequestGetJob,startRequestGetJobSuccess,startRequestGetJobFail
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
};

export const getAllCandidate = () => (dispatch , getState) => {

    return callApi({
        method: 'get',
        apiPath : 'admin/get-candidate',
        actionTypes :[startRequestGetAllCandidate,startRequestGetAllCandidateSuccess,startRequestGetAllCandidateFail],
        dispatch,
        getState
    })
};

export const deleteCandidate = (id) => (dispatch, getState) =>{

    return callApi({
        method:'delete',
        apiPath : 'admin/delete-candidate',
        actionTypes :[startRequestDeleteCandidate,requestDeleteCandidateSuccess,requestDeleteCandidateFail],
        variables : {id_candidate:id},
        dispatch,
        getState
    })
}


export const restoreCandidate = (id) => (dispatch, getState) =>{

    return callApi({
        method:'post',
        apiPath : 'admin/restore-candidate',
        actionTypes :[startRequestRestoreCandidate,requestRestoreCandidateSuccess,requestRestoreCandidateFail],
        variables : {id_candidate:id},
        dispatch,
        getState
    })
}

export const deleteCompany = (id) => (dispatch, getState) =>{

    return callApi({
        method:'delete',
        apiPath : 'admin/delete-company',
        actionTypes :[startRequestDeleteCompany,requestDeleteCompanySuccess,requestDeleteCompanyFail],
        variables : {id_company:id},
        dispatch,
        getState
    })
}

export const restoreCompany = (id) => (dispatch, getState) =>{

    return callApi({
        method:'post',
        apiPath : 'admin/restore-company',
        actionTypes :[startRequestRestoreCompany,requestRestoreCompanySuccess,requestRestoreCompanyFail],
        variables : {id_company:id},
        dispatch,
        getState
    })
}

export const deleteJob = (id) =>(dispatch, getState) =>{

    return callApi({
        method:'delete',
        apiPath : 'admin/restore-company',
        actionTypes :[startRequestRestoreCompany,requestRestoreCompanySuccess,requestRestoreCompanyFail],
        variables : {id_company:id},
        dispatch,
        getState
    })
}

export const restoreJob = (id) =>(dispatch, getState) =>{

    return callApi({
        method:'post',
        apiPath : 'admin/restore-company',
        actionTypes :[startRequestRestoreCompany,requestRestoreCompanySuccess,requestRestoreCompanyFail],
        variables : {id_company:id},
        dispatch,
        getState
    })
}

export const getJobAdmin = (page) => (dispatch , getState) => {
    
    return callApi({
        method: 'get',
        apiPath : 'admin/get-jobs',
        actionTypes :[startRequestGetJob,startRequestGetJobSuccess,startRequestGetJobFail],
        variables: {page:page},
        dispatch,
        getState
    })
}


