import {createSlice} from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        isLoadingSubmitJob : false , 
        message : {},
        resumes : [],
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
        }),
        startRequestGetResumes : (state) => ({
            ...state , 
        }),
        startRequestGetResumesSuccess : (state) => ({
            ...state , 
            resumes : action.payload
        }),
        startRequestGetResumesFail : (state) => ({
            ...state , 
            resumes :[]
        })
    }
})

export const {
    startRequestSubmitJob , startRequestSubmitJobSuccess, startRequestSubmitJobFail,
    startRequestGetResumes,startRequestGetResumesSuccess, startRequestGetResumesFail
} = jobSlice.actions

export default jobSlice.reducer;
