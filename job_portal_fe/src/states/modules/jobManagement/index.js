import {createSlice} from "@reduxjs/toolkit";

export const initialData = {
    job: {
        title: '',
        description: '',
        salary: '',
        position: '',
        number_of_recruitment: '',
        experience_required: 'NOT REQUIRED',
        type: 'FULL-TIME',
        expired_at: '',
        status: 'Open',
        category_id: ''
    },
    errorCreateOrUpdateJob: {
        title: '',
        description: '',
        salary: '',
        position: '',
        number_of_recruitment: '',
        expired_at: '',
        category_id: ''
    }
}

const jobManagementSlice = createSlice({
    name: 'jobManagement',
    initialState: {
        jobs: [],

        job: initialData.job,
        errorCreateOrUpdateJob: initialData.errorCreateOrUpdateJob,
        visibleModalCreateOrUpdate: false,
        isLoadingCreateOrUpdate: false,
        isLoadingGetJobs: false,

        detailJob: {},

        isLoadingGetCategories: false,
        categories: []
    },
    reducers: {
        setJob: (state, action) => ({
            ...state,
            job: action.payload
        }),
        setDetailJob: (state, action) => ({
            ...state,
            detailJob: action.payload
        }),
        setErrorCreateOrUpdate: (state, action) => ({
            ...state,
            errorCreateOrUpdateJob: action.payload
        }),
        setVisibleModalCreateOrUpdate: (state, action) => ({
            ...state,
            visibleModalCreateOrUpdate: action.payload
        }),

        /* Get jobManagement list */
        startRequestGetJobList: (state) => ({
            ...state,
            isLoadingGetJobs: true
        }),
        startRequestGetJobListSuccess: (state, action) => ({
            ...state,
            isLoadingGetJobs: false,
            jobs: action.payload
        }),
        startRequestGetJobListFail: (state) => ({
            ...state,
            isLoadingGetJobs: false
        }),

        /* Post jobManagement */
        startRequestPostJob: (state) => ({
            ...state,
            isLoadingCreateOrUpdate: true
        }),
        startRequestPostJobSuccess: (state) => ({
            ...state,
            isLoadingCreateOrUpdate: false,
        }),
        startRequestPostJobFail: (state) => ({
            ...state,
            isLoadingCreateOrUpdate: false
        }),

        /* Update jobManagement */
        startRequestUpdateJob: (state) => ({
            ...state,
            isLoadingCreateOrUpdate: true
        }),
        startRequestUpdateJobSuccess: (state) => ({
            ...state,
            isLoadingCreateOrUpdate: false,
        }),
        startRequestUpdateJobFail: (state) => ({
            ...state,
            isLoadingCreateOrUpdate: false
        }),

        /* Get category list */
        startRequestGetCategories: (state) => ({
            ...state,
            isLoadingGetCategories: true
        }),
        startRequestGetCategoriesSuccess: (state, action) => ({
            ...state,
            isLoadingGetCategories: false,
            categories: action.payload
        }),
        startRequestGetCategoriesFail: (state) => ({
            ...state,
            isLoadingGetCategories: false
        }),
    }
})

export const {
    setDetailJob,
    setJob, setErrorCreateOrUpdate, setVisibleModalCreateOrUpdate,
    startRequestGetJobList, startRequestGetJobListSuccess, startRequestGetJobListFail,
    startRequestPostJob, startRequestPostJobSuccess, startRequestPostJobFail,
    startRequestUpdateJob, startRequestUpdateJobSuccess, startRequestUpdateJobFail,
    startRequestGetCategories, startRequestGetCategoriesSuccess, startRequestGetCategoriesFail,
} = jobManagementSlice.actions

export default jobManagementSlice.reducer;
