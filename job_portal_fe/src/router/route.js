import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import {rootLoader} from "./rootLoader.js";
import Login from "../pages/Auth/Login";
import AdminManagement from "../pages/AdminManagement/index.jsx";
import AdminDashboard from "../pages/Admin/Dashboard/index.jsx";
import AdminPostedJobs from "../pages/Admin/PostedJobs/index.jsx";
import AdminCandidates from "../pages/Admin/Candidates/index.jsx";
import AdminCompanies from "../pages/Admin/Companies/index.jsx";
import Signup from "../pages/Auth/Signup/index.jsx";
import ResetPassword from "../pages/Auth/ResetPassword/index.jsx";
import ForgotPassword from "../pages/Auth/ForgotPassword/index.jsx";
import VerifyEmailResult from "../pages/Auth/VerifyEmailResult/index.jsx";
import {USER_ROLE} from "../utils/constants.js";
import ProfileRouting from "../pages/ProfileRouting/index.jsx";
import Forbidden from "../components/Forbidden/index.jsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '/signup',
        element: <Signup/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '/reset-password',
        element: <ResetPassword/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '/verify-email/:token',
        element: <VerifyEmailResult/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '',
        element: <Home/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_HOME_PAGE'
        )
    },
    {
        path: '/admins',
        element: <AdminManagement/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_USER_PAGE', USER_ROLE['ADMIN']
        )
    },
    {
        path: '/account/profile',
        element: <ProfileRouting/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_PROFILE_PAGE'
        )
    },
    {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
        loader: ({ request, params }) => rootLoader(
            { request, params }, true, 'LOAD_ADMIN_PAGE', USER_ROLE['ADMIN']
        )
    },
    {
        path: '/admin/candidates',
        element: <AdminCandidates />,
        loader: ({ request, params }) => rootLoader(
            { request, params }, true, 'LOAD_ADMIN_PAGE', USER_ROLE['ADMIN']
        )
    },
    {
        path: '/admin/companies',
        element: <AdminCompanies />,
        loader: ({ request, params }) => rootLoader(
            { request, params }, true, 'LOAD_ADMIN_PAGE', USER_ROLE['ADMIN']
        )
    },
    {
        path: '/admin/posted-jobs',
        element: <AdminPostedJobs />,
        loader: ({ request, params }) => rootLoader(
            { request, params }, true, 'LOAD_ADMIN_PAGE', USER_ROLE['ADMIN']
        )
    },
    {
        path: '/forbidden',
        element: <Forbidden />,
        loader: ({ request, params }) => rootLoader(
            { request, params }, true
        )
    },
]);

export default router;
