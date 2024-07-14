import React, {useEffect, useState} from 'react';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import {Button, Flex, Input} from "antd";
import IconWarning from "../../../assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import styles from './styles.module.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setErrorLogin} from "../../../states/modules/auth/index.js";
import _ from "lodash";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";
import {login} from "../../../api/auth/index.js";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [datFormLogin, setDatFormLogin] = useState({
        email: '',
        password: ''
    })
    const errorLogin = useSelector(state => state.auth.errorLogin);
    const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin);

    useEffect(() => {
        dispatch(setErrorLogin({
            email: '',
            password: ''
        }))
    }, [dispatch])

    const handleChangeInput = (e, type) => {
        /* Hiding error message */
        if (errorLogin[type]?.length !== 0) {
            dispatch(setErrorLogin({
                ...errorLogin,
                [type]: ''
            }))
        }

        let value = e.target.value;
        let data = _.cloneDeep(datFormLogin);
        data[type] = value
        setDatFormLogin(data)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmLogin()
        }
    }

    const handleConfirmLogin = () => {
        const validate = handleCheckValidateConfirm(datFormLogin, errorLogin)
        if (!validate.isError) {
            dispatch(login(datFormLogin))
        } else {
            dispatch(setErrorLogin(validate.dataError))
        }
    }

    return (
        <AuthLayout title={'Đăng nhập'} description={'Cổng thông tin việc làm'} height={'h-screen'} width={'w-[900px]'}>
            <div className={`input-wrap base-input`}>
                <div className={'label-wrap'}>
                    Email
                </div>
                <Input
                    className={`${errorLogin && errorLogin.email?.length > 0 ? 'error-input !border-none' : ''}`}
                    placeholder={'Địa chỉ email'}
                    value={datFormLogin.email}
                    onChange={(e) => handleChangeInput(e, 'email')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorLogin && errorLogin.email?.length > 0 ?
                        <span className={`error !text-[#fef300]`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height="auto"/>
            </div>
                            {errorLogin.email}
          </span> : ''
                }
            </div>

            <div className={`input-wrap mt-5 base-input-password`}>
                <div className={'label-wrap'}>
                    Mật khẩu
                </div>
                <Input.Password
                    className={`!pt-[9px] !pb-[9px] ${errorLogin && errorLogin.password?.length > 0 ? 'error-input !border-none' : ''}`}
                    placeholder={'Mật khẩu'}
                    value={datFormLogin.password}
                    onChange={(e) => handleChangeInput(e, 'password')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorLogin && errorLogin.password?.length > 0 ?
                        <span className={'error !text-[#fef300]'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto"/>
            </div>
                            {errorLogin.password}
          </span> : ''
                }
            </div>

            <div className={styles.forgot}>
                <span onClick={() => navigate('/forgot-password')} className={'underline'}>Quên mật khẩu?</span>
            </div>

            <Flex vertical gap="small">
                <Button
                    loading={isLoadingBtnLogin}
                    type="primary"
                    onClick={() => handleConfirmLogin()}
                    size={'large'}
                    className={`auth-btn flex justify-center items-center font-semibold`}
                    block
                >
                    Đăng nhập
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '6px', marginTop: '2px'}}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l14 0"></path>
                        <path d="M15 16l4 -4"></path>
                        <path d="M15 8l4 4"></path>
                    </svg>
                </Button>
            </Flex>

            <div className={styles.signup}>
                <span>Bạn chưa có tài khoản? &nbsp;</span>
                <span onClick={() => navigate('/signup')} className={'underline'}>Đăng ký</span>
            </div>

        </AuthLayout>
    );
}

export default Login;
