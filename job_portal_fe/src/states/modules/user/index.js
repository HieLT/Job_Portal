import {createSlice} from "@reduxjs/toolkit";
import {userInitialData} from "./initialState";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        errorCreateOrUpdate: {
            code: '',
            name: '',
            email: '',
            password: '',
            type: '',
            status: 1
        },
        errorResetPassword: {
            password: '',
            confirmPassword: '',
        },
        isLoadingBtnCreateOrUpdate: false,
        visibleModalCreateOrUpdate: false,
        isLoadingTableUsers: false,
        users: [],
        detailAdmin: {},
        idUser: '',
        dataFilter: userInitialData.dataFilter,
        paginationListUsers: {
            currentPage: 1,
            perPage: 10,
            totalPage: 1,
            totalRecord: 0,
        },
        detailUser: {},
        isLoadingDetailUser: false,
        isLoadingBtnDelete: false,
        visibleModalDeleteUser: false,
        isLoadingBtnResetPassword: false,
        visibleModalResetPassword: false,
    },
    reducers: {
        setIdUser: (state, action) => ({
            ...state,
            idUser: action.payload
        }),
        setVisibleModalCreateOrUpdate: (state, action) => ({
            ...state,
            visibleModalCreateOrUpdate: action.payload
        }),
        setErrorCreateOrUpdate: (state, action) => ({
            ...state,
            errorCreateOrUpdate: action.payload
        }),
        startRequestCreate: state => ({
            ...state,
            isLoadingBtnCreateOrUpdate: true
        }),
        requestCreateSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdate: false,
            visibleModalCreateOrUpdate: false
        }),
        requestCreateFail: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdate: false
        }),
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),
        startRequestGetListAdmins: (state) => ({
            ...state,
            isLoadingTableUsers: true
        }),
        requestGetListAdminsSuccess: (state, action) => ({
            ...state,
            isLoadingTableUsers: false,
            users: action.payload.data.admins,
            paginationListUsers: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalPage: Math.ceil(action.payload.data.total / action.payload.data.per_page),
                totalRecord: action.payload.data.total,
            }
        }),
        requestGetListAdminsFail: (state) => ({
            ...state,
            isLoadingTableUsers: false,
            users: [],
            paginationListUsers: {
                currentPage: 1,
                perPage: 10,
                totalPage: 1,
                totalRecord: 0,
            }
        }),
        setDetailAdmin: (state, action) => ({
            ...state,
            detailAdmin: action.payload
        }),
        startRequestGetDetailUser: state => ({
            ...state,
            isLoadingDetailUser: true
        }),
        requestGetDetailUserSuccess: (state, action) => ({
            ...state,
            isLoadingDetailUser: false,
            detailUser: {
                ...action.payload.data,
                confirm_password: ''
            }
        }),
        requestGetDetailUserFail: (state) => ({
            ...state,
            isLoadingDetailUser: false,
            detailUser: {}
        }),
        startRequestUpdate: state => ({
            ...state,
            isLoadingBtnCreateOrUpdate: true
        }),
        requestUpdateSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdate: false,
            visibleModalCreateOrUpdate: false
        }),
        requestUpdateFail: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdate: false
        }),
        setVisibleModalDeleteUser: (state, action) => ({
            ...state,
            visibleModalDeleteUser: action.payload
        }),
        startRequestDelete: state => ({
            ...state,
            isLoadingBtnDelete: true
        }),
        requestDeleteSuccess: (state) => ({
            ...state,
            isLoadingBtnDelete: false,
            visibleModalDeleteUser: false
        }),
        requestDeleteFail: (state) => ({
            ...state,
            isLoadingBtnDelete: false
        }),

        setErrorResetPassword: (state, action) => ({
            ...state,
            errorResetPassword: action.payload
        }),
        setVisibleModalResetPassword: (state, action) => ({
            ...state,
            visibleModalResetPassword: action.payload
        }),
        startRequestResetPassword: state => ({
            ...state,
            isLoadingBtnResetPassword: true
        }),
        requestResetPasswordSuccess: (state) => ({
            ...state,
            isLoadingBtnResetPassword: false,
            visibleModalResetPassword: false
        }),
        requestResetPasswordFail: (state) => ({
            ...state,
            isLoadingBtnResetPassword: false
        }),
    }
})

export const {
    setDetailAdmin,
    setErrorCreateOrUpdate, setVisibleModalCreateOrUpdate, setVisibleModalDeleteUser,
    setDataFilter, setVisibleModalResetPassword, setErrorResetPassword, setIdUser,
    startRequestGetListAdmins, requestGetListAdminsSuccess, requestGetListAdminsFail,
    startRequestCreate, requestCreateSuccess, requestCreateFail,
    startRequestGetDetailUser, requestGetDetailUserSuccess, requestGetDetailUserFail,
    startRequestUpdate, requestUpdateSuccess, requestUpdateFail,
    startRequestDelete, requestDeleteSuccess, requestDeleteFail,
    startRequestResetPassword, requestResetPasswordSuccess, requestResetPasswordFail
} = userSlice.actions

export default userSlice.reducer;
