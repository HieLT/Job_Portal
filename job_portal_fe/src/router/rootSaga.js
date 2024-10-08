import loadAuthSaga from "../states/modules/auth/saga.js";
import loadHomeSaga from "../states/modules/home/saga.js";
import loadProfileSaga from "../states/modules/profile/saga.js";
import loadAdminSaga from "../states/modules/admin/saga.js";
import loadApplicantSaga from "../states/modules/applicant/saga.js";
import loadJobManagementSaga from "../states/modules/jobManagement/saga.js";
import loadJobSaga from "../states/modules/job/saga.js";
import loadAppliedJobsSaga from "../states/modules/appliedJobs/saga.js";
import loadCompanyDashboardSaga from "../states/modules/companyDashboard/saga.js";
import loadConversationSaga from "../states/modules/conversation/saga.js";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_PROFILE_PAGE'] = loadProfileSaga
ROUTE_SAGAS['LOAD_ADMIN_PAGE'] = loadAdminSaga
ROUTE_SAGAS['LOAD_JOB_DETAIL_PAGE'] = loadJobSaga
ROUTE_SAGAS['LOAD_COMPANY_JOBS_PAGE'] = loadJobManagementSaga
ROUTE_SAGAS['LOAD_APPLICANT_PAGE'] = loadApplicantSaga
ROUTE_SAGAS['LOAD_APPLIED_JOBS_PAGE'] = loadAppliedJobsSaga
ROUTE_SAGAS['LOAD_COMPANY_DASHBOARD_PAGE'] = loadCompanyDashboardSaga
ROUTE_SAGAS['LOAD_CONVERSATION_PAGE'] = loadConversationSaga
