import React, {useEffect} from "react";
import HeaderOnly from "../../../layouts/HeaderOnly/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBreadcrumb} from "../../../states/modules/app/index.js";
import styles from './styles.module.scss'
import {Avatar, Skeleton, Tabs} from "antd";
import User from '../../../assets/images/logos/user_default.png'
import './styles.scss'
import {MailOutlined, PhoneOutlined} from '@ant-design/icons'
import InformationTab from "./components/InformationTab/index.jsx";
import _ from "lodash";
import {setTab} from "../../../states/modules/profile/index.js";
import ResumeTab from "./components/ResumeTab/index.jsx";
import ChangePassword from "../../Auth/ChangePassword/index.jsx";

export default function CandidateProfile() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setBreadcrumb([
            {
                href: '/',
                title: 'Trang chủ'
            },
            {
                title: 'Hồ sơ cá nhân'
            },
        ]))
    }, [])

    const authUser = useSelector(state => state.auth.authUser)
    const isLoadingGetMe = useSelector(state => state.auth.isLoadingGetMe)
    const isProfileEmpty = _.isEmpty(authUser.profile)

    return <HeaderOnly>
        <div className={'w-full'}>
            <div className={styles.backgroundWrap}>
                {
                    isLoadingGetMe ? <Skeleton active={isLoadingGetMe}/> : <>
                        <div className={`${styles.avatarWrap} avatar-custom`}>
                            <Avatar src={(!isProfileEmpty && authUser.profile.avatar) ? authUser.profile.avatar : User}
                                    className={'w-[100px] h-[100px]'}/>
                        </div>
                        <div className={'font-semibold text-xl mt-3'}>
                            {
                                isProfileEmpty ? <i>Đang cập nhật</i>
                                    : authUser.profile?.first_name + ' ' + authUser.profile?.last_name
                            }
                        </div>
                        <div className={'flex justify-center items-center text-[#78829d] mt-2.5'}>
                            <div className={`${styles.info} mr-8`}>
                                <PhoneOutlined className={'mr-1.5'}/>
                                {
                                    (!isProfileEmpty && authUser.profile.phone) ?
                                        <a href={`tel:${authUser.profile?.phone}`}>{authUser.profile?.phone}</a>
                                        : <i>Đang cập nhật</i>
                                }
                            </div>
                            <div className={styles.info}>
                                <MailOutlined className={'mr-1.5'}/>
                                <a href={`mailto:${authUser.account.email}`}>{authUser.account.email}</a>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className={'mt-[-45px] tab-custom'}>
                <Tabs
                    onChange={(tab) => dispatch(setTab(tab))}
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Thông tin',
                            key: 'information',
                            children: <InformationTab/>,
                        },
                        {
                            label: 'Quản lý CV',
                            key: 'cv',
                            children: <ResumeTab/>,
                        },
                        {
                            label: 'Đổi mật khẩu',
                            key: 'password',
                            children: <ChangePassword/>
                        },
                    ]}
                />
            </div>
        </div>
    </HeaderOnly>
}
