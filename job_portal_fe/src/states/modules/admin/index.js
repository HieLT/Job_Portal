import {createSlice} from "@reduxjs/toolkit";


const homeSlice = createSlice({
    name: 'admin',
    initialState: {
        allCompany:[],
        allCandidate:[],
        jobs: [],
        totalJobs:'',
        totalPages:'' , 
        page:'',
        jobdetail: {},
    },
    reducers: {
        startRequestGetAllCompany : (state) =>({
            ...state
        }),
        
        startRequestGetAllCompanySuccess : (state,action) =>({
            ...state,
            allCompany : action.payload
        }),

        startRequestGetAllCompanyFail : (state) =>({
            ...state,
            allCompany : []
        }), 

        startRequestGetAllCandidate : (state) =>({
            ...state
        }),
        
        startRequestGetAllCandidateSuccess : (state,action) =>({
            ...state,
            allCandidate : action.payload
        }),

        startRequestGetAllCandidateFail : (state) =>({
            ...state,
            allCandidate : []
        }),
        startRequestDeleteCandidate :(state) =>({
            ...state,
        }),
        requestDeleteCandidateSuccess :(state,action) =>({
            ...state,
        }),
        requestDeleteCandidateFail :(state) =>({
            ...state,
        }),
        startRequestRestoreCandidate :(state) =>({
            ...state,
        }),
        requestRestoreCandidateSuccess :(state,action) =>({
            ...state,
        }),
        requestRestoreCandidateFail :(state) =>({
            ...state,
        }),
        startRequestDeleteCompany :(state) =>({
            ...state,
        }),
        requestDeleteCompanySuccess:(state,action) =>({
            ...state,
        }),
        requestDeleteCompanyFail :(state) =>({
            ...state,
        }),
        startRequestRestoreCompany :(state) =>({
            ...state,
        }),
        requestRestoreCompanySuccess :(state,action) =>({
            ...state,
        }),
        requestRestoreCompanyFail :(state) =>({
            ...state,
        }),
        startRequestDeleteJob :(state) =>({
            ...state,
        }),
        requestDeleteJobSuccess :(state,action) =>({
            ...state,
        }),
        requestDeleteJobFail :(state) =>({
            ...state,
        }),
        startRequestRestoreJob :(state) =>({
            ...state,
        }),
        requestRestoreJobSuccess :(state,action) =>({
            ...state,
        }),
        requestRestoreJobFail :(state) =>({
            ...state,
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
            jobs :[],
            totalJobs :'',
            totalPages :'',
            page:''
        }),
    }
})

export const {
    startRequestGetAllCompany, startRequestGetAllCompanySuccess, startRequestGetAllCompanyFail,
    startRequestGetAllCandidate , startRequestGetAllCandidateSuccess , startRequestGetAllCandidateFail,
    startRequestDeleteCandidate, requestDeleteCandidateSuccess, requestDeleteCandidateFail,
    startRequestRestoreCandidate, requestRestoreCandidateSuccess, requestRestoreCandidateFail,
    startRequestDeleteCompany, requestDeleteCompanySuccess, requestDeleteCompanyFail,
    startRequestRestoreCompany, requestRestoreCompanySuccess, requestRestoreCompanyFail,
    startRequestDeleteJob, requestDeleteJobSuccess, requestDeleteJobFail,
    startRequestRestoreJob, requestRestoreJobSuccess, requestRestoreJobFail,
    startRequestGetJob,startRequestGetJobSuccess,startRequestGetJobFail
    
} = homeSlice.actions

export default homeSlice.reducer;
