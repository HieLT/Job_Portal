import {createSlice} from "@reduxjs/toolkit";

export const initialInformationState = {
    candidateProfile: {
        avatar: '',
        first_name: '',
        last_name: '',
        email: '',
        birth: '',
        gender: '',
        phone: '',
        bio: '',
        profile_description: '',
        resume_path: ''
    },
    errorUpdateCandidateProfile: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    }
}

const informationSlice = createSlice({
    name: 'information',
    initialState: {
        /* candidate */
        candidateProfile: initialInformationState.candidateProfile,
        errorUpdateCandidateProfile: initialInformationState.errorUpdateCandidateProfile,

        isLoadingBtnUpdate: false
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
        refreshState: (state, action) => {
            // TODO
            return ({
                ...state,
            })
        }
    }
})

export const {
    setCandidateProfile, setErrorUpdateCandidateProfile
} = informationSlice.actions

export default informationSlice.reducer;
