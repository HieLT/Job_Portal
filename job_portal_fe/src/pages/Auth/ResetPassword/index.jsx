import React, {useEffect, useState} from 'react';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import {Button, Flex, Input} from "antd";
import styles from './styles.module.scss';
import IconWarning from "../../../assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setErrorResetPassword} from "../../../states/modules/auth/index.js";
import _ from "lodash";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";
import {resetPassword} from "../../../api/auth/index.js";

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataResetPassword, setDataResetPassword] = useState({
        token: '',
        newPassword: '',
        confirmPassword: ''
    });
    const errorResetPassword = useSelector(state => state.auth.errorResetPassword);
    const isLoadingBtnResetPassword = useSelector(state => state.auth.isLoadingBtnResetPassword);
    const location = useSelector(state => state.app.location);

    useEffect(() => {
        dispatch(setErrorResetPassword({
            newPassword: '',
            confirmPassword: ''
        }))
    }, [dispatch])

    const handleChangeInput = (e, type) => {
        dispatch(setErrorResetPassword({
            ...errorResetPassword,
            [type]: ''
        }))

        let value = e.target.value;
        let data = _.cloneDeep(dataResetPassword);
        data[type] = value
        setDataResetPassword(data)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmResetPassword()
        }
    }

    const handleConfirmResetPassword = () => {
        let validate = handleCheckValidateConfirm(dataResetPassword, errorResetPassword, 'changePassword');
        dispatch(setErrorResetPassword(validate.dataError))
        if (!validate.isError) {
            dispatch(resetPassword({
                password: dataResetPassword.newPassword,
                token: location.params?.token
            }));
        }
    }

    return (
        <AuthLayout title={'Đặt lại mật khẩu'} description={'Cổng thông tin việc làm'} height={'h-screen'}
                    width={'w-[900px]'} childrenHeight={'h-[550px]'}>
            <div className={`input-wrap mt-5 base-input-password`}>
                <div className={'label-wrap'}>
                    Mật khẩu
                </div>
                <Input.Password
                    className={`${errorResetPassword && errorResetPassword.newPassword?.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Mật khẩu'}
                    value={dataResetPassword.newPassword}
                    onChange={(e) => handleChangeInput(e, 'newPassword')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorResetPassword && errorResetPassword.newPassword?.length > 0 ?
                        <span className={'error !text-[yellow]'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto"/>
            </div>
                            {errorResetPassword.newPassword}
          </span> : ''
                }
            </div>

            <div className={`input-wrap mt-5 base-input-password`}>
                <div className={'label-wrap'}>
                    Xác nhận mật khẩu
                </div>
                <Input.Password
                    className={`${errorResetPassword && errorResetPassword.confirmPassword?.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Nhập lại mật khẩu'}
                    value={dataResetPassword.confirmPassword}
                    onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorResetPassword && errorResetPassword.confirmPassword?.length > 0 ?
                        <span className={'error !text-[yellow]'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto"/>
            </div>
                            {errorResetPassword.confirmPassword}
          </span> : ''
                }
            </div>

            <Flex vertical gap="small" style={{width: '100%'}}>
                <Button
                    loading={isLoadingBtnResetPassword}
                    type="primary"
                    size={'large'}
                    onClick={() => handleConfirmResetPassword()}
                    className={`auth-btn font-semibold`}
                    block
                >
                    Đặt lại mật khẩu
                </Button>
            </Flex>

            <div className={styles.forgot}>
                <span onClick={() => navigate('/login')} className={'underline'}>Trở lại trang đăng nhập</span>
            </div>
            <div className={'text-center text-sm mb-10 mt-2 underline cursor-pointer'}
                 onClick={() => navigate('/')}
            >
                Quay lại trang chủ
            </div>
        </AuthLayout>
    );
}

export default ResetPassword;
