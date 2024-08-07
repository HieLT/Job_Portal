import React, {useEffect, useState} from "react";
import './styles.scss'
import MainLayout from "../../../layouts/MainLayout/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBreadcrumb, setTitlePage} from "../../../states/modules/app/index.js";
import {handleFindLabelByValue} from "../../../utils/helper.js";
import {EMPLOYEE_TYPE, JOB_STATUS} from "../../../utils/constants.js";
import {Skeleton, Switch, Tooltip} from "antd";
import TableDefault from "../../../components/Table/index.jsx";
import {updateStatus} from "../../../api/companyDashboard/index.js";
import styles from './styles.module.scss'
import moment from "moment";

export default function CompanyDashboard() {
    const dispatch = useDispatch()
    const quantity = useSelector(state => state.companyDashboard.quantity)
    const isLoadingGetQuantity = useSelector(state => state.companyDashboard.isLoadingGetQuantity)
    const isLoadingGetJobsAboutToExpire = useSelector(state => state.companyDashboard.isLoadingGetJobsAboutToExpire)
    const jobsAboutToExpire = useSelector(state => state.companyDashboard.jobsAboutToExpire)
    const isLoadingUpdateJobStatus = useSelector(state => state.companyDashboard.isLoadingUpdateJobStatus)
    const [isMobileScreen, setIsMobileScreen] = useState(false)
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            showSorterTooltip: false,
            width: isMobileScreen ? 100 : '',
            sorter: (a, b) => a.age - b.age,
            render: (text) => <span className={'font-bold'}>{text}</span>
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
            title: 'Loại công việc',
            dataIndex: 'type',
            key: 'type',
            showSorterTooltip: false,
            width: isMobileScreen ? 100 : '',
            render: (text) => handleFindLabelByValue(EMPLOYEE_TYPE, text)
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expired_at',
            key: 'expired_at',
            showSorterTooltip: false,
            width: isMobileScreen ? 100 : '',
            render: (text) => moment(text).format('DD/MM/YYYY')
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
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            showSorterTooltip: false,
            width: isMobileScreen ? 60 : 130,
            align: 'center',
            fixed: 'right',
            render: (text, record) => <Tooltip title={`Bấm để ${text === JOB_STATUS['OPEN'] ? 'đóng' : 'mở'}`}>
                <Switch className={'main-switch'} checked={text === JOB_STATUS['OPEN']}
                        loading={isLoadingUpdateJobStatus}
                        onChange={(checked) => dispatch(updateStatus({
                            id_job: record._id,
                            status: checked ? JOB_STATUS['OPEN'] : JOB_STATUS['CLOSED']
                        }))}
                />
            </Tooltip>
        },
    ];

    useEffect(() => {
        dispatch(setTitlePage('Tổng quan'))
        dispatch(setBreadcrumb([]))
        if (window.innerWidth >= 360 && window.innerWidth <= 768) {
            setIsMobileScreen(true)
        } else {
            setIsMobileScreen(false)
        }
    }, [dispatch])

    return <MainLayout>
        <div className={'flex justify-between h-[calc(100vh_-_190px)]'}>
            <div className={'flex flex-col w-[30%]'}>
                <div className={'p-6 bg-[#3385ff] h-[150px] rounded-md text-[white]'}>
                    <div className={'font-semibold mt-[-5px]'}>Việc làm</div>
                    <div className={'flex justify-between items-center mt-[-4px]'}>
                        {
                            isLoadingGetQuantity ? <Skeleton.Input active /> :
                                <div className={'text-4xl'}>{quantity.jobs}</div>
                        }
                        <svg className="icon me-n2 svg-icon-ti-ti-briefcase" style={{opacity: ".1"}}
                             xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
                            <path d="M12 12l0 .01"></path>
                            <path d="M3 13a20 20 0 0 0 18 0"></path>
                        </svg>
                    </div>
                </div>
                <div className={'bg-[#2fb344] h-[150px] p-6 rounded-md text-[white] mt-7'}>
                    <div className={'font-semibold mt-[-5px]'}>Ứng viên</div>
                    <div className={'flex justify-between items-center mt-[-4px]'}>
                        {
                            isLoadingGetQuantity ? <Skeleton.Input active/> :
                                <div className={'text-4xl'}>{quantity.applicants}</div>
                        }
                        <svg className="icon me-n2 svg-icon-ti-ti-building" style={{opacity: ".1"}}
                             xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 21l18 0"></path>
                            <path d="M9 8l1 0"></path>
                            <path d="M9 12l1 0"></path>
                            <path d="M9 16l1 0"></path>
                            <path d="M14 8l1 0"></path>
                            <path d="M14 12l1 0"></path>
                            <path d="M14 16l1 0"></path>
                            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={styles.bottomTableWrap}>
                <div className={'px-7 py-4 text-[16px] font-semibold border-b-[1px]'}>Việc làm sắp hết hạn ứng tuyển
                </div>
                <div className={'px-4 pb-6 pt-1'}>
                    <TableDefault
                        rowKey={'_id'}
                        loading={isLoadingGetJobsAboutToExpire}
                        dataSource={jobsAboutToExpire}
                        columns={columns}
                        isPagination={false}
                        extraClassName={'bottom-table-custom'}
                    />
                </div>
            </div>
        </div>
    </MainLayout>
}
