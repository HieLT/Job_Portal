const AUTH_TOKEN_STORE_KEY = 'token';
const AUTH_EMAIL_STORE_KEY = 'email';
const AUTH_ROLE_STORE_KEY = 'role';
const AUTH_PROFILE_STORE_KEY = 'profile';

export const removeAuthToken = () => {
    return localStorage.removeItem(AUTH_TOKEN_STORE_KEY);
}

export const removeAuthEmail = () => {
    return localStorage.removeItem(AUTH_EMAIL_STORE_KEY);
}

export const setAuthToken = (token) => {
    return localStorage.setItem(AUTH_TOKEN_STORE_KEY, token);
}

export const setAuthRole = (role) => {
    return localStorage.setItem(AUTH_ROLE_STORE_KEY, role);
}

export const removeAuthRole = () => {
    return localStorage.removeItem(AUTH_ROLE_STORE_KEY);
}

export const removeProfile = () => {
    return localStorage.removeItem(AUTH_PROFILE_STORE_KEY);
}

export const setAuthEmail = (email) => {
    return localStorage.setItem(AUTH_EMAIL_STORE_KEY, email);
}

export const getAuthEmail = () => {
    return localStorage.getItem(AUTH_EMAIL_STORE_KEY)
}

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_STORE_KEY)
}

export const getAuthRole = () => {
    return localStorage.getItem(AUTH_ROLE_STORE_KEY)
}

export const hasAuthToken = () => {
    return !!getAuthToken();
}

export const setProfile = (data) => {
    return localStorage.setItem(AUTH_PROFILE_STORE_KEY, data)
}

export const getProfile = () => {
    return localStorage.getItem(AUTH_PROFILE_STORE_KEY)
}

export const removeItem = (name) => {
    return localStorage.removeItem(name);
}