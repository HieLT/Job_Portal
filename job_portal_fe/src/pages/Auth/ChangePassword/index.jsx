import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Button, Flex, Input} from "antd";
import styles from './styles.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setErrorResetPassword} from "../../../states/modules/auth/index.js";
import _ from "lodash";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";
import {setChangePasswordData, setErrorChangePassword} from "../../../states/modules/profile/password/index.js";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../assets/images/icons/light/warning.svg";
import {requestChangePassword} from "../../../api/profile/index.js";
import {setTab} from "../../../states/modules/profile/index.js";

function ChangePassword() {
    const dispatch = useDispatch();
    const changePasswordData = useSelector(state => state.password.changePasswordData)
    const errorChangePassword = useSelector(state => state.password.errorChangePassword);
    const isLoadingChangePassword = useSelector(state => state.password.isLoadingChangePassword);

    useEffect(() => {
        dispatch(setTab('password'))
        dispatch(setErrorResetPassword({
            password: '',
            confirmPassword: ''
        }))
    }, [dispatch])

    const handleChangeInput = (value, type) => {
        dispatch(setErrorChangePassword({
            ...errorChangePassword,
            [type]: ''
        }))

        let data = _.cloneDeep(changePasswordData);
        data[type] = value
        dispatch(setChangePasswordData(data))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmChangePassword()
        }
    }

    const handleConfirmChangePassword = () => {
        let validate = handleCheckValidateConfirm(changePasswordData, errorChangePassword, 'changePassword');
        dispatch(setErrorChangePassword(validate.dataError))
        if (!validate.isError) {
            dispatch(requestChangePassword({...changePasswordData}));
        }
    }

    return (
        <div className={styles.cardWrap}>
            <div className={styles.title}>
                <p className={''}>Đổi mật khẩu</p>
            </div>
            <div className={'px-10 py-7'}>
                <div className={styles.contentWrap}>
                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Mật khẩu hiện tại <span className={'required'}>*</span>
                        </div>
                        <Input.Password
                            className={`main-input ${errorChangePassword && errorChangePassword.currentPassword?.length > 0 ? 'error-input !border-none' : ''}`}
                            placeholder={'Nhập mật khẩu hiện tại'}
                            value={changePasswordData?.currentPassword}
                            onChange={(e) => handleChangeInput(e.target.value, 'currentPassword')}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        {
                            errorChangePassword && errorChangePassword.currentPassword?.length > 0 ?
                                <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                    {errorChangePassword.currentPassword}
                      </span> : ''
                        }
                    </div>
                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Mật khẩu mới <span className={'required'}>*</span>
                        </div>
                        <Input.Password
                            className={`main-input ${errorChangePassword && errorChangePassword.newPassword?.length > 0 ? 'error-input !border-none' : ''}`}
                            placeholder={'Nhập mật khẩu mới'}
                            value={changePasswordData?.newPassword}
                            onChange={(e) => handleChangeInput(e.target.value, 'newPassword')}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        {
                            errorChangePassword && errorChangePassword.newPassword?.length > 0 ?
                                <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                    {errorChangePassword.newPassword}
                      </span> : ''
                        }
                    </div>
                    <div className={`input-wrap`}>
                        <div className={'label-wrap'}>
                            Xác nhận mật khẩu mới <span className={'required'}>*</span>
                        </div>
                        <Input.Password
                            className={`main-input ${errorChangePassword && errorChangePassword.confirmPassword?.length > 0 ? 'error-input !border-none' : ''}`}
                            placeholder={'Xác nhận mật khẩu mới'}
                            value={changePasswordData?.confirmPassword}
                            onChange={(e) => handleChangeInput(e.target.value, 'confirmPassword')}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        {
                            errorChangePassword && errorChangePassword.confirmPassword?.length > 0 ?
                                <span className={`error`}>
                            <div className={`icon`}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                                    {errorChangePassword.confirmPassword}
                      </span> : ''
                        }
                    </div>
                </div>
            </div>
            <div className={styles.buttonWrap}>
                <Flex vertical gap="small">
                    <Button
                        loading={isLoadingChangePassword}
                        onClick={handleConfirmChangePassword}
                        type="primary"
                        size={'large'}
                        className={`main-btn-primary flex justify-center items-center font-semibold`}
                        block
                    >
                        Xác nhận
                    </Button>
                </Flex>
            </div>
        </div>
    );
}

export default ChangePassword;
