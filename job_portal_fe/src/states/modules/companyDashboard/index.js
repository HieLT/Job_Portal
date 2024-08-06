import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";

const companyDashboardSlice = createSlice({
    name: 'companyDashboard',
    initialState: {
        quantity: {
            jobs: 0,
            applicants: 0
        },
        isLoadingGetQuantity: false,
        isLoadingUpdateJobStatus: false,
        jobsAboutToExpire: [],
        isLoadingGetJobsAboutToExpire: false
    },
    reducers: {
        startRequestGetJobsAboutToExpire: (state) => ({
            ...state,
            isLoadingGetJobsAboutToExpire: true
        }),
        requestGetJobsAboutToExpireSuccess: (state, action) => {
            const threeDaysAgo = moment().subtract(3, 'days')

            return ({
                ...state,
                isLoadingGetJobsAboutToExpire: false,
                jobsAboutToExpire: action.payload?.filter(item => moment(item.expired_at).isAfter(threeDaysAgo))
            })
        },
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

        startRequestGetQuantity: (state) => ({
            ...state,
            isLoadingGetQuantity: true
        }),
        requestGetQuantitySuccess: (state, action) => ({
            ...state,
            isLoadingGetQuantity: false,
            quantity: {
                jobs: action.payload?.length,
                applicants: action.payload?.reduce((count, item) => count + item.applied_candidates?.length, 0)
            }
        }),
        requestGetQuantityFail: (state) => ({
            ...state,
            isLoadingGetQuantity: false
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
    startRequestGetQuantity,
    requestGetQuantitySuccess,
    requestGetQuantityFail,
} = companyDashboardSlice.actions

export default companyDashboardSlice.reducer;
