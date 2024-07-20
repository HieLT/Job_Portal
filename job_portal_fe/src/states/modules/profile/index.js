import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        tab: 'information'
    },
    reducers: {
        setTab: (state, action) => ({
            ...state,
            tab: action.payload
        }),
        setAuthUser: (state, action) => ({
            ...state,
            isLoadingBtnInformation: true
        }),
        startRequestUpdateInformationSuccess: state => ({
            ...state,
            isLoadingBtnInformation: false
        }),
        startRequestUpdateInformationFail: state => ({
            ...state,
            isLoadingBtnInformation: false
        }),
        setErrorChangePassword: (state, action) => ({
            ...state,
            errorChangePassword: action.payload
        }),
        setDataChangePassword: (state, action) => ({
            ...state,
            dataChangePassword: action.payload
        }),
        startRequestChangePassword: state => ({
            ...state,
            isLoadingBtnChangePassword: true
        }),
        requestChangePasswordSuccess: state => ({
            ...state,
            isLoadingBtnChangePassword: false
        }),
        requestChangePasswordFail: state => ({
            ...state,
            tab: action.payload
        }),
        setAuthUser: (state, action) => ({
            ...state,
            authUser: action.payload
        })
    }
})

export const {
    setTab
} = profileSlice.actions

export default profileSlice.reducer;
