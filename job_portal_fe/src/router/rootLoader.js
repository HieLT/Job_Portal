import {redirect} from "react-router-dom";
import store from "../states/configureStore";
import {initialSaga} from "../states/modules/routing/index.js";
import {convertQueryStringToObject, hasRole} from "../utils/helper";
import {getMe} from "../api/auth/index.js";
import {getAuthToken, getProfile, setProfile} from "../utils/localStorage";
import {setLocation} from "../states/modules/app/index.js";

export const rootLoader = async ({request, params}, requiredAuth, saga = null, roleRequired = null) => {
    const url = new URL(request.url);
    let {auth} = store.getState();

    const authRoutes = ['/login', '/signup', '/forgot-password', '/verify-email']
    const firstCondition =  getAuthToken();
    const secondCondition = url.pathname !== '/account/profile' && !authRoutes.includes(url.pathname);

    if (url.pathname !== '/account/profile' && getAuthToken() && !auth.isAuthSuccess && getProfile() === '0') {
        return redirect('/account/profile')
    }

    if (!auth.isAuthSuccess && (firstCondition || secondCondition)) {
        if (!url.pathname?.includes("/admin") && getProfile() === '1') {
            await store.dispatch(getMe());
        }
        auth = store.getState().auth;
    }

    if (url.pathname === '/account/profile') {
        if (getProfile() === '1') {
            await store.dispatch(getMe());
        }
    }

    if (requiredAuth) {
        if (auth.isAuthSuccess) {
            if (roleRequired && !hasRole(roleRequired)) {
                return redirect('/403');
            }
        } else {
            let {app} = store.getState()
            if (app.location.prevPathName === '/account/profile') {
                return redirect('/account/profile');
            }
            return redirect('/login');
        }
    } else if (auth.isAuthSuccess) {
        return redirect('/');
    }

    let query = {...(url.search ? convertQueryStringToObject(url.search) : {})};
    if (!query.token && url.pathname === '/reset-password') {
        return redirect('/');
    }

    store.dispatch(setLocation({
        pathName: url.pathname,
        prevPathName: store.getState().app.location.pathName,
        params: {...params},
        query: query
    }))

    if (saga) {
        await store.dispatch(initialSaga(saga));
    }

    return null;
}
