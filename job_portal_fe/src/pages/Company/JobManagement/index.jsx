import React, {useEffect, useState} from "react";
import './styles.scss'
import MainLayout from "../../../layouts/MainLayout/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import InlineSVG from "react-inlinesvg";
import Edit from "../../../assets/images/icons/duotone/pencil.svg";
import {
    initialData,
    setDetailJob,
    setErrorCreateOrUpdate,
    setVisibleModalCreateOrUpdate
} from "../../../states/modules/jobManagement/index.js";
import styles from "./styles.module.scss";
import {Button, Input, Switch, Tooltip} from "antd";
import TableDefault from "../../../components/Table/index.jsx";
import ModalDefault from "../../../components/Modal/index.jsx";
import CreateOrUpdate from "../../Company/JobManagement/components/CreateOrUpdate/index.jsx";
import {PlusOutlined} from '@ant-design/icons'
import {EMPLOYEE_TYPE, JOB_STATUS} from "../../../utils/constants.js";
import {goToPage, setTitlePage} from "../../../states/modules/app/index.js";
import ApplicantIcon from '../../../assets/images/icons/duotone/applicant.svg'
import IconSearch from '../../../assets/images/icons/duotone/magnifying-glass.svg'
import {handleFindLabelByValue, handleSplitSalary} from "../../../utils/helper.js";
import {updateJobStatus} from "../../../api/jobManagement/index.js";
import {setActiveConversation} from "../../../states/modules/conversation/index.js";

export default function JobManagement() {
    const [isTypeModalCreate, setIsTypeModalCreate] = useState(true);
    const visibleModalCreateOrUpdate = useSelector(state => state.jobManagement.visibleModalCreateOrUpdate);
    const jobs = useSelector(state => state.jobManagement.jobs);
    const isLoadingGetJobs = useSelector(state => state.jobManagement.isLoadingGetJobs);
    const isLoadingUpdateStatus = useSelector(state => state.jobManagement.isLoadingUpdateStatus);
    const dispatch = useDispatch();
    const [isMobileScreen, setIsMobileScreen] = useState(false)

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            showSorterTooltip: false,
            width: isMobileScreen ? 100 : 200,
            sorter: (a, b) => a.age - b.age,
            render: (text) => <span className={'font-bold'}>{text}</span>
        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            key: 'salary',
            showSorterTooltip: false,
            width: isMobileScreen ? 200 : '',
            sorter: (a, b) => a.age - b.age,
            render: (text) => handleSplitSalary(text)
        },
        {
            title: 'Số lượng tuyển',
            dataIndex: 'number_of_recruitment',
            key: 'number_of_recruitment',
            showSorterTooltip: false,
            width: 160,
            align: 'center',
            render: (text) => text + ' người'
        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            showSorterTooltip: false,
            width: 150,
        },
        {
            title: 'Loại công việc',
            dataIndex: 'type',
            key: 'type',
            width: isMobileScreen ? 100 : '',
            showSorterTooltip: false,
            render: (text) => handleFindLabelByValue(EMPLOYEE_TYPE, text)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            showSorterTooltip: false,
            width: 130,
            align: 'center',
            render: (text, record) => <Tooltip title={`Bấm để ${text === JOB_STATUS['OPEN'] ? 'đóng' : 'mở'}`}>
                <Switch className={'main-switch'} checked={text === JOB_STATUS['OPEN']}
                        loading={isLoadingUpdateStatus}
                        onChange={(checked) => dispatch(updateJobStatus({
                            id_job: record._id,
                            status: checked ? JOB_STATUS['OPEN'] : JOB_STATUS['CLOSED']
                        }))}
                />
            </Tooltip>
        },
        {
            title: 'Số lượng đã ứng tuyển',
            dataIndex: 'applied_candidates',
            key: 'applied_candidates',
            showSorterTooltip: false,
            align: 'center',
            width: isMobileScreen ? 100 : '',
            render: (text) => (text?.length || 0) + ' ứng viên'
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            width: isMobileScreen ? 100 : 120,
            align: 'center',
            fixed: 'right',
            render: (text, record) =>
                <div className={'flex items-center justify-center'}>
                    <div className={styles.btnAction} onClick={() => openModalEdit(record)}>
                        <div className={styles.editBtn}>
                            <InlineSVG src={Edit} width={18} height={18}/>
                        </div>
                    </div>
                    <div className={`${styles.btnAction} ml-2`}
                         onClick={() => dispatch(goToPage({path: `/account/jobs/${record._id}/applicants`}))}>
                        <div className={styles.editBtn}>
                            <InlineSVG src={ApplicantIcon} width={18} height={18}/>
                        </div>
                        {/*<div className={`btn-delete`} onClick={() => openModalDelete(record)}>*/}
                        {/*    <InlineSVG src={Delete}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
        },
    ];

    useEffect(() => {
        dispatch(setTitlePage('Quản lý công việc'))
    }, [dispatch])

    useEffect(() => {
        if (window.innerWidth >= 360 && window.innerWidth <= 768) {
            setIsMobileScreen(true)
        } else {
            setIsMobileScreen(false)
        }
    }, [dispatch])

    const handleReloadData = () => {
        dispatch(setErrorCreateOrUpdate({
            ...initialData.errorCreateOrUpdateJob
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

    const openModalEdit = (job) => {
        dispatch(setDetailJob(job));
        setIsTypeModalCreate(false);
        handleToggleVisibleModalCreateOrUpdate();
    }

    const handleChangeTable = (pagination, filters, sorter) => {
        // let newDataFilter = _.cloneDeep(dataFilter);
        // newDataFilter.order = null;
        // newDataFilter.column = null;
        // if (sorter.order && sorter.field) {
        //     newDataFilter.order = sorter.order === "descend" ? "DESC" : "ASC";
        //     newDataFilter.column = sorter.field;
        // }
        // dispatch(setDataFilter(newDataFilter));
    }

    return (
        <MainLayout>
            <div className={styles.listWrap}>
                <div className={styles.filterWrap}>
                    <div className={styles.search}>
                        <Input
                            prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt=""/>}
                            className={`main-input`}
                            placeholder={'Nhập tiêu đề việc làm để tìm kiếm'}
                            // value={dataFilter.keySearch}
                            // onChange={(e) => handleSearch(e)}
                            // onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className={styles.action}>
                        <Button
                            onClick={() => openModalCreate()}
                            className={`main-btn-primary flex items-center justify-center`}
                            type={'primary'}
                            size={'large'}
                        >
                            <PlusOutlined/> Đăng tuyển
                        </Button>
                    </div>
                </div>

                <div className={'tableWrap'}>
                    <TableDefault
                        rowKey={'_id'}
                        loading={isLoadingGetJobs}
                        dataSource={jobs}
                        columns={columns}
                        onChange={handleChangeTable}
                        isPagination={false}
                        extraClassName={'table-custom'}
                    />
                </div>
            </div>

            <ModalDefault
                isModalOpen={visibleModalCreateOrUpdate}
                handleOk={() => handleToggleVisibleModalCreateOrUpdate()}
                handleCancel={() => handleToggleVisibleModalCreateOrUpdate()}
                title={isTypeModalCreate ? 'Đăng tuyển công việc' : 'Cập nhật công việc'}
                width={900}
            >
                <CreateOrUpdate
                    isTypeModalCreate={isTypeModalCreate}
                    closeModal={() => handleToggleVisibleModalCreateOrUpdate()}
                />
            </ModalDefault>
        </MainLayout>
    )
}
