import {createSlice} from "@reduxjs/toolkit";

const applicantSlice = createSlice({
    name: 'applicant',
    initialState: {
        jobId: '',
        isLoadingGetAppliedCandidate: false,
        appliedCandidates: []
    },
    reducers: {
        setJobId: (state, action) => ({
            ...state,
            jobId: action.payload.data
        }),

        /* Get applied candidates for a job */
        startRequestGetAppliedCandidate: (state) => ({
            ...state,
            isLoadingGetAppliedCandidate: true
        }),
        requestGetAppliedCandidateSuccess: (state, action) => ({
            ...state,
            isLoadingGetAppliedCandidate: false,
            appliedCandidates: action.payload
        }),
        requestGetAppliedCandidateFail: (state) => ({
            ...state,
            isLoadingGetAppliedCandidate: false
        }),

        startRequestConfirmSeenResume: (state) => ({
            ...state
        }),
        requestConfirmSeenResumeSuccess: (state) => ({
            ...state
        }),
        requestConfirmSeenResumeFail: (state) => ({
            ...state
        }),

        startRequestConfirmDownloadedResume: (state) => ({
            ...state
        }),
        requestConfirmDownloadedResumeSuccess: (state) => ({
            ...state
        }),
        requestConfirmDownloadedResumeFail: (state) => ({
            ...state
        })
    }
})

export const {
    startRequestGetAppliedCandidate, requestGetAppliedCandidateSuccess, requestGetAppliedCandidateFail,
    startRequestConfirmSeenResume,
    requestConfirmSeenResumeSuccess,
    requestConfirmSeenResumeFail,
    startRequestConfirmDownloadedResume,
    requestConfirmDownloadedResumeSuccess,
    requestConfirmDownloadedResumeFail,
} = applicantSlice.actions

export default applicantSlice.reducer;
