import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Avatar, Button, DatePicker, Flex, Input, Skeleton, Upload} from "antd";
import IconWarning from "../../../../../assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {
    initialInformationState,
    setCompanyProfile,
    setErrorUpdateCompanyProfile
} from "../../../../../states/modules/profile/information/index.js";
import styles from './styles.module.scss'
import DefaultAvatar from '../../../../../assets/images/logos/user_default.png'
import CustomCKEditor from "../../../../../components/CKEditor/index.jsx";
import {EditOutlined} from "@ant-design/icons";
import {getNotification, handleCheckValidateConfirm} from "../../../../../utils/helper.js";
import {createCompany, updateCompanyProfile, uploadCompanyLogo} from "../../../../../api/profile/index.js";
import dayjs from "dayjs";
import {setTab} from "../../../../../states/modules/profile/index.js";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        getNotification('error', 'File ảnh phải có định dạng là jpeg hoặc png!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        getNotification('error', 'Kích thước file ảnh không vượt quá 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function InformationTab() {
    const dispatch = useDispatch();

    const authUser = useSelector(state => state.auth.authUser);
    const isLoadingGetMe = useSelector(state => state.auth.isLoadingGetMe);
    const companyProfile = useSelector(state => state.information.companyProfile);
    const errorUpdateCompanyProfile = useSelector(state => state.information.errorUpdateCompanyProfile);
    const isLoadingBtnUpdate = useSelector(state => state.information.isLoadingBtnUpdateCompany);
    const isLoadingBtnUpdateCompanyLogo = useSelector(state => state.information.isLoadingBtnUpdateCompanyLogo);
    const [imageUrl, setImageUrl] = useState('');
    const noAvatar = _.isEmpty(authUser.profile) || !authUser.profile?.logo

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    useEffect(() => {
        dispatch(setTab('information'))
        dispatch(setErrorUpdateCompanyProfile({
            ...initialInformationState.errorUpdateCompanyProfile
        }))
    }, [dispatch])

    useEffect(() => {
        if (!_.isEmpty(authUser.profile)) {
            dispatch(setCompanyProfile(authUser.profile))
            if (authUser.profile?.logo) {
                setImageUrl(authUser.profile?.logo)
            }
        }
    }, [dispatch, authUser])

    const handleChangeInput = (value, type) => {
        /* Hiding error message */
        if (errorUpdateCompanyProfile[type]?.length !== 0) {
            dispatch(setErrorUpdateCompanyProfile({
                ...errorUpdateCompanyProfile,
                [type]: ''
            }))
        }

        let data = _.cloneDeep(companyProfile);
        data[type] = type === 'founded_year' ? (value ? dayjs(value).format('DD/MM/YYYY') : '') : value
        dispatch(setCompanyProfile(data))
    }

    const handleChangeInputEditor = (value) => {
        let data = _.cloneDeep(companyProfile);
        data['description'] = value
        dispatch(setCompanyProfile(data))
    }

    const handleChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
            dispatch(setCompanyProfile({
                ...companyProfile,
                logo: {
                    uri: url.split(',')[1],
                    type: info.file.type,
                    name: info.file.name
                }
            }))
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleUpdateProfile()
        }
    }

    const handleUpdateLogo = () => {
        if (companyProfile?.logo && _.isObject(companyProfile?.logo)) {
            dispatch(uploadCompanyLogo({logo: companyProfile?.logo}))
        }
    }

    const handleUpdateProfile = () => {
        const validate = handleCheckValidateConfirm(companyProfile, errorUpdateCompanyProfile, 'company')
        if (!validate.isError) {
            let data = {
                name: companyProfile?.name,
                logo: companyProfile?.logo,
                description: companyProfile?.description,
                location: companyProfile?.location,
                phone: companyProfile?.phone,
                founded_year: companyProfile?.founded_year,
                headcount: companyProfile?.headcount,
                website_url: companyProfile?.website_url
            }
            if (_.isEmpty(authUser.profile)) {
                dispatch(createCompany(data))
            } else {
                delete data.logo
                dispatch(updateCompanyProfile(data))
            }
        } else {
            dispatch(setErrorUpdateCompanyProfile(validate.dataError))
        }
    }

    return (
        <div className={styles.cardWrap}>
            <div className={styles.title}>
                <p className={''}>Cập nhật thông tin</p>
            </div>
            <div className={styles.contentWrap}>
                {
                    isLoadingGetMe ? <Skeleton active={isLoadingGetMe}/> : <>
                        <div className={styles.childrenWrap}>
                            <div className={styles.uploadWrap}>
                                <div className={'w-fit border-[3px] rounded-[50%] h-fit hover:border-dashed'}>
                                    <Upload
                                        name="avatar"
                                        customRequest={({file, onSuccess}) => {
                                            setTimeout(() => {
                                                onSuccess("ok");
                                            }, 0);
                                        }}
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        <div className={'relative'}>
                                            <Avatar
                                                src={imageUrl ? imageUrl : (noAvatar ? DefaultAvatar : imageUrl)}
                                                className={'w-[170px] h-[170px]'}
                                            />
                                            <div
                                                className={'absolute top-[70%] right-[-3px] h-[2rem] w-[2rem] bg-[#f9f9f9] rounded-[50%] flex items-center justify-center'}>
                                                <EditOutlined/>
                                            </div>
                                        </div>
                                    </Upload>
                                </div>
                                <Flex vertical gap="small">
                                    <Button
                                        loading={isLoadingBtnUpdateCompanyLogo}
                                        type="primary"
                                        disabled={!_.isObject(companyProfile?.logo)}
                                        onClick={handleUpdateLogo}
                                        size={'large'}
                                        className={`main-btn-primary flex justify-center items-center font-semibold mt-10`}
                                        block
                                    >
                                        Cập nhật logo
                                    </Button>
                                </Flex>
                                {
                                    _.isEmpty(authUser?.profile) ?
                                        <div className={'input-wrap mt-2'}>
                                    <span className={`error !text-[#bdbe63]`}>
                                        <div className={`icon`}>
                                          <InlineSVG src={IconWarning} width={14} height="auto"/>
                                        </div>
                                        Vui lòng cập nhật thông tin cá nhân trước!
                                    </span>
                                        </div> : ''
                                }
                            </div>

                            <div className={styles.personalInfoWrap}>
                                <div className={styles.rightWrap}>
                                    <div className={styles.detailWrap}>
                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Tên công ty <span className={'required'}>*</span>
                                            </div>
                                            <Input
                                                className={`main-input ${errorUpdateCompanyProfile && errorUpdateCompanyProfile.name?.length > 0 ? 'error-input !border-none' : ''}`}
                                                placeholder={'Nhập tên công ty'}
                                                value={companyProfile.name}
                                                onChange={(e) => handleChangeInput(e.target.value, 'name')}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                            {
                                                errorUpdateCompanyProfile && errorUpdateCompanyProfile.name?.length > 0 ?
                                                    <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                                        {errorUpdateCompanyProfile.name}
                      </span> : ''
                                            }
                                        </div>

                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Số điện thoại <span className={'required'}>*</span>
                                            </div>
                                            <Input
                                                className={`main-input ${errorUpdateCompanyProfile && errorUpdateCompanyProfile.phone?.length > 0 ? 'error-input !border-none' : ''}`}
                                                placeholder={'Nhập số điện thoại'}
                                                value={companyProfile.phone}
                                                onChange={(e) => handleChangeInput(e.target.value, 'phone')}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                            {
                                                errorUpdateCompanyProfile && errorUpdateCompanyProfile.phone?.length > 0 ?
                                                    <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                                        {errorUpdateCompanyProfile.phone}
                      </span> : ''
                                            }
                                        </div>

                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Năm thành lập
                                            </div>
                                            <DatePicker
                                                disabledDate={(current) => current && current > new Date().setHours(23, 59, 59, 0)}
                                                className={'main-datepicker w-full'}
                                                placeholder={'Nhập ngày sinh'}
                                                format={dateFormatList}
                                                value={
                                                    companyProfile?.founded_year ?
                                                        dayjs(companyProfile?.founded_year, dateFormatList[0]) : null
                                                }
                                                onChange={(e) => handleChangeInput(e, 'founded_year')}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.detailWrap}>
                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Địa chỉ <span className={'required'}>*</span>
                                            </div>
                                            <Input
                                                className={`main-input ${errorUpdateCompanyProfile && errorUpdateCompanyProfile.location?.length > 0 ? 'error-input !border-none' : ''}`}
                                                placeholder={'Nhập địa chỉ'}
                                                value={companyProfile.location}
                                                onChange={(e) => handleChangeInput(e.target.value, 'location')}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                            {
                                                errorUpdateCompanyProfile && errorUpdateCompanyProfile.location?.length > 0 ?
                                                    <span className={`error`}>
                                                            <div className={`icon`}>
                                                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                                                            </div>
                                                                                        {errorUpdateCompanyProfile.location}
                                                      </span> : ''
                                            }
                                        </div>
                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Website
                                            </div>
                                            <Input
                                                className={`main-input ${errorUpdateCompanyProfile && errorUpdateCompanyProfile.website_url?.length > 0 ? 'error-input !border-none' : ''}`}
                                                placeholder={'Nhập website'}
                                                value={companyProfile.website_url}
                                                onChange={(e) => handleChangeInput(e.target.value, 'website_url')}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                            {
                                                errorUpdateCompanyProfile && errorUpdateCompanyProfile.website_url?.length > 0 ?
                                                    <span className={`error`}>
                                                            <div className={`icon`}>
                                                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                                                            </div>
                                                                                        {errorUpdateCompanyProfile.website_url}
                                                      </span> : ''
                                            }
                                        </div>
                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Số lượng nhân viên
                                            </div>
                                            <Input
                                                className={`main-input ${errorUpdateCompanyProfile && errorUpdateCompanyProfile.headcount?.length > 0 ? 'error-input !border-none' : ''}`}
                                                placeholder={'Nhập số lượng'}
                                                value={companyProfile.headcount}
                                                onChange={(e) => handleChangeInput(e.target.value, 'headcount')}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                            {
                                                errorUpdateCompanyProfile && errorUpdateCompanyProfile.headcount?.length > 0 ?
                                                    <span className={`error`}>
                                                            <div className={`icon`}>
                                                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                                                            </div>
                                                                                        {errorUpdateCompanyProfile.headcount}
                                                      </span> : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={'mt-3 input-wrap'}>
                                    <div className={'label-wrap'}>
                                        Mô tả
                                    </div>
                                    <CustomCKEditor
                                        placeholder={''}
                                        data={companyProfile?.description}
                                        handleChange={handleChangeInputEditor}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className={'w-full flex justify-end px-10'}>
                <Flex vertical gap="small">
                    <Button
                        disabled={isLoadingGetMe}
                        loading={isLoadingBtnUpdate}
                        type="primary"
                        onClick={handleUpdateProfile}
                        size={'large'}
                        className={`main-btn-primary flex justify-center items-center font-semibold`}
                        block
                    >
                        Cập nhật
                    </Button>
                </Flex>
            </div>
        </div>
    )
        ;
}
