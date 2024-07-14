import axios from "axios";
import {isFunction} from 'lodash';
import {getAuthToken, removeAuthToken} from "../utils/localStorage";
import {goToPage} from "../states/modules/app";
import {setAuthSuccess} from "../states/modules/auth/index.js";

export default async function callApi(
    {
        content,
        url,
        method,
        apiPath,
        actionTypes: [requestType, successType, failureType],
        variables,
        dispatch,
        getState,
        headers
    }) {
    if (!isFunction(dispatch) || !isFunction(getState)) {
        throw new Error('callGraphQLApi requires dispatch and getState functions');
    }

    const token = getAuthToken();
    const header = {
        "Content-Type": content ? content : "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
    };
    dispatch(requestType())

    return axios({
        baseURL: url,
        headers: headers ? {...headers, ...header} : header,
        method: method,
        url: apiPath,
        data: variables,
        params: method === 'get' ? variables : ''
    })
        .then(function (response) {
            dispatch(successType(response.data))
            return response.data;
        })
        .catch((error) => {
            let response = error.response ? error.response : error;
            dispatch(failureType(error.response));
            if (response.status === 401) {
                removeAuthToken()
                dispatch(goToPage({path: '/login'}));
                dispatch(setAuthSuccess(false))
            } else if (response.status === 403) {
                dispatch(goToPage({path: '/'}));
            }
            return response
        })
}
