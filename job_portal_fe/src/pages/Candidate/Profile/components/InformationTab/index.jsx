import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Avatar, Button, DatePicker, Flex, Input, Select, Skeleton, Upload} from "antd";
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
import DefaultAvatar from '../../../../../assets/images/logos/user_default.png'
import {getNotification, handleCheckValidateConfirm} from "../../../../../utils/helper.js";
import {createCandidate, updateCandidateProfile, uploadCandidateAvatar} from "../../../../../api/profile/index.js";
import dayjs from "dayjs";
import moment from "moment";
import {EditOutlined} from '@ant-design/icons'
import {setTab} from "../../../../../states/modules/profile/index.js";
import CustomCKEditor from "../../../../../components/CKEditor/index.jsx";

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

    const authUser = useSelector(state => state.auth.authUser)
    const isLoadingGetMe = useSelector(state => state.auth.isLoadingGetMe)
    const candidateProfile = useSelector(state => state.information.candidateProfile)
    const errorUpdateCandidateProfile = useSelector(state => state.information.errorUpdateCandidateProfile);
    const isLoadingBtnUpdate = useSelector(state => state.information.isLoadingBtnUpdateCandidate);
    const isLoadingBtnUpdateCandidateAvatar = useSelector(state => state.information.isLoadingBtnUpdateCandidateAvatar);

    const noAvatar = _.isEmpty(authUser.profile) || !authUser.profile?.avatar
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        dispatch(setTab('information'))
        dispatch(setErrorUpdateCandidateProfile({
            ...initialInformationState.errorUpdateCandidateProfile
        }))
    }, [dispatch])

    useEffect(() => {
        if (!_.isEmpty(authUser.profile)) {
            dispatch(setCandidateProfile(authUser.profile))
            if (authUser.profile?.avatar) {
                setImageUrl(authUser.profile?.avatar)
            }
        }
    }, [dispatch, authUser])

    const handleChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
            dispatch(setCandidateProfile({
                ...candidateProfile,
                avatar: {
                    uri: url.split(',')[1],
                    type: info.file.type,
                    name: info.file.name
                }
            }))
        });
    };

    const handleChangeInput = (value, type) => {
        /* Hiding error message */
        if (errorUpdateCandidateProfile[type]?.length !== 0) {
            dispatch(setErrorUpdateCandidateProfile({
                ...errorUpdateCandidateProfile,
                [type]: ''
            }))
        }

        let data = _.cloneDeep(candidateProfile);
        data[type] = type === 'birth' ? (value ? value.toISOString() : '') : value
        dispatch(setCandidateProfile(data))
    }

    const handleChangeInputEditor = (value) => {
        let data = _.cloneDeep(candidateProfile);
        data['bio'] = value
        dispatch(setCandidateProfile(data))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleUpdateProfile()
        }
    }

    const handleUpdateProfile = () => {
        const validate = handleCheckValidateConfirm(candidateProfile, errorUpdateCandidateProfile, 'candidate')
        if (!validate.isError) {
            const data = {
                first_name: candidateProfile?.first_name,
                last_name: candidateProfile?.last_name,
                email: candidateProfile?.email,
                birth: candidateProfile?.birth,
                gender: candidateProfile?.gender,
                phone: candidateProfile?.phone,
                bio: candidateProfile?.bio,
                profile_description: candidateProfile?.profile_description
            }
            if (_.isEmpty(authUser.profile)) {
                dispatch(createCandidate(data))
            } else {
                dispatch(updateCandidateProfile(data))
            }
        } else {
            dispatch(setErrorUpdateCandidateProfile(validate.dataError))
        }
    }

    const handleUpdateAvatar = () => {
        if (candidateProfile?.avatar && _.isObject(candidateProfile?.avatar)) {
            dispatch(uploadCandidateAvatar({img: candidateProfile?.avatar}))
        }
    }

    const convertISOStringToDate = (isoString) => {
        return moment(isoString).format('DD/MM/YYYY')
    }

    return (
        <div className={styles.cardWrap}>
            <div className={styles.title}>
                <p className={''}>Cập nhật thông tin</p>
            </div>
            <div className={'px-10 py-7'}>
                {
                    isLoadingGetMe ? <Skeleton active={isLoadingGetMe}/>
                        : <div className={styles.childrenContainer}>
                            <div className={styles.uploadContainer}>
                                <div className={'w-fit border-[3px] rounded-[50%] h-fit hover:border-dashed'}>
                                    <Upload
                                        disabled={_.isEmpty(authUser?.profile)}
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
                                        loading={isLoadingBtnUpdateCandidateAvatar}
                                        type="primary"
                                        disabled={!_.isObject(candidateProfile?.avatar)}
                                        onClick={handleUpdateAvatar}
                                        size={'large'}
                                        className={`main-btn-primary flex justify-center items-center font-semibold mt-10`}
                                        block
                                    >
                                        Cập nhật ảnh đại diện
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

                            <div className={styles.personalInfoContainer}>
                                <div className={styles.rightColumn}>
                                    <div className={styles.leftPart}>
                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Họ <span className={'required'}>*</span>
                                            </div>
                                            <Input
                                                className={`main-input ${errorUpdateCandidateProfile && errorUpdateCandidateProfile.first_name?.length > 0 ? 'error-input !border-none' : ''}`}
                                                placeholder={'Nhập họ'}
                                                value={candidateProfile?.first_name}
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
                                                value={candidateProfile?.last_name}
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
                                                value={candidateProfile?.phone}
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

                                    <div className={styles.rightPart}>
                                        <div className={`input-wrap`}>
                                            <div className={'label-wrap'}>
                                                Ngày sinh
                                            </div>
                                            <DatePicker
                                                disabledDate={(current) => current && current > new Date().setHours(23, 59, 59, 9999)}
                                                className={'main-datepicker w-full'}
                                                placeholder={'Nhập ngày sinh'}
                                                format={dateFormatList}
                                                value={
                                                    candidateProfile?.birth ?
                                                        dayjs(convertISOStringToDate(candidateProfile?.birth), dateFormatList[0])
                                                        : null
                                                }
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
                                                value={candidateProfile?.gender || 'Male'}
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
                                <div className={'mt-3 input-wrap'}>
                                    <div className={'label-wrap'}>
                                        Giới thiệu
                                    </div>
                                    <textarea
                                        value={candidateProfile?.profile_description}
                                        onChange={e => handleChangeInput(e.target.value, 'profile_description')}
                                        placeholder={'Giới thiệu bản thân'}
                                        className={styles.descriptionWrap}
                                    />
                                </div>
                                <div className={'mt-3 input-wrap'}>
                                    <div className={'label-wrap'}>
                                        BIO
                                    </div>
                                    <CustomCKEditor
                                        placeholder={''}
                                        data={candidateProfile?.bio}
                                        handleChange={handleChangeInputEditor}
                                    />
                                </div>
                            </div>
                        </div>
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
    );
}
