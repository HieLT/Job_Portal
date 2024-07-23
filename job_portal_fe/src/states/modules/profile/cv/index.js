import {createSlice} from "@reduxjs/toolkit";

const cvSlice = createSlice({
    name: 'cv',
    initialState: {
        newFile: {},
        isLoadingDelete: false,
        isOpenModalDelete: false,
        isLoadingBtnUploadCv: false,
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
} = cvSlice.actions

export default cvSlice.reducer;
