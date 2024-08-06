import {createSlice} from "@reduxjs/toolkit";

const changePasswordSlice = createSlice({
    name: 'password',
    initialState: {
        changePasswordData: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        errorChangePassword: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        isLoadingChangePassword: false
    },
    reducers: {
        setChangePasswordData: (state, action) => ({
            ...state,
            changePasswordData: action.payload
        }),
        setErrorChangePassword: (state, action) => ({
            ...state,
            errorChangePassword: action.payload
        }),
        startRequestChangePassword: (state) => ({
            ...state,
            isLoadingChangePassword: true
        }),
        requestChangePasswordSuccess: (state) => ({
            ...state,
            isLoadingChangePassword: false
        }),
        requestChangePasswordFail: (state) => ({
            ...state,
            isLoadingChangePassword: false
        }),
    }
})

export const {
    setChangePasswordData,
    setErrorChangePassword,
    startRequestChangePassword,
    requestChangePasswordSuccess,
    requestChangePasswordFail,
} = changePasswordSlice.actions

export default changePasswordSlice.reducer;
