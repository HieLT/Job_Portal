import {createSlice} from "@reduxjs/toolkit";

const companyDashboardSlice = createSlice({
    name: 'companyDashboard',
    initialState: {
        isLoadingUpdateJobStatus: false,
        jobsAboutToExpire: [],
        isLoadingGetJobsAboutToExpire: false
    },
    reducers: {
        startRequestGetJobsAboutToExpire: (state) => ({
            ...state,
            isLoadingGetJobsAboutToExpire: true
        }),
        requestGetJobsAboutToExpireSuccess: (state, action) => ({
            ...state,
            isLoadingGetJobsAboutToExpire: false,
            jobsAboutToExpire: action.payload
        }),
        requestGetJobsAboutToExpireFail: (state) => ({
            ...state,
            isLoadingGetJobsAboutToExpire: false
        }),

        startRequestUpdateStatus: (state) => ({
            ...state,
            isLoadingUpdateJobStatus: true
        }),
        requestUpdateStatusSuccess: (state) => ({
            ...state,
            isLoadingUpdateJobStatus: false,
        }),
        requestUpdateStatusFail: (state) => ({
            ...state,
            isLoadingUpdateJobStatus: false
        }),
    }
})

export const {
    startRequestGetJobsAboutToExpire,
    requestGetJobsAboutToExpireSuccess,
    requestGetJobsAboutToExpireFail,

    startRequestUpdateStatus,
    requestUpdateStatusSuccess,
    requestUpdateStatusFail,
} = companyDashboardSlice.actions

export default companyDashboardSlice.reducer;
