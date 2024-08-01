import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import profileReducer from './modules/profile/index.js';
import adminReducer from './modules/admin/index.js'
import userReducer from './modules/user/index.js';
import homeReducer from './modules/home/index.js';
import informationReducer from './modules/profile/information/index.js';
import passwordReducer from './modules/profile/password/index.js';
import cvReducer from './modules/profile/cv/index.js';
import jobManagementReducer from './modules/jobManagement/index.js';
import applicantReducer from './modules/applicant/index.js';
import jobReducer from './modules/job/index.js';
import appliedJobsReducer from './modules/appliedJobs/index.js';
import companyDashboardReducer from './modules/companyDashboard/index.js';

const rootReducer = {
    app: appReducer,
    home: homeReducer,
    auth: authReducer,
    admin : adminReducer,
    profile: profileReducer,
    information: informationReducer,
    password: passwordReducer,
    cv: cvReducer,
    user: userReducer,
    job : jobReducer,
    jobManagement: jobManagementReducer,
    applicant: applicantReducer,
    appliedJobs: appliedJobsReducer,
    companyDashboard: companyDashboardReducer,
}

export default rootReducer
