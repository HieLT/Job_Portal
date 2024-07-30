import {createSlice} from "@reduxjs/toolkit";

const cvSlice = createSlice({
    name: 'cv',
    initialState: {
        newFile: {},
        isLoadingDelete: false,
        isOpenModalDelete: false,
        isLoadingBtnUploadCv: false,
        myResumes: [],
        isLoadingGetResumes: false,
    },
    reducers: {
        setNewFile: (state, action) => ({
           ...state,
           newFile: action.payload
        }),
        setIsOpenModalDelete: (state, action ) => ({
            ...state,
            isOpenModalDelete: action.payload
        }),
        startRequestDeleteCv: (state) => ({
            ...state,
            isLoadingDelete: true
        }),
        startRequestDeleteCvSuccess: (state) => ({
            ...state,
            isLoadingDelete: false
        }),
        startRequestDeleteCvFail: (state) => ({
            ...state,
            isLoadingDelete: false
        }),
        startRequestUploadCv: (state) => ({
            ...state,
            isLoadingBtnUploadCv: true
        }),
        startRequestUploadCvSuccess: (state) => ({
            ...state,
            newFile: {},
            isLoadingBtnUploadCv: false
        }),
        startRequestUploadCvFail: (state) => ({
            ...state,
            isLoadingBtnUploadCv: false
        }),

        startRequestGetResumes: (state) => ({
            ...state,
            isLoadingGetResumes: true
        }),
        requestGetResumesSuccess: (state, action) => ({
            ...state,
            isLoadingGetResumes: false,
            myResumes: action.payload
        }),
        requestGetResumesFail: (state) => ({
            ...state,
            isLoadingGetResumes: false
        }),
    }
})

export const {
    setNewFile,
    setIsOpenModalDelete,
    startRequestDeleteCv,
    startRequestDeleteCvSuccess,
    startRequestDeleteCvFail,
    startRequestUploadCv,
    startRequestUploadCvSuccess,
    startRequestUploadCvFail,
    startRequestGetResumes, requestGetResumesSuccess, requestGetResumesFail,

} = cvSlice.actions

export default cvSlice.reducer;
