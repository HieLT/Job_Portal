import React, {useEffect} from "react";
import HeaderOnly from "../../../layouts/HeaderOnly/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBreadcrumb} from "../../../states/modules/app/index.js";
import styles from './styles.module.scss'
import {Avatar, Tabs} from "antd";
import User from '../../../assets/images/logos/user_default.png'
import './styles.scss'
import {MailOutlined, PhoneOutlined} from '@ant-design/icons'
import InformationTab from "./components/InformationTab/index.jsx";
import {getProfile} from "../../../utils/localStorage.js";
import {setTab} from "../../../states/modules/profile/index.js";

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

    return <HeaderOnly>
        <div className={'w-full'}>
            <div className={styles.backgroundWrap}>
                <div className={`${styles.avatarWrap} avatar-custom`}>
                    <Avatar src={User} className={'w-[100px] h-[100px]'}/>
                </div>
                <div className={'font-semibold text-xl mt-3'}>
                    {
                        getProfile() === '0' ? <i>Đang cập nhật</i>
                            : authUser.profile.first_name + ' ' + authUser.profile.last_name
                    }
                </div>
                <div className={'flex justify-center items-center text-[#78829d] mt-2.5'}>
                    <div className={`${styles.info} mr-8`}>
                        <PhoneOutlined className={'mr-1.5'}/>
                        {
                            getProfile() === '1' ?
                                <a href={`tel:${authUser.profile.phone}`}>{authUser.profile.phone}</a>
                                : <i>Đang cập nhật</i>
                        }
                    </div>
                    <div className={styles.info}>
                        <MailOutlined className={'mr-1.5'}/>
                        <a href={`mailto:minhtuanng12@gmail.com}`}>minhtuanng12@gmail.com</a>
                    </div>
                </div>
            </div>
            <div className={'mt-[-45px] tab-custom'}>
                <Tabs
                    onChange={(e) => console.log(e)}
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Thông tin',
                            key: 'info',
                            children: <InformationTab/>,
                        },
                        {
                            label: 'Quản lý CV',
                            key: 'cv',
                            children: 'Tab 2',
                        },
                        {
                            label: 'Đổi mật khẩu',
                            key: 'password',
                            children: 'Tab 3',
                            disabled: true
                        },
                    ]}
                />
            </div>
        </div>
    </HeaderOnly>
}
