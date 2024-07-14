import callApi from "../callApi.js";
import {
    requestChangePasswordFail,
    requestChangePasswordSuccess,
    startRequestChangePassword,
    startRequestUpdateInformation,
    startRequestUpdateInformationFail,
    startRequestUpdateInformationSuccess
} from "../../states/modules/profile/index.js";

export const updateInformation = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `update-profile`,
        actionTypes: [startRequestUpdateInformation, startRequestUpdateInformationSuccess, startRequestUpdateInformationFail],
        variables: {
            name: data.name,
            email: data.email,
        },
        dispatch,
        getState
    })
}


export const changePassword = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `change-password`,
        actionTypes: [startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail],
        variables: {
            current_password: data.currentPassword,
            password: data.password,
            password_confirmation: data.confirmPassword,
        },
        dispatch,
        getState
    })
}
