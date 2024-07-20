import React from "react";
import store from "../states/configureStore";
import {notification} from "antd";
import CloseIcon from '../assets/images/icons/light/close.svg';
import success from '../assets/images/icons/notification/success_16x16.svg';
import error from '../assets/images/icons/notification/error_16x16.svg';
import warning from '../assets/images/icons/notification/warning_16x16.svg';
import {isValidate} from "./validate.js";
import moment from "moment";
import {isValidateLesson} from "./validates/validateLesson.js";
import {validateBook} from "./validates/validateBook.js";
import {validateCandidate} from "./validates/validateCandidate.js";

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,50}$/
export const VALIDATE_PHONE_REGEX_RULE = /^[0-9]{3}[0-9]{3}[0-9]{4}$/

export const hasPermission = (permissions) => {
    let {auth} = store.getState();
    let isPermission = false;
    if (permissions) {
        permissions.forEach(permission => {
            if (
                auth.authUser &&
                auth.authUser.permissions &&
                (
                    auth.authUser.permissions.includes(permission)
                )
            ) {
                isPermission = true
            }
        })
    }

    return isPermission;
}

export const hasRole = (role) => {
    let {auth} = store.getState();
    return role && auth.authUser.account.role.equals(role)
}

export const getNotification = (type, content, duration = 3, align = 'top') => {
    let typeNotification = handleGetTypeNotification(type);
    notification[type]({
        message: '',
        description: (
            <div className={`notification-content ${typeNotification.className}`}>
                <div className={'icon-notification'}>
                    <img src={typeNotification.icon} alt=""/>
                </div>
                <span className={'text-notification'}>{content}</span>
            </div>
        ),
        closeIcon: (
            <img src={CloseIcon} alt=""/>
        ),
        placement: align,
        duration: duration,
        style: {fontWeight: "normal"}
    });
};

const handleGetTypeNotification = (type) => {
    let typeNotification = {};
    switch (type) {
        case "error":
            typeNotification = {
                className: 'notification-error',
                icon: error,
            }
            break;
        case "warning":
            typeNotification = {
                className: 'notification-warning',
                icon: warning,
            }
            break;
        default:
            typeNotification = {
                className: 'notification-success',
                icon: success,
            }
    }
    return typeNotification
}

// Validate
export const isValidEmail = (email) => {
    let result = false
    if (email && typeof email === 'string') {
        const regex = RegExp(VALIDATE_EMAIL_REGEX);
        result = regex.test(email.trim())
    }
    return result
}


export const isValidPassword = (password) => {
    let result = false
    if (password && typeof password === 'string') {
        const regex = RegExp(VALIDATE_PASSWORD_REGEX);
        result = regex.test(password.trim())
    }
    return result
}

export const isValidPhone = (phone) => {
    let result = false

    if (phone && typeof phone === 'string') {
        let trimPhone = phone.trim()

        if (trimPhone) {
            const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

            let ruleMatchs = trimPhone.match(regexRule);

            if (ruleMatchs && ruleMatchs.length > 0) {
                result = (ruleMatchs[0] === trimPhone)
            }
        }
    }
    return result
}

export const handleCheckValidateConfirm = (data, errors, type) => {
    let error = false;
    let keys = Object.keys(data);
    let dataError = errors
    keys.map(key => {
        let validate
        switch (type) {
            case 'candidate':
                validate = validateCandidate(data, key, dataError);
                break;
            default:
                validate = isValidate(data, key, dataError);
                break;
        }
        dataError = validate.error;
        if (validate.isError) {
            error = true;
        }
    })

    return {
        isError: error,
        dataError: dataError
    }
}

export const handleCheckValidateLesson = (data, errors) => {
    let error = false;
    let keys = Object.keys(data);
    let dataError = errors
    keys.map(key => {
        let validate = isValidateLesson(data, key, dataError);
        dataError = validate.error;
        if (validate.isError) {
            error = true;
        }
    })

    return {
        isError: error,
        dataError: dataError
    }
}

export const handleCheckRoute = (routes, currentRoute) => {
    if (routes && routes.length > 0) {
        return routes.includes(currentRoute);
    }
};


export const convertQueryStringToObject = (queryString) => {
    if (queryString.charAt(0) === '?') {
        queryString = queryString.substring(1);
    }

    var pairs = queryString.split('&');
    var result = {};

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1] || '');

        if (Object.prototype.hasOwnProperty.call(result, key)) {
            if (!Array.isArray(result[key])) {
                result[key] = [result[key]];
            }

            result[key].push(value);
        } else {
            result[key] = value;
        }
    }

    return result;
}

export const handleSetTimeOut = (func, delay = 1000, timeoutId = null) => {
    let handleSetTimeOut;
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    handleSetTimeOut = setTimeout(func, delay);

    return handleSetTimeOut;
}

export const formatDate = (date) => {
    return moment(date * 1000).format('HH:mm DD/MM/YYYY')
}
