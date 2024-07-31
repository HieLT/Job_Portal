import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthSuccess: false,
        authUser: {},
        errorLogin: {
            email: '',
            password: ''
        },
        isLoadingBtnLogin: false,

        /* Forgot password */
        errorForgotPassword: {
            email: ''
        },
        isLoadingBtnForgotPassword: false,

        /* Reset password */
        errorResetPassword: {
            password: '',
            confirmPassword: ''
        },
        isLoadingBtnResetPassword: false,

        /* Sign up */
        errorSignup: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            mobile: '',
            password: '',
        },
        isLoadingBtnSignup: false,

        isLoadingVerifyEmail: false,
        verifyResult: {
            type: 0,
            message: ''
        },

        isLoadingGetMe: false
    },
    reducers: {
        setErrorSignup: (state, action) => ({
            ...state,
            errorSignup: action.payload
        }),
        setErrorLogin: (state, action) => ({
            ...state,
            errorLogin: action.payload
        }),
        startRequestLogin: (state) => ({
            ...state,
            isLoadingBtnLogin: true
        }),
        startRequestLoginSuccess: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        startRequestLoginFail: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),

        startRequestLoginWithGoogle: (state) => ({
            ...state,
            isLoadingBtnLogin: true
        }),
        startRequestLoginWithGoogleSuccess: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        startRequestLoginWithGoogleFail: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),

        startRequestGetMe: (state) => ({
            ...state,
            isLoadingGetMe: true
        }),
        startRequestGetMeSuccess: (state, action) => {
            return ({
                ...state,
                isAuthSuccess: true,
                isLoadingGetMe: false,
                authUser: action.payload
            })
        },
        startRequestGetMeFail: (state) => ({
            ...state,
            isAuthSuccess: false,
            isLoadingGetMe: false,
            authUser: {}
        }),
        setErrorForgotPassword: (state, action) => ({
            ...state,
            errorForgotPassword: action.payload
        }),
        startRequestForgotPassword: (state) => ({
            ...state,
            isLoadingBtnForgotPassword: true
        }),
        startRequestForgotPasswordSuccess: (state) => ({
            ...state,
            isLoadingBtnForgotPassword: false
        }),
        startRequestForgotPasswordFail: (state) => ({
            ...state,
            isLoadingBtnForgotPassword: false
        }),
        setErrorResetPassword: (state, action) => ({
            ...state,
            errorResetPassword: action.payload
        }),
        startRequestResetPassword: (state) => ({
            ...state,
            isLoadingBtnResetPassword: true
        }),
        startRequestResetPasswordSuccess: (state) => ({
            ...state,
            isLoadingBtnResetPassword: false
        }),
        startRequestResetPasswordFail: (state) => ({
            ...state,
            isLoadingBtnResetPassword: false
        }),
        setAuthSuccess: (state, action) => ({
            ...state,
            isAuthSuccess: action.payload
        }),

        requestSignup: (state) => ({
            ...state,
            isLoadingBtnSignup: true
        }),
        requestSignupSuccess: (state) => ({
            ...state,
            isLoadingBtnSignup: false
        }),
        requestSignupFail: (state) => ({
            ...state,
            isLoadingBtnSignup: false
        }),

        requestVerifyEmail: (state) => ({
            ...state,
            isLoadingVerifyEmail: true
        }),
        requestVerifyEmailSuccess: (state) => ({
            ...state,
            isLoadingVerifyEmail: false,
            verifyResult: {
                type: 1,
                message: 'Xác thực email thành công'
            }
        }),
        requestVerifyEmailFail: (state) => ({
            ...state,
            isLoadingVerifyEmail: false,
            verifyResult: {
                type: 0,
                message: 'Xác thực email thất bại'
            }
        }),
        setVerifyResult: (state, action) => ({
            ...state,
            verifyResult: action.payload
        }),
        setAuthUser: (state, action) => ({
            ...state,
            authUser: action.payload
        })
    }
})

export const {
    setAuthUser,
    setVerifyResult,
    startRequestLoginWithGoogle, startRequestLoginWithGoogleSuccess, startRequestLoginWithGoogleFail,
    requestSignup, requestSignupSuccess, requestSignupFail,
    setErrorSignup,
    setErrorLogin, setErrorForgotPassword, setErrorResetPassword, setAuthSuccess,
    startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
    startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
    startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail,
    startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail,
    requestVerifyEmail, requestVerifyEmailSuccess, requestVerifyEmailFail
} = authSlice.actions

export default authSlice.reducer;
