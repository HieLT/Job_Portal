import callApi from "../callApi";
import {
    requestSignup,
    requestSignupFail,
    requestSignupSuccess,
    startRequestGetMe,
    startRequestGetMeFail,
    startRequestGetMeSuccess,
    startRequestLogin,
    startRequestLoginFail,
    startRequestLoginSuccess,
    startRequestResetPassword,
    startRequestResetPasswordFail,
    startRequestResetPasswordSuccess,
} from "../../states/modules/auth";

const apiUrl = import.meta.env.VITE_USER_SERVICE_API_URL

export const login = (data) => async (dispatch, getState) => {
    return callApi({
        content: 'multipart/form-data',
        url: apiUrl,
        method: 'post',
        apiPath: `api/auth/login`,
        actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
        variables: {
            username: data.username,
            password: data.password,
        },
        dispatch,
        getState
    })
}

export const getMe = () => async (dispatch, getState) => {
    return callApi({
        content: "",
        url: apiUrl,
        method: 'get',
        apiPath: `api/auth/info`,
        actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
        variables: {},
        dispatch,
        getState
    })
}

export const resetPassword = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `auth/reset-password`,
        actionTypes: [startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail],
        variables: {
            code: data.token,
            password: data.password,
            password_confirmation: data.confirmPassword,
        },
        dispatch,
        getState
    })
}

export const signup = (data) => async (dispatch, getState) => {
    return callApi({
        content: 'multipart/form-data',
        url: apiUrl,
        method: 'post',
        apiPath: `api/auth/register`,
        actionTypes: [requestSignup, requestSignupSuccess, requestSignupFail],
        variables: data,
        dispatch,
        getState
    })
}
