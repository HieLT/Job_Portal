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
        password: '',
        confirmPassword: ''
    });
    const errorResetPassword = useSelector(state => state.auth.errorResetPassword);
    const isLoadingBtnResetPassword = useSelector(state => state.auth.isLoadingBtnResetPassword);
    const location = useSelector(state => state.app.location);

    useEffect(() => {
        dispatch(setErrorResetPassword({
            password: '',
            confirmPassword: ''
        }))
    }, [dispatch])

    const handleChangeInput = (e, type) => {
        let value = e.target.value;
        let data = _.cloneDeep(dataResetPassword);
        data[type] = value
        setDataResetPassword(data)
    }

    const handleKeyDown = (event) => {
        if (errorResetPassword.password.length !== 0 || errorResetPassword.confirmPassword.length !== 0) {
            dispatch(setErrorResetPassword({
                password: '',
                confirmPassword: ''
            }))
        }

        if (event.key === 'Enter') {
            handleConfirmResetPassword()
        }
    }

    const handleConfirmResetPassword = () => {
        let validate = handleCheckValidateConfirm(dataResetPassword, errorResetPassword);
        dispatch(setErrorResetPassword(validate.dataError))
        if (!validate.isError) {
            dispatch(resetPassword({...dataResetPassword, token: location.query.token}));
        }
    }

    return (
        <AuthLayout title={'Đặt lại mật khẩu'} description={'Cổng thông tin việc làm'}>
            <div className={`input-wrap mt-5`}>
                <div className={'label-wrap'}>
                    Mật khẩu
                </div>
                <Input.Password
                    className={`base-input ${errorResetPassword && errorResetPassword.password.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Mật khẩu'}
                    value={dataResetPassword.password}
                    onChange={(e) => handleChangeInput(e, 'password')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorResetPassword && errorResetPassword.password.length > 0 ?
                        <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto"/>
            </div>
                            {errorResetPassword.password}
          </span> : ''
                }
            </div>

            <div className={`input-wrap mt-5`}>
                <Input.Password
                    className={`base-input ${errorResetPassword && errorResetPassword.confirmPassword.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Nhập lại Mật khẩu'}
                    value={dataResetPassword.confirmPassword}
                    onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorResetPassword && errorResetPassword.confirmPassword.length > 0 ?
                        <span className={'error'}>
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
                    className={`main-btn-primary`}
                    block
                >Đặt lại mật khẩu
                </Button>
            </Flex>

            <div className={styles.forgot}>
                Trở lại trang <span onClick={() => navigate('/login')}>Đăng nhập</span>
            </div>

        </AuthLayout>
    );
}

export default ResetPassword;
