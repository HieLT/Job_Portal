import {createSlice} from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        isLoadingSubmitJob : false , 
        message : {},
    },
    reducers: {
        startRequestSubmitJob : (state) => ({
            ...state ,
            isLoadingSubmitJob:true 
        }),
        startRequestSubmitJobSuccess : (state,action) => ({
            ...state , 
            isLoadingSubmitJob : false ,
            message : action.payload
        }),
        startRequestSubmitJobFail : (state) => ({
            ...state , 
            isLoadingSubmitJob : false , 
        })
    }
})

export const {
    startRequestSubmitJob , startRequestSubmitJobSuccess, startRequestSubmitJobFail
} = jobSlice.actions

export default jobSlice.reducer;
