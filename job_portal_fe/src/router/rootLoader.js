import {redirect} from "react-router-dom";
import store from "../states/configureStore";
import {initialSaga} from "../states/modules/routing/index.js";
import {convertQueryStringToObject, hasRole} from "../utils/helper";
import {getMe} from "../api/auth/index.js";
import {getAuthToken} from "../utils/localStorage";
import {setLocation} from "../states/modules/app/index.js";

export const rootLoader = async ({request, params}, requiredAuth, saga = null, roleRequired = null) => {
    const url = new URL(request.url);
    let {auth} = store.getState();

    const firstCondition = !auth.isAuthSuccess && getAuthToken();
    const secondCondition = url.pathname === '/account/profile';

    if (firstCondition || secondCondition) {
        await store.dispatch(getMe());
        auth = store.getState().auth;
    }

    if (requiredAuth) {
        if (auth.isAuthSuccess) {
            if (roleRequired && !hasRole(roleRequired)) {
                return redirect('/403');
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
