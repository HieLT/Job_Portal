import {createSlice} from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        keySearch: '',
        jobs: [],
        jobdetail: {},
    },
    reducers: {
        setKeySearch: (state, action) => ({
            ...state,
            keySearch: action.payload
        }),
        startRequestGetAllJob : (state) => ({
            ...state , 
        }),
        startRequestGetAllJobSuccess : (state,action) => ({
            ...state , 
            jobs : action.payload
        }),
        startRequestGetAllJobFail : (state) => ({
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
    startRequestGetAllJob,startRequestGetAllJobSuccess,startRequestGetAllJobFail,
    startRequestGetDetailJob,startRequestGetDetailJobSuccess,startRequestGetDetailJobFail,
} = homeSlice.actions

export default homeSlice.reducer;
