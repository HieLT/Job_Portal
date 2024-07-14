import React, {useEffect, useState} from 'react';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import {Button, Flex, Input} from "antd";
import styles from './styles.module.scss';
import IconWarning from "../../../assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setErrorForgotPassword, setErrorResetPassword} from "../../../states/modules/auth/index.js";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";

function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const errorForgotPassword = useSelector(state => state.auth.errorForgotPassword);
    const isLoadingBtnForgotPassword = useSelector(state => state.auth.isLoadingBtnForgotPassword);

    useEffect(() => {
        dispatch(setErrorForgotPassword({
            email: ''
        }))
    }, [dispatch])

    const handleChangeInput = (value) => {
        setEmail(value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmRequestForgotPassword()
        }
    }

    const handleConfirmRequestForgotPassword = () => {
        let validate = handleCheckValidateConfirm(email, errorForgotPassword);
        dispatch(setErrorResetPassword(validate.dataError))
        if (!validate.isError) {
            // TODO: call api request forgot password link
        }
    }

    return (
        <AuthLayout title={'Quên mật khẩu'} description={'Cổng thông tin việc làm'} height={'h-screen'}
                    childrenHeight={'h-[500px]'} width={'w-[800px]'}>
            <div className={`input-wrap mt-5 base-input`}>
                <div className={'label-wrap'}>
                    Email
                </div>
                <Input
                    className={`${errorForgotPassword && errorForgotPassword.email?.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Địa chỉ email'}
                    value={email}
                    onChange={(e) => handleChangeInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorForgotPassword && errorForgotPassword.email?.length > 0 ?
                        <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto"/>
            </div>
                            {errorForgotPassword.email}
          </span> : ''
                }
            </div>

            <Flex vertical gap="small" style={{width: '100%'}}>
                <Button
                    loading={isLoadingBtnForgotPassword}
                    type="primary"
                    size={'large'}
                    onClick={() => handleConfirmRequestForgotPassword()}
                    className={`auth-btn font-semibold`}
                    block
                >
                    Yêu cầu đặt lại mật khẩu
                </Button>
            </Flex>

            <div className={styles.forgot}>
                <span onClick={() => navigate('/login')} className={'underline'}>Trở lại trang đăng nhập</span>
            </div>
        </AuthLayout>
    );
}

export default ForgotPassword;
