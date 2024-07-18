import callApi from "../callApi";

export const adminDashboardData = () => (dispatch , getState) =>{
    return callApi({
        method : 'get',
        apiPath :'',
        variables : data,
        dispatch , 
        getState
    })
}

// export const getAllCompany = () => {
//     return callApi({
//         method: 'get',
//         apiPath : ,
//         varibles : data
//     })
// }
