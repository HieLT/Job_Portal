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

        /* Get applied candidates for a jobManagement */
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
    }
})

export const {
    startRequestGetAppliedCandidate, requestGetAppliedCandidateSuccess, requestGetAppliedCandidateFail,
} = applicantSlice.actions

export default applicantSlice.reducer;
