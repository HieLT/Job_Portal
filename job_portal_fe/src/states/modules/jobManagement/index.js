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
        categories: [],

        isLoadingUpdateStatus: false
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

        /* Get job list */
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

        /* Post job */
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

        /* Update job */
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

        /* Update job status */
        startRequestUpdateJobStatus: (state) => ({
            ...state,
            isLoadingUpdateStatus: true
        }),
        requestUpdateJobStatusSuccess: (state) => ({
            ...state,
            isLoadingUpdateStatus: false,
        }),
        requestUpdateJobStatusFail: (state) => ({
            ...state,
            isLoadingUpdateStatus: false
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
    startRequestUpdateJobStatus, requestUpdateJobStatusSuccess, requestUpdateJobStatusFail,

} = jobManagementSlice.actions

export default jobManagementSlice.reducer;
