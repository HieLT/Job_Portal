import React, {useEffect} from "react";
import './styles.scss'
import HeaderOnly from "../../../layouts/HeaderOnly/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBreadcrumb} from "../../../states/modules/app/index.js";
import {Select} from "antd";

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

    return <HeaderOnly>
        <div className={'py-8 px-2'}>
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
        </div>
    </HeaderOnly>
}
