import {redirect} from "react-router-dom";
import store from "../states/configureStore";
import {initialSaga} from "../states/modules/routing/index.js";
import {convertQueryStringToObject, hasRole} from "../utils/helper";
import {getMe} from "../api/auth/index.js";
import {getAuthToken} from "../utils/localStorage";
import {getAuthToken} from "../utils/localStorage";
import {setLocation} from "../states/modules/app/index.js";
import _ from "lodash";
import {USER_ROLE} from "../utils/constants.js";

export const rootLoader = async ({request, params}, requiredAuth, saga = null, roleRequired = null) => {
    const url = new URL(request.url);
    let {auth} = store.getState();

    const firstCondition = !auth.isAuthSuccess && getAuthToken();
    const secondCondition = url.pathname === '/account/profile';
    const extraUrls = ['/forbidden']

    if (firstCondition || secondCondition) {
        await store.dispatch(getMe());
        auth = store.getState().auth;
        setProfile(1)
    }

    if (requiredAuth) {
        if (auth.isAuthSuccess) {
            if (roleRequired && !hasRole(roleRequired)) {
                return redirect('/forbidden');
            }
            if (auth.authUser?.account?.role === USER_ROLE['ADMIN'] && !url.pathname?.includes('/admin')) {
                return redirect('/admin/dashboard')
            }
            if (url.pathname !== '/account/profile' && !extraUrls.includes(url.pathname)
                && _.isEmpty(auth.authUser.profile) && !url.pathname?.includes('admin')
            ) {
                return redirect('/account/profile')
            }
        } else {
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
