import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import {rootLoader} from "./rootLoader.js";
import Login from "../pages/Auth/Login";
import AdminManagement from "../pages/AdminManagement/index.jsx";
import Signup from "../pages/Auth/Signup/index.jsx";
import ResetPassword from "../pages/Auth/ResetPassword/index.jsx";
import ForgotPassword from "../pages/Auth/ForgotPassword/index.jsx";

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
            {request, params}, false, 'LOAD_USER_PAGE'
        )
    }
]);

export default router;
