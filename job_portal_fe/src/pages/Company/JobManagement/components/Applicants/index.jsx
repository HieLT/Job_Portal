import React, {useEffect, useState} from 'react';
import {Avatar, Input} from "antd";
import styles from "../../styles.module.scss";
import TableDefault from "../../../../../components/Table/index.jsx";
import MainLayout from "../../../../../layouts/MainLayout/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBreadcrumb, setTitlePage} from "../../../../../states/modules/app/index.js";
import DefaultAvatar from '../../../../../assets/images/logos/user_default.png'
import moment from "moment";
import IconSearch from '../../../../../assets/images/icons/duotone/magnifying-glass.svg'
import DownloadIcon from '../../../../../assets/images/icons/duotone/download.svg'
import DetailIcon from '../../../../../assets/images/icons/duotone/detail.svg'
import {EllipsisOutlined} from '@ant-design/icons'
import InlineSVG from "react-inlinesvg";
import {confirmDownloadedResume, confirmSeenResume} from "../../../../../api/jobManagement/index.js";
import {downloadFile, getNotification} from "../../../../../utils/helper.js";

export default function Applicants() {
    const isLoadingGetApplicant = useSelector(state => state.applicant.isLoadingGetAppliedCandidate)
    const applicants = useSelector(state => state.applicant.appliedCandidates)
    const [visibleOptions, setVisibleOptions] = useState(null)
    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'info',
            key: 'info',
            showSorterTooltip: false,
            width: 250,
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => <span className={'font-bold flex justify-start items-center'}>
                <Avatar src={record.candidate_id.avatar || DefaultAvatar} size={80}/>
                <span className={'ml-5'}>{record.candidate_id.first_name + ' ' + record.candidate_id.last_name}</span>
            </span>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            showSorterTooltip: false,
            width: 120,
            align: 'center',
            render: (text, record) => <a href={`tel:${record.candidate_id.phone || null}`}
                                         className={'text-[#4d94ff]'}>
                {record.candidate_id.phone || <i className={'text-gray-500'}>Đang cập nhật</i>}
            </a>
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birth',
            key: 'birth',
            showSorterTooltip: false,
            width: 140,
            align: 'center',
            render: (text, record) => <span>
                {
                    record.candidate_id.birth ? moment(record.candidate_id.birth).format('DD/MM/YYYY') :
                        <i className={'text-gray-500'}>Đang cập nhật</i>
                }
            </span>
        },
        {
            title: 'Thư ứng tuyển',
            dataIndex: 'cover_letter',
            key: 'cover_letter',
            showSorterTooltip: false,
            width: 200,
            render: (text) => (
                <div className={'max-h-[150px] overflow-auto'}>{text}</div>
            )
        },
        {
            title: 'Hồ sơ ứng tuyển',
            dataIndex: 'resume_path',
            key: 'resume_path',
            showSorterTooltip: false,
            width: 220,
            render: (text, record) => (
                <div className={'flex items-center justify-between'}>
                    <div className={'text-[#4d94ff] max-w-[100%] whitespace-nowrap overflow-hidden overflow-ellipsis'}>
                        <div onClick={() => handleClickViewResume(record)} className={'cursor-pointer'}>
                            Hồ sơ của&nbsp;
                            <span className={'font-semibold'}>
                                {record.candidate_id.first_name + ' ' + record.candidate_id.last_name}
                            </span>
                        </div>
                    </div>
                    <div className={styles.optionWrap}
                         onClick={() => setVisibleOptions((visibleOptions && visibleOptions === record._id)
                             ? null : record._id)}
                    >
                        <EllipsisOutlined className={'rotate-[-90deg]'}/>
                        {
                            (visibleOptions && visibleOptions === record._id) ?
                                <div className={styles.dropDownWrap} onMouseLeave={() => setVisibleOptions(null)}>
                                    <div onClick={() => handleClickViewResume(record)}
                                         className={'hover:bg-[#f9f9f9] flex items-center justify-start p-2 rounded-md hover:fill-[#5B8DEF] hover:text-[#000]'}>
                                        <InlineSVG src={DetailIcon} height={17} width={17} className={'mr-1.5'}/>
                                        Xem
                                    </div>
                                    <div className={styles.downloadWrap} onClick={() => handleDownloadResume(record)}>
                                        <InlineSVG src={DownloadIcon} height={17} width={17} className={'mr-1.5'}/>
                                        Tải xuống
                                    </div>
                                </div> : ''
                        }
                    </div>
                </div>
            )
        },
    ];
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTitlePage(`Danh sách ứng viên`))
        dispatch(setBreadcrumb([
            {
                title: 'Quản lý công việc',
                href: '/account/jobs',
            },
            {
                title: 'Danh sách ứng viên',
            }
        ]))
    }, [dispatch])

    const handleDownloadResume = (application) => {
        if (!application?.downloaded_at) {
            dispatch(confirmDownloadedResume({
                applicationId: application._id,
                jobId: application.job_id
            }))
        } else {
            downloadFile(application.resume_path)
                .then(() => getNotification('success', 'Tải xuống thành công'))
                .catch(() => getNotification('error', 'Đã có lỗi xảy ra, vui lòng thử lại sau'))
        }
    }

    const handleClickViewResume = (application) => {
        if (!application?.seen_at) {
            dispatch(confirmSeenResume({
                applicationId: application._id,
                jobId: application.job_id
            }))
        } else {
            window.open(application.resume_path)
        }
    }

    return <MainLayout>
        <div className={styles.listWrap}>
            <div className={styles.filterWrap}>
                <div className={styles.search}>
                    <Input
                        prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt=""/>}
                        className={`main-input`}
                        placeholder={'Nhập tên ứng viên để tìm kiếm'}
                        // value={dataFilter.keySearch}
                        // onChange={(e) => handleSearch(e)}
                        // onKeyDown={handleKeyPress}
                    />
                </div>
            </div>

            <div className={'tableWrap'}>
                <TableDefault
                    rowKey={'_id'}
                    loading={isLoadingGetApplicant}
                    dataSource={applicants}
                    columns={columns}
                    // onChange={handleChangeTable}
                    isPagination={false}
                    extraClassName={'applicants-table-custom'}
                />
            </div>
        </div>
    </MainLayout>
}
