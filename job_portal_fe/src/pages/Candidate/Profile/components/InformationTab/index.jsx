import React, {useEffect} from 'react';
import './styles.scss';
import {Avatar, Button, DatePicker, Flex, Input, Select} from "antd";
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

    const candidateProfile = useSelector(state => state.information.candidateProfile);
    const errorUpdateCandidateProfile = useSelector(state => state.information.errorUpdateCandidateProfile);
    const isLoadingBtnUpdate = useSelector(state => state.information.isLoadingBtnUpdate);

    useEffect(() => {
        dispatch(setErrorUpdateCandidateProfile({
            ...initialInformationState.errorUpdateCandidateProfile
        }))
    }, [dispatch])

    const handleChangeInput = (value, type) => {
        /* Hiding error message */
        if (errorUpdateCandidateProfile[type]?.length !== 0) {
            dispatch(setErrorUpdateCandidateProfile({
                ...errorUpdateCandidateProfile,
                [type]: ''
            }))
        }

        let data = _.cloneDeep(candidateProfile);
        data[type] = value
        dispatch(setCandidateProfile(data))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleUpdateProfile()
        }
    }

    const handleUpdateProfile = () => {
        // const validate = handleCheckValidateConfirm(candidateProfile, errorUpdateCandidateProfile)
        // if (!validate.isError) {
        //     dispatch(login(candidateProfile))
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
                                Họ <span className={'required'}>*</span>
                            </div>
                            <Input
                                className={`main-input ${errorUpdateCandidateProfile && errorUpdateCandidateProfile.first_name?.length > 0 ? 'error-input !border-none' : ''}`}
                                placeholder={'Nhập họ'}
                                value={candidateProfile.first_name}
                                onChange={(e) => handleChangeInput(e.target.value, 'first_name')}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            {
                                errorUpdateCandidateProfile && errorUpdateCandidateProfile.first_name?.length > 0 ?
                                    <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                        {errorUpdateCandidateProfile.first_name}
                      </span> : ''
                            }
                        </div>

                        <div className={`input-wrap`}>
                            <div className={'label-wrap'}>
                                Tên <span className={'required'}>*</span>
                            </div>
                            <Input
                                className={`main-input ${errorUpdateCandidateProfile && errorUpdateCandidateProfile.last_name?.length > 0 ? 'error-input !border-none' : ''}`}
                                placeholder={'Nhập tên'}
                                value={candidateProfile.last_name}
                                onChange={(e) => handleChangeInput(e.target.value, 'last_name')}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            {
                                errorUpdateCandidateProfile && errorUpdateCandidateProfile.last_name?.length > 0 ?
                                    <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                        {errorUpdateCandidateProfile.last_name}
                      </span> : ''
                            }
                        </div>

                        <div className={`input-wrap`}>
                            <div className={'label-wrap'}>
                                Số điện thoại
                            </div>
                            <Input
                                className={`main-input ${errorUpdateCandidateProfile && errorUpdateCandidateProfile.phone?.length > 0 ? 'error-input !border-none' : ''}`}
                                placeholder={'Nhập số điện thoại'}
                                value={candidateProfile.phone}
                                onChange={(e) => handleChangeInput(e.target.value, 'phone')}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            {
                                errorUpdateCandidateProfile && errorUpdateCandidateProfile.phone?.length > 0 ?
                                    <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                        {errorUpdateCandidateProfile.phone}
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
                                value={candidateProfile.birth}
                                onChange={(e) => handleChangeInput(e, 'birth')}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                        </div>

                        <div className={`input-wrap`}>
                            <div className={'label-wrap'}>
                                Giới tính
                            </div>
                            <Select
                                defaultValue={'Male'}
                                className={`main-select w-full`}
                                value={candidateProfile.gender || 'Male'}
                                options={[
                                    {
                                        label: 'Nam',
                                        value: 'Male',
                                    },
                                    {
                                        label: 'Nữ',
                                        value: 'Female',
                                    },
                                    {
                                        label: 'Khác',
                                        value: 'Other',
                                    }
                                ]}
                                onChange={(e) => handleChangeInput(e, 'gender')}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className={'mt-3'}>
                    <CustomCKEditor/>
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
    );
}
