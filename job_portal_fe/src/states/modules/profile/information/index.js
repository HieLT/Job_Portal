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
        name: '',
        phone: '',
        headcount: '',
        location: '',
        website_url: ''
    },
    companyProfile: {
        logo: '',
        name: '',
        email: '',
        founded_year: '',
        phone: '',
        headcount: null,
        description: '',
        website_url: '',
        location: ''
    },
    errorUpdateCompanyProfile: {
        name: '',
        phone: '',
        location: '',
        headcount: ''
    }
}

const informationSlice = createSlice({
    name: 'information',
    initialState: {
        /* candidate */
        candidateProfile: initialInformationState.candidateProfile,
        errorUpdateCandidateProfile: initialInformationState.errorUpdateCandidateProfile,
        isLoadingBtnUpdateCandidate: false,
        isLoadingBtnUpdateCandidateAvatar: false,

        /* company */
        companyProfile: initialInformationState.companyProfile,
        errorUpdateCompanyProfile: initialInformationState.errorUpdateCompanyProfile,
        isLoadingBtnUpdateCompany: false,

    },
    reducers: {
        /* candidate */
        setCandidateProfile: (state, action) => ({
            ...state,
            candidateProfile: action.payload
        }),
        setErrorUpdateCandidateProfile: (state, action) => ({
            ...state,
            errorUpdateCandidateProfile: action.payload
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
        startRequestUpdateCandidateSuccess: (state, action) => {
            return ({
                ...state,
                isLoadingBtnUpdateCandidate: false,
                authUser: action.payload
            })
        },
        startRequestUpdateCandidateFail: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidate: false
        }),

        startRequestUploadCandidateAvatar: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidateAvatar: true
        }),
        startRequestUploadCandidateAvatarSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidateAvatar: false
        }),
        startRequestUploadCandidateAvatarFail: (state) => ({
            ...state,
            isLoadingBtnUpdateCandidateAvatar: false
        }),

        /* company */
        setCompanyProfile: (state, action) => ({
            ...state,
            companyProfile: action.payload
        }),
        setErrorUpdateCompanyProfile: (state, action) => ({
            ...state,
            errorUpdateCompanyProfile: action.payload
        }),

        startRequestUpdateCompany: (state) => ({
            ...state,
            isLoadingBtnUpdateCompany: true
        }),
        startRequestUpdateCompanySuccess: (state, action) => {
            return ({
                ...state,
                isLoadingBtnUpdateCompany: false,
                authUser: action.payload
            })
        },
        startRequestUpdateCompanyFail: (state) => ({
            ...state,
            isLoadingBtnUpdateCompany: false
        }),

        startRequestCreateCompany: (state) => ({
            ...state,
            isLoadingBtnUpdateCompany: true
        }),
        startRequestCreateCompanySuccess: (state) => ({
            ...state,
            isLoadingBtnUpdateCompany: false
        }),
        startRequestCreateCompanyFail: (state) => ({
            ...state,
            isLoadingBtnUpdateCompany: false
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
    startRequestUploadCandidateAvatar, startRequestUploadCandidateAvatarSuccess, startRequestUploadCandidateAvatarFail,
    startRequestUpdateCandidate, startRequestUpdateCandidateSuccess, startRequestUpdateCandidateFail,
    startRequestCreateCandidate, startRequestCreateCandidateSuccess, startRequestCreateCandidateFail,
    setCandidateProfile, setErrorUpdateCandidateProfile,
    setCompanyProfile, setErrorUpdateCompanyProfile,
    startRequestUpdateCompany, startRequestUpdateCompanySuccess, startRequestUpdateCompanyFail,
    startRequestCreateCompany, startRequestCreateCompanySuccess, startRequestCreateCompanyFail,

} = informationSlice.actions

export default informationSlice.reducer;
