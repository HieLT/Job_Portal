import loadAuthSaga from "../states/modules/auth/saga.js";
import loadHomeSaga from "../states/modules/home/saga.js";
import loadProfileSaga from "../states/modules/profile/saga.js";
import loadAdminSaga from "../states/modules/admin/saga.js";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_PROFILE_PAGE'] = loadProfileSaga
ROUTE_SAGAS['LOAD_ADMIN_PAGE'] = loadAdminSaga
