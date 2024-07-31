import React, {useEffect} from "react";
import './styles.scss'
import HeaderOnly from "../../../layouts/HeaderOnly/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {goToPage, setBreadcrumb} from "../../../states/modules/app/index.js";
import {Avatar, Badge, Select, Skeleton, Tag, Tooltip} from "antd";
import DefaultLogo from '../../../assets/images/logos/user_default.png'
import {CreditCardOutlined, EyeOutlined} from '@ant-design/icons'
import {handleFindLabelByValue, handleSplitSalary} from "../../../utils/helper.js";
import {EMPLOYEE_TYPE, JOB_EXPERIENCE, JOB_STATUS} from "../../../utils/constants.js";
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

    const a = [
        {
            _id: '1',
            title: 'Principal Designer, Design Systems',
            experience_required: 'NOT REQUIRED',
            logo: '',
            type: 'FREELANCE',
            position: 'Nhan vien',
            salary: '10000',
            createdAt: '2024-07-25T18:13:30.444Z',
            status: 'Closed'
        },
        {
            _id: '2',
            title: 'Principal Designer, Design Systems',
            experience_required: '1-3 YEARS',
            logo: '',
            type: 'FULL-TIME',
            position: 'Nhan vien',
            salary: '10000',
            createdAt: '2024-07-25T18:13:30.444Z',
            status: 'Open'
        },
    ]

    return <HeaderOnly>
        <div className={'py-8 px-20'}>
            <div className={'flex justify-between items-center'}>
                <div className={'font-semibold text-lg'}>
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
                    isLoadingGetAppliedJobs ? <Skeleton active/> :
                        a.map(item => {
                            const content = <div key={item._id}
                                className={'flex items-center justify-between px-8 py-5 w-full bg-[white] rounded-md h-[130px] border-[1px] mb-6'}
                            >
                                <div className={'h-full w-[90px]'}>
                                    <Avatar src={item.logo || DefaultLogo} shape={'square'}
                                            className={'w-full h-full'}/>
                                </div>
                                <div className={'flex-1 mx-6'}>
                                    <div className={'flex items-center'}>
                                        <div className={'font-semibold text-[16px]'}>{item.title}</div>
                                        &nbsp;
                                        <div className={'text-[15px]'}>
                                            ({handleFindLabelByValue(JOB_EXPERIENCE, item.experience_required)} kinh
                                            nghiệm)
                                        </div>
                                    </div>
                                    <div className={'flex items-center mt-1.5 text-[15px]'}>
                                        <div className={'font-medium'}>Vị trí: {item.position}</div>
                                        <div className={'flex items-center ml-[200px]'}>
                                            <Tag className={'font-semibold text-[14px]'}
                                                 color={handleFindColorByEmployeeType(item.type)}>
                                                {handleFindLabelByValue(EMPLOYEE_TYPE, item.type)}
                                            </Tag>
                                            <div className={'flex items-center ml-6 font-medium'}>
                                                <CreditCardOutlined/>
                                                <div className={'ml-2'}>{handleSplitSalary(item.salary)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'text-[14px] mt-1.5 font-medium'}>
                                        Ngày ứng tuyển: {moment(item.createdAt).format('DD/MM/YYYY')}
                                    </div>
                                </div>
                                <div className={'w-1/12'}>
                                    <Tooltip title={'Chi tiết'}>
                                        <div
                                            onClick={() => dispatch(goToPage({path: `/job/${item._id}`}))}
                                            className={'w-[50px] h-[50px] p-3.5 rounded-[50%] bg-[#daede8] cursor-pointer flex items-center justify-center'}
                                        >
                                            <EyeOutlined style={{fontSize: '20px', color: '#048565'}}/>
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>

                            if (item.status === JOB_STATUS['CLOSED']) {
                                return <Badge.Ribbon text={'Đã đóng'} key={item._id} color={"red"}>
                                    {content}
                                </Badge.Ribbon>
                            }

                            return content
                        })
                }
            </div>
        </div>
    </HeaderOnly>
}
