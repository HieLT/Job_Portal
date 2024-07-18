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
import {getNotification, handleCheckValidateConfirm} from "../../../utils/helper.js";
import {login, loginWithGoogle} from "../../../api/auth/index.js";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setDatFormLogin] = useState({
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
        let data = _.cloneDeep(loginData);
        data[type] = value
        setDatFormLogin(data)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmLogin()
        }
    }

    const handleConfirmLogin = () => {
        const validate = handleCheckValidateConfirm(loginData, errorLogin)
        if (!validate.isError) {
            dispatch(login(loginData))
        } else {
            dispatch(setErrorLogin(validate.dataError))
        }
    }

    return (
        <AuthLayout title={'Đăng nhập'} description={'Cổng thông tin việc làm'} height={'h-screen'} width={'w-[1000px]'}>
            <div className={`input-wrap base-input`}>
                <div className={'label-wrap'}>
                    Email
                </div>
                <Input
                    className={`${errorLogin && errorLogin.email?.length > 0 ? 'error-input !border-none' : ''}`}
                    placeholder={'Địa chỉ email'}
                    value={loginData.email}
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
                    value={loginData.password}
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

            <div className={'border-t-2 mt-8 text-center text-sm'}>
                <p className={'mt-2'}>Hoặc</p>
                <div className={styles.btnLoginWithGoogle}>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            type="standard"
                            theme="filled_black"
                            shape="pill"
                            size="large"
                            logo_alignment="left"
                            locale="vi_VN"
                            onSuccess={(response) => dispatch(loginWithGoogle(response.credential))}
                            onError={() => getNotification("error", "Đăng nhập thất bại")}
                            useOneTap={true}
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Login;
