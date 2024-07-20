import React, {useEffect} from 'react';
import './styles.scss';
import {Avatar, Button, DatePicker, Flex, Input} from "antd";
import IconWarning from "../../../../../assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {
    initialInformationState,
    setCandidateProfile,
    setErrorUpdateCandidateProfile
} from "../../../../../states/modules/profile/information/index.js";
import styles from './styles.module.scss'
import User from '../../../../../assets/images/logos/user_default.png'
import CustomCKEditor from "../../../../../components/CKEditor/index.jsx";

export default function InformationTab() {
    const dispatch = useDispatch();

    const companyProfile = useSelector(state => state.information.companyProfile);
    const errorUpdateCompanyProfile = useSelector(state => state.information.errorUpdateCompanyProfile);
    const isLoadingBtnUpdate = useSelector(state => state.information.isLoadingBtnUpdateCompany);

    useEffect(() => {
        dispatch(setErrorUpdateCandidateProfile({
            ...initialInformationState.errorUpdateCompanyProfile
        }))
    }, [dispatch])

    const handleChangeInput = (value, type) => {
        /* Hiding error message */
        if (errorUpdateCompanyProfile[type]?.length !== 0) {
            dispatch(setErrorUpdateCandidateProfile({
                ...errorUpdateCompanyProfile,
                [type]: ''
            }))
        }

        let data = _.cloneDeep(companyProfile);
        data[type] = value
        dispatch(setCandidateProfile(data))
    }

    const handleChangeInputEditor = (e) => {
        let data = _.cloneDeep(companyProfile);
        data['profile_description'] = e.target.value
        dispatch(setCandidateProfile(data))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleUpdateProfile()
        }
    }

    const handleUpdateProfile = () => {
        // const validate = handleCheckValidateConfirm(companyProfile, errorUpdateCompanyProfile)
        // if (!validate.isError) {
        //     dispatch(login(companyProfile))
        // } else {
        //     dispatch(setErrorLogin(validate.dataError))
        // }
    }

    return (
        <div className={styles.cardWrap}>
            <div className={styles.title}>
                <p className={''}>Cập nhật thông tin</p>
            </div>
            <div className={'px-10 py-7'}>
                <div className={'flex justify-between'}>
                    <div className={'w-1/4 flex justify-center items-center'}>
                        <div className={'w-fit border-4 rounded-[50%] h-fit'}>
                            <Avatar src={User} className={'w-[150px] h-[150px]'}/>
                        </div>
                    </div>
                    <div className={'flex flex-col w-1/3 justify-start'}>
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
                                Năm thành lập
                            </div>
                            <Input
                                className={`main-input ${errorUpdateCompanyProfile && errorUpdateCompanyProfile.founded_year?.length > 0 ? 'error-input !border-none' : ''}`}
                                placeholder={'Nhập năm thành lập'}
                                value={companyProfile.founded_year}
                                onChange={(e) => handleChangeInput(e.target.value, 'founded_year')}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            {
                                errorUpdateCompanyProfile && errorUpdateCompanyProfile.founded_year?.length > 0 ?
                                    <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                        {errorUpdateCompanyProfile.founded_year}
                      </span> : ''
                            }
                        </div>

                        <div className={`input-wrap`}>
                            <div className={'label-wrap'}>
                                Số điện thoại
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
                    </div>

                    <div className={'flex flex-col justify-start w-1/3'}>
                        <div className={`input-wrap`}>
                            <div className={'label-wrap'}>
                                Ngày sinh
                            </div>
                            <DatePicker
                                className={'main-datepicker w-full'}
                                placeholder={'Nhập ngày sinh'}
                                value={companyProfile.birth}
                                onChange={(e) => handleChangeInput(e, 'birth')}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className={'mt-3 input-wrap'}>
                    <div className={'label-wrap'}>
                        Giới thiệu
                    </div>
                    <textarea
                        onChange={e => handleChangeInput(e.target.value, 'profile_description')}
                        placeholder={'Giới thiệu bản thân'}
                        className={styles.descriptionWrap}
                    />
                </div>
                <div className={'mt-3 input-wrap'}>
                    <div className={'label-wrap'}>
                        BIO
                    </div>
                    <CustomCKEditor placeholder={''}/>
                </div>
            </div>
            <div className={'w-full flex justify-end px-10'}>
                <Flex vertical gap="small">
                    <Button
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
