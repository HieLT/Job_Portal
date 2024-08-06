import callApi from "../callApi";
import {
    requestSignup,
    requestSignupFail,
    requestSignupSuccess,
    requestVerifyEmail,
    requestVerifyEmailFail,
    requestVerifyEmailSuccess,
    startRequestForgotPassword,
    startRequestForgotPasswordFail,
    startRequestForgotPasswordSuccess,
    startRequestGetMe,
    startRequestGetMeFail,
    startRequestGetMeSuccess,
    startRequestLogin,
    startRequestLoginFail,
    startRequestLoginSuccess,
    startRequestLoginWithGoogle,
    startRequestLoginWithGoogleFail,
    startRequestLoginWithGoogleSuccess,
    startRequestResetPassword,
    startRequestResetPasswordFail,
    startRequestResetPasswordSuccess,
} from "../../states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `login`,
        actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
        variables: {
            email: data.email,
            password: data.password,
        },
        dispatch,
        getState
    })
}

export const loginWithGoogle = (token) => async (dispatch, getState) => {
    return callApi({
        method: "post",
        apiPath: "auth/google",
        actionTypes: [
            startRequestLoginWithGoogle,
            startRequestLoginWithGoogleSuccess,
            startRequestLoginWithGoogleFail,
        ],
        headers: {Authorization: "Bearer " + token},
        dispatch,
        getState
    })
}

export const getMe = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'logged-in',
        actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
        variables: {},
        dispatch,
        getState
    })
}

export const requestForgotPassword = (email) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `auth/request/reset-password`,
        actionTypes: [startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail],
        variables: {email},
        dispatch,
        getState
    })
}

export const resetPassword = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `auth/reset-password`,
        actionTypes: [startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail],
        variables: {
            token: data.token,
            password: data.password
        },
        dispatch,
        getState
    })
}

export const signup = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `register`,
        actionTypes: [requestSignup, requestSignupSuccess, requestSignupFail],
        variables: data,
        dispatch,
        getState
    })
}

export const verifyEmail = (token) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `gmail/verify/${token}`,
        actionTypes: [requestVerifyEmail, requestVerifyEmailSuccess, requestVerifyEmailFail],
        variables: {},
        dispatch,
        getState
    })
}
