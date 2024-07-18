import React, {useEffect, useState} from "react";
import MainLayout from "../../layouts/MainLayout/index.jsx";
import {Button, Input} from "antd";
import TableDefault from "../../components/Table/index.jsx";
import styles from './styles.module.scss'
import ModalDefault from "../../components/Modal";
import IconSearch from "../../assets/images/icons/duotone/magnifying-glass.svg";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalDeleteDefault from "../../components/ModalDelete/index.jsx";
import {
    setDataFilter,
    setDetailAdmin,
    setErrorCreateOrUpdate,
    setErrorResetPassword,
    setVisibleModalCreateOrUpdate,
    setVisibleModalDeleteUser,
    setVisibleModalResetPassword
} from "../../states/modules/user/index.js";
import {useDispatch, useSelector} from "react-redux";
import InlineSVG from "react-inlinesvg";
import Edit from "../../assets/images/icons/duotone/pencil.svg";
import Delete from "../../assets/images/icons/duotone/trash-can.svg";
import _ from "lodash";

export default function AdminManagement() {
    const [isTypeModalCreate, setIsTypeModalCreate] = useState(true);
    const visibleModalCreateOrUpdate = useSelector(state => state.user.visibleModalCreateOrUpdate);
    const users = useSelector(state => state.user.users);
    const paginationListUsers = useSelector(state => state.user.paginationListUsers);
    const isLoadingTableUsers = useSelector(state => state.user.isLoadingTableUsers);
    const visibleModalDeleteUser = useSelector(state => state.user.visibleModalDeleteUser);
    const isLoadingBtnDelete = useSelector(state => state.user.isLoadingBtnDelete);
    const [contentModalDelete, setContentModalDelete] = useState('');
    const detailUser = useSelector(state => state.user.detailUser);
    const detailAdmin = useSelector(state => state.user.detailAdmin);
    const dataFilter = useSelector(state => state.user.dataFilter);
    const visibleModalResetPassword = useSelector(state => state.user.visibleModalResetPassword);
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            showSorterTooltip: false,
            sorter: (a, b) => a.age - b.age,
            render: (text) => <span className={'font-bold'}>{text}</span>
        },
        {
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
            showSorterTooltip: false,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
            showSorterTooltip: false,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            showSorterTooltip: false,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Phone',
            dataIndex: 'mobile',
            key: 'mobile',
            showSorterTooltip: false,
            render: (text) => text ? <span>{text}</span> :
                <i className={'text-gray-500'}>Updating ...</i>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 160,
            align: 'center',
            render: (text, record) =>
                <div>
                    {
                        !record?.protected_count ?
                            <div className={`btn-action`}>
                                <div className={`btn-edit`} onClick={() => openModalEdit(record)}>
                                    <InlineSVG src={Edit}/>
                                </div>
                                <div className={`btn-delete`} onClick={() => openModalDelete(record)}>
                                    <InlineSVG src={Delete}/>
                                </div>
                            </div>
                            : ''
                    }
                </div>
        },
    ];

    useEffect(() => {
        if (detailAdmin) {
            setContentModalDelete(
                <span>Bạn có chắc chắn muốn xóa tài khoản <div><b>{detailAdmin.username}</b>?</div></span>)
        }
    }, [detailAdmin])

    const handleReloadData = () => {
        dispatch(setErrorCreateOrUpdate({
            code: '',
            name: '',
            email: '',
            password: '',
            type: '',
            status: 1
        }))
        dispatch(setErrorResetPassword({
            password: '',
            confirmPassword: '',
        }))
    }

    const handleToggleVisibleModalCreateOrUpdate = () => {
        handleReloadData();
        dispatch(setVisibleModalCreateOrUpdate(!visibleModalCreateOrUpdate));
    }

    const openModalCreate = () => {
        setIsTypeModalCreate(true);
        handleToggleVisibleModalCreateOrUpdate();
    }

    const openModalEdit = (admin) => {
        dispatch(setDetailAdmin(admin));
        setIsTypeModalCreate(false);
        handleToggleVisibleModalCreateOrUpdate();
    }

    const openModalDelete = (admin) => {
        dispatch(setDetailAdmin(admin));
        dispatch(setVisibleModalDeleteUser(true));
    }

    const handleConfirmDelete = () => {
        if (detailAdmin) {
        }
    }

    const handleSearch = (e) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.keySearch = e.target.value;
        newDataFilter.page = 1;
        if (e.target.value === '') {
        }
        dispatch(setDataFilter(newDataFilter));
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        }
    }

    const handleChangeTable = (pagination, filters, sorter) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.order = null;
        newDataFilter.column = null;
        if (sorter.order && sorter.field) {
            newDataFilter.order = sorter.order === "descend" ? "DESC" : "ASC";
            newDataFilter.column = sorter.field;
        }
        dispatch(setDataFilter(newDataFilter));
    }

    const handleSelectPagination = (value) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.page = value;
        dispatch(setDataFilter(newDataFilter));
    }

    const handleToggleVisibleModalResetPassword = () => {
        handleReloadData();
        dispatch(setVisibleModalResetPassword(!visibleModalResetPassword));
    }

    return (
        <MainLayout>
            <div>
                <div className={styles.listWrap}>
                    <div className={styles.filterWrap}>
                        <div className={styles.search}>
                            <Input
                                prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt=""/>}
                                className={`main-input`}
                                placeholder={'Enter username ...'}
                                value={dataFilter.keySearch}
                                onChange={(e) => handleSearch(e)}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                        <div className={styles.action}>
                            <Button
                                onClick={() => openModalCreate()}
                                className={`main-btn-primary`}
                                type={'primary'}
                                size={'large'}>
                                Create
                            </Button>
                        </div>
                    </div>

                    <div className={'tableWrap'}>
                        <TableDefault
                            rowKey={'id'}
                            loading={isLoadingTableUsers}
                            dataSource={users}
                            columns={columns}
                            onChange={handleChangeTable}
                            pagination={paginationListUsers}
                            handleSelectPagination={(e) => handleSelectPagination(e)}
                        />
                    </div>
                </div>

                <ModalDefault
                    isModalOpen={visibleModalCreateOrUpdate}
                    handleOk={() => handleToggleVisibleModalCreateOrUpdate()}
                    handleCancel={() => handleToggleVisibleModalCreateOrUpdate()}
                    title={isTypeModalCreate ? 'Create information' : 'Update information'}
                    width={850}
                >
                    <CreateOrUpdate
                        isTypeModalCreate={isTypeModalCreate}
                        closeModal={() => handleToggleVisibleModalCreateOrUpdate()}
                    />
                </ModalDefault>

                <ModalDeleteDefault
                    content={contentModalDelete}
                    contentBtn={"Delete"}
                    isModalOpen={visibleModalDeleteUser}
                    handleOk={() => dispatch(setVisibleModalDeleteUser(false))}
                    handleCancel={() => dispatch(setVisibleModalDeleteUser(false))}
                    handleConfirm={() => handleConfirmDelete()}
                    loading={isLoadingBtnDelete}
                />
            </div>
        </MainLayout>
    )
}
