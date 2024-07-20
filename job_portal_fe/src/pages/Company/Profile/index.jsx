import React, {useEffect} from "react";
import HeaderOnly from "../../../layouts/HeaderOnly/index.jsx";
import {useDispatch} from "react-redux";
import {setBreadcrumb} from "../../../states/modules/app/index.js";
import styles from './styles.module.scss'
import {Avatar, Tabs} from "antd";
import User from '../../../assets/images/logos/user_default.png'
import './styles.scss'
import {MailOutlined, PhoneOutlined} from '@ant-design/icons'
import InformationTab from "./components/InformationTab/index.jsx";
import InlineSVG from "react-inlinesvg";
import Location from '../../../assets/images/icons/duotone/location.svg'

export default function CompanyProfile() {
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

    const a = '0987654321'

    return <HeaderOnly>
        <div className={'w-full'}>
            <div className={styles.backgroundWrap}>
                <div className={`${styles.avatarWrap} avatar-custom`}>
                    <Avatar src={User} className={'w-[100px] h-[100px]'}/>
                </div>
                <div className={'font-semibold text-xl mt-3'}>
                    Cong ty TNHH ABC
                </div>
                <div className={'flex justify-center items-center text-[#78829d] mt-2.5'}>
                    <div className={`${styles.info} mr-8`}>
                        <PhoneOutlined className={'mr-1.5'}/>
                        {
                            a ? <a href={'tel:0987654321'}>{a}</a> : <i>Đang cập nhật</i>
                        }
                    </div>
                    <div className={`${styles.info} mr-8`}>
                        <MailOutlined className={'mr-1.5'}/>
                        <a href={`mailto:minhtuanng12@gmail.com}`}>minhtuanng12@gmail.com</a>
                    </div>
                    <div className={styles.info}>
                        <InlineSVG src={Location} className={'mr-1.5'} width={15} height={15}/>
                        <a href={`mailto:minhtuanng12@gmail.com}`}>location</a>
                    </div>
                </div>
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
