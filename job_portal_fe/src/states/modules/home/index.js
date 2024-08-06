import {createSlice} from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        keySearch: '',
        jobs: [],
        totalJobs:'',
        totalPages:'' , 
        page:'',
        jobdetail: {},
    },
    reducers: {
        setKeySearch: (state, action) => ({
            ...state,
            keySearch: action.payload
        }),
        startRequestGetJob : (state) => ({
            ...state , 
        }),
        startRequestGetJobSuccess : (state,action) => ({
            ...state , 
            jobs : action.payload.jobs,
            totalJobs :action.payload.totalJobs,
            totalPages :action.payload.totalPages,
            page:action.payload.page
        }),
        startRequestGetJobFail : (state) => ({
            ...state , 
            jobs :[]
        }),
        startRequestGetDetailJob : (state) => ({
            ...state , 
        }),
        startRequestGetDetailJobSuccess : (state,action) => ({
            ...state , 
            job : action.payload
        }),
        startRequestGetDetailJobFail : (state) => ({
            ...state , 
            job : {}
        })
    }
})

export const {
    startRequestGetJob,startRequestGetJobSuccess,startRequestGetJobFail,
    startRequestGetDetailJob,startRequestGetDetailJobSuccess,startRequestGetDetailJobFail,
} = homeSlice.actions

export default homeSlice.reducer;
