import React, {useEffect} from "react";
import './styles.scss'
import HeaderOnly from "../../../layouts/HeaderOnly/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {goToPage, setBreadcrumb} from "../../../states/modules/app/index.js";
import {Badge, Image, Select, Skeleton, Tag, Tooltip} from "antd";
import DefaultLogo from '../../../assets/images/logos/user_default.png'
import {CreditCardOutlined, EyeOutlined} from '@ant-design/icons'
import {convertISOStringToDateTime, handleFindLabelByValue, handleSplitSalary} from "../../../utils/helper.js";
import {EMPLOYEE_TYPE, JOB_EXPERIENCE, JOB_STATUS} from "../../../utils/constants.js";
import styles from './styles.module.scss'
import moment from "moment";

export default function AppliedJobs() {
    const dispatch = useDispatch()
    const appliedJobs = useSelector(state => state.appliedJobs.appliedJobs)
    const isLoadingGetAppliedJobs = useSelector(state => state.appliedJobs.isLoadingGetAppliedJobs)

    useEffect(() => {
        dispatch(setBreadcrumb([
            {
                href: '/',
                title: 'Trang chủ'
            },
            {
                title: 'Công việc đã ứng tuyển'
            }
        ]))
    }, [dispatch])

    const handleFindColorByEmployeeType = (type) => {
        switch (type) {
            case 'FULL-TIME':
                return 'magenta'
            case 'CONTRACT':
                return 'orange'
            case 'FREELANCE':
                return 'green'
            case 'PART-TIME':
                return 'blue'
            case 'INTERNSHIP':
                return 'purple'
        }
    }

    const handleFindColorAndLabelByResumeStatus = (application, key) => {
        let status = 'applied'
        if (application?.seen_at && !application?.downloaded_at) {
            status = 'seen'
        } else if (application?.downloaded_at) {
            status = 'downloaded'
        }

        const statusColorAndLabel = {
            color: {
                applied: 'cyan',
                seen: 'geekblue',
                downloaded: 'gold'
            },
            label: {
                applied: 'Đã ứng tuyển',
                seen: 'Công ty đã xem hồ sơ',
                downloaded: 'Công ty đã tải hồ sơ'
            }
        }

        return key === 'color' ? statusColorAndLabel['color'][status] : statusColorAndLabel['label'][status]
    }

    return <HeaderOnly>
        <div className={styles.container}>
            <div className={styles.headerWrap}>
                <div className={styles.title}>
                    Công việc đã ứng tuyển
                </div>
                <Select
                    className={'main-select border-[1px] rounded-md'}
                    placeholder={'Lọc theo thời gian ứng tuyển'}
                    allowClear
                    options={[
                        {
                            label: 'Gần đây',
                        },
                        {
                            label: '1 tháng trước'
                        },
                        {
                            label: '6 tháng trước'
                        }
                    ]}
                />
            </div>
            <div className={'mt-8'}>
                {
                    isLoadingGetAppliedJobs ? <Skeleton active/> : (
                        appliedJobs?.length > 0 ? appliedJobs?.map(item => {
                            const job = item.job_id
                            const company = job.company_id
                            const content = <div key={item._id}
                                                 className={styles.jobCardWrap}
                            >
                                <div className={styles.imageWrap}>
                                    <Image src={company.logo || DefaultLogo} width={'100%'} height={'100%'}/>
                                </div>
                                <div className={styles.infoWrap}>
                                    <div className={styles.headerInfoWrap}>
                                        <div className={`${styles.titleContent} hover:underline cursor-pointer`}
                                            onClick={() => dispatch(goToPage({path: `/job/${job._id}`}))}
                                        >
                                            {job.title}
                                        </div>
                                        <div className={'text-[15px]'}>
                                            ({handleFindLabelByValue(JOB_EXPERIENCE, job.experience_required)} kinh nghiệm)
                                        </div>
                                    </div>
                                    <div className={styles.company}>
                                        {company.name?.toUpperCase()}
                                    </div>
                                    <div className={styles.detailInfoWrap}>
                                        <Tooltip title={job.position}>
                                            <div
                                                className={styles.position}>
                                                Vị trí: {job.position}
                                            </div>
                                        </Tooltip>
                                        <div className={styles.salaryAndJobTypeWrap}>
                                            <Tag className={'font-semibold !text-[14px]'}
                                                 color={handleFindColorByEmployeeType(job.type)}>
                                                {handleFindLabelByValue(EMPLOYEE_TYPE, job.type)}
                                            </Tag>
                                            <div className={styles.salary}>
                                                <CreditCardOutlined/>
                                                <div className={'ml-2'}>{handleSplitSalary(job.salary)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.resumeWrap}>
                                        <div className={'text-[15px] mt-1.5 font-medium text-gray-500'}>
                                            CV đã ứng tuyển:
                                            <a href={item.resume_path} target={'_blank'}
                                               className={'underline text-[#4d94ff] hover:text-[#1a75ff] ml-1'}
                                               rel="noreferrer"
                                            >
                                                CV tải lên
                                            </a>
                                        </div>
                                        <div className={styles.resumeStatusWrap}>
                                            <Tag className={'font-semibold !text-[14px]'}
                                                 color={handleFindColorAndLabelByResumeStatus(item, 'color')}
                                            >
                                                {handleFindColorAndLabelByResumeStatus(item, 'label')}
                                            </Tag>
                                        </div>
                                    </div>
                                    <div className={styles.appliedDate}>
                                        Ngày ứng tuyển: {convertISOStringToDateTime(item.createdAt)}
                                    </div>
                                </div>
                                {
                                    !(window.innerWidth >= 360 && window.innerWidth <= 768) ?
                                        <div className={styles.detailBtn}>
                                            <Tooltip title={'Chi tiết'}>
                                                <div
                                                    onClick={() => dispatch(goToPage({path: `/job/${job._id}`}))}
                                                    className={'w-[50px] h-[50px] p-3.5 rounded-[50%] bg-[#daede8] cursor-pointer flex items-center justify-center'}
                                                >
                                                    <EyeOutlined style={{fontSize: '20px', color: '#048565'}}/>
                                                </div>
                                            </Tooltip>
                                        </div> : ''
                                }
                            </div>

                            if (item.status === JOB_STATUS['CLOSED'] || moment(job.expired_at)?.isBefore(moment())) {
                                return <Badge.Ribbon text={'Đã đóng'} key={item._id} color={"red"}>
                                    {content}
                                </Badge.Ribbon>
                            }

                            return content
                        }) : <i className={'font-semibold text-[17px] text-gray-500'}>Bạn chưa ứng tuyển công việc
                            nào</i>
                    )
                }
            </div>
        </div>
    </HeaderOnly>
}
