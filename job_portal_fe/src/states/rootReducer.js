import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import profileReducer from './modules/profile/index.js';
import userReducer from './modules/user/index.js';
import homeReducer from './modules/home/index.js';

const rootReducer = {
    app: appReducer,
    home: homeReducer,
    auth: authReducer,
    profile: profileReducer,
    user: userReducer,
}

export default rootReducer
