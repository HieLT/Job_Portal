import React from "react";

export const routeMap = [
    // {
    //     label: 'Home',
    //     icon: (
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    //             <path fill="currentColor" d="M12 3l9 8-1.5 1.5L12 5.5 4.5 12.5 3 11z"/>
    //             <path fill="currentColor" d="M5 10v11h5v-6h4v6h5V10h3v12h-6v-7h-4v7H2V10h3z"/>
    //         </svg>
    //     ),
    //     path: '/',
    //     routeActive: ['/'],
    //     permissions: [],
    // },
    {
        label: 'Dashboard',
        icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 3l9 8-1.5 1.5L12 5.5 4.5 12.5 3 11z"/>
                        <path fill="currentColor" d="M5 10v11h5v-6h4v6h5V10h3v12h-6v-7h-4v7H2V10h3z"/>
                    </svg>
                ),
        path: '/admin/dashboard',
        routeActive: ['/admin/dashboard'],
        permissions: [],
    },
    {
        label: 'Companies Management',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M5 2v18H2v2h20v-2h-3V2H5zm12 2h3v16h-3V4zm-5 0h3v16h-3V4zM7 4h3v16H7V4z"/>
            </svg>
        ),
        path: '/admin/companies',
        routeActive: ['/admin/companies'],
        permissions: [],
    },
    {
        label: 'Candidates Management',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M16 14c1.68 0 3.2-.64 4.39-1.79 1.2-1.14 1.91-2.71 2.06-4.39l.05-.82h-2.24c-.16 1.38-.66 2.66-1.49 3.72A5.942 5.942 0 0116 13c-1.38 0-2.68-.5-3.72-1.39a6.036 6.036 0 01-1.49-3.72H2c0 1.62.79 3.23 2.06 4.39C5.68 13.36 7.2 14 9 14v6h3v2H8v2h8v-2h-4v-2h3v-6zm-7-4h2V5h4v5h2L12 1 9 10zm10 14h2v-2h-2v2z"/>
            </svg>
        ),
        path: '/admin/candidates',
        routeActive: ['/admin/candidates'],
        permissions: [],
    },
    {
        label: 'Jobs Management',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M15 14h5v2h-5v-2zm-2-5.02h-2V15h-2v-6H7L12 3l5 6h-4zm4 8.02H7v-2h10v2z"/>
            </svg>
        ),
        path: '/admin/posted-jobs',
        routeActive: ['/admin/posted-jobs'],
        permissions: [],
    },
];
