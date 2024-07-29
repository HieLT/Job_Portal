import {createSlice} from "@reduxjs/toolkit";

const appliedJobsSlice = createSlice({
    name: 'appliedJobs',
    initialState: {
        isLoadingGetAppliedJobs : false ,
        appliedJobs: []
    },
    reducers: {
        startRequestGetAppliedJobs : (state) => ({
            ...state ,
            isLoadingGetAppliedJobs:true
        }),
        requestGetAppliedJobsSuccess : (state,action) => ({
            ...state ,
            isLoadingGetAppliedJobs : false ,
            appliedJobs : action.payload
        }),
        requestGetAppliedJobsFail : (state) => ({
            ...state ,
            isLoadingGetAppliedJobs : false ,
        })
    }
})

export const {
    startRequestGetAppliedJobs, requestGetAppliedJobsSuccess, requestGetAppliedJobsFail,
} = appliedJobsSlice.actions

export default appliedJobsSlice.reducer;
