import React, {useEffect} from "react";
import HeaderOnly from "../../../layouts/HeaderOnly/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBreadcrumb} from "../../../states/modules/app/index.js";
import styles from './styles.module.scss'
import {Avatar, Skeleton, Tabs} from "antd";
import DefaultLogo from '../../../assets/images/logos/user_default.png'
import './styles.scss'
import {MailOutlined, PhoneOutlined} from '@ant-design/icons'
import InformationTab from "./components/InformationTab/index.jsx";
import InlineSVG from "react-inlinesvg";
import Location from '../../../assets/images/icons/duotone/location.svg'
import _ from "lodash";

export default function CompanyProfile() {
    const authUser = useSelector(state => state.auth.authUser)
    const isLoadingGetMe = useSelector(state => state.auth.isLoadingGetMe)
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
    }, [dispatch])

    return <HeaderOnly>
        <div className={'w-full'}>
            <div className={styles.backgroundWrap}>
                {
                    isLoadingGetMe ? <Skeleton active={isLoadingGetMe}/> : <>
                        <div className={`${styles.avatarWrap} avatar-custom`}>
                            <Avatar src={!_.isEmpty(authUser.profile) ? authUser.profile.logo : DefaultLogo}
                                    className={'w-[100px] h-[100px]'}/>
                        </div>
                        <div className={'font-semibold text-xl mt-3'}>
                            {
                                !_.isEmpty(authUser.profile) ? <span>{authUser.profile.name}</span> :
                                    <i>Đang cập nhật</i>
                            }
                        </div>
                        <div className={'flex justify-center items-center text-[#78829d] mt-2.5'}>
                            <div className={`${styles.info} mr-8`}>
                                <PhoneOutlined className={'mr-1.5'}/>
                                {
                                    !_.isEmpty(authUser.profile) ? <span>{authUser.profile.phone}</span> :
                                        <i>Đang cập nhật</i>
                                }
                            </div>
                            <div className={`${styles.info} mr-8`}>
                                <MailOutlined className={'mr-1.5'}/>
                                <a href={`mailto:${authUser.account.email}}`}>{authUser.account.email}</a>
                            </div>
                            <div className={styles.info}>
                                <InlineSVG src={Location} className={'mr-1.5'} width={15} height={15}/>
                                {
                                    !_.isEmpty(authUser.profile) ? <span>{authUser.profile.location}</span> :
                                        <i>Đang cập nhật</i>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className={'mt-[-45px] tab-custom'}>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Thông tin',
                            key: 'info',
                            children: <InformationTab/>,
                        },
                        {
                            label: 'Đổi mật khẩu',
                            key: 'password',
                            children: 'Tab 3',
                        },
                    ]}
                />
            </div>
        </div>
    </HeaderOnly>
}
