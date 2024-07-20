import {createSlice} from "@reduxjs/toolkit";

export const initialInformationState = {
    candidateProfile: {
        avatar: '',
        first_name: '',
        last_name: '',
        email: '',
        birth: '',
        gender: 'Male',
        phone: '',
        bio: '',
        profile_description: '',
        resume_path: ''
    },
    errorUpdateCandidateProfile: {
        first_name: '',
        last_name: '',
        phone: ''
    },
    companyProfile: {
        avatar: '',
        name: '',
        email: '',
        founded_year: '',
        phone: '',
        bio: '',
        profile_description: '',
    },
    errorUpdateCompanyProfile: {
        name: '',
        founded_year: '',
        phone: ''
    }
}

const informationSlice = createSlice({
    name: 'information',
    initialState: {
        /* candidate */
        candidateProfile: initialInformationState.candidateProfile,
        errorUpdateCandidateProfile: initialInformationState.errorUpdateCandidateProfile,

        /* company */
        companyProfile: initialInformationState.companyProfile,
        errorUpdateCompanyProfile: initialInformationState.errorUpdateCompanyProfile,

        isLoadingBtnUpdateCandidate: false,
        isLoadingBtnUpdateCompany: false
    },
    reducers: {
        setCandidateProfile: (state, action) => ({
            ...state,
            candidateProfile: action.payload
        }),
        setErrorUpdateCandidateProfile: (state, action) => ({
            ...state,
            errorUpdateCandidateProfile: action.payload
        }),
        setCompanyProfile: (state, action) => ({
            ...state,
            companyProfile: action.payload
        }),
        setErrorUpdateCompanyProfile: (state, action) => ({
            ...state,
            errorUpdateCompanyProfile: action.payload
        }),
        startRequestCreateCandidate: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidate: true
        }),
        startRequestCreateCandidateSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidate: false
        }),
        startRequestCreateCandidateFail: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidate: false
        }),
        startRequestUpdateCandidate: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidate: true
        }),
        startRequestUpdateCandidateSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidate: false
        }),
        startRequestUpdateCandidateFail: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidate: false
        }),
        refreshState: (state, action) => {
            // TODO
            return ({
                ...state,
            })
        }
    }
})

export const {
    startRequestUpdateCandidate, startRequestUpdateCandidateSuccess, startRequestUpdateCandidateFail,
    startRequestCreateCandidate, startRequestCreateCandidateSuccess, startRequestCreateCandidateFail,
    setCompanyProfile, setErrorUpdateCompanyProfile,
    setCandidateProfile, setErrorUpdateCandidateProfile
} = informationSlice.actions

export default informationSlice.reducer;
