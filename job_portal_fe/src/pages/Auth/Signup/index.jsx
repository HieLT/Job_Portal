import React, {useEffect, useState} from 'react';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import {Button, Checkbox, Flex, Input} from "antd";
import styles from './styles.module.scss';
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../assets/images/icons/light/warning.svg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setErrorSignup} from "../../../states/modules/auth/index.js";
import _ from "lodash";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";
import {signup} from "../../../api/auth/index.js";
import {USER_ROLE} from "../../../utils/constants.js";

function Signup() {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        role: USER_ROLE['CANDIDATE']
    });
    const errorSignup = useSelector(state => state.auth.errorSignup);
    const isLoadingBtnSignup = useSelector(state => state.auth.isLoadingBtnSignup);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setErrorSignup({
            email: '',
            password: '',
            confirm_password: ''
        }))
    }, [dispatch])

    const handleChangeInput = (value, type) => {
        dispatch(setErrorSignup({
            ...errorSignup,
            [type]: ''
        }))
        let data = _.cloneDeep(signupData);
        data[type] = value
        setSignupData(data)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmSignup()
        }
    }

    const handleConfirmSignup = () => {
        let validate = handleCheckValidateConfirm(signupData, errorSignup);
        dispatch(setErrorSignup(validate.dataError))
        if (!validate.isError) {
            // eslint-disable-next-line no-unused-vars
            const {confirm_password, ...data} = signupData
            dispatch(signup(data))
        }
    }

    return (
        <AuthLayout title={'Đăng ký tài khoản'} description={'Đăng ký để trải nghiệm các tính năng'}
                    height={'h-screen'} width={'w-[1000px]'}>
            <div className={'input-wrap base-input'}>
                <div className={'label-wrap'}>
                    Email
                </div>
                <Input
                    className={`${errorSignup && errorSignup?.email?.length > 0 ? 'error-input !border-none' : ''}`}
                    placeholder={'Email'}
                    value={signupData.email}
                    onChange={(e) => handleChangeInput(e.target.value, 'email')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorSignup && errorSignup.email?.length > 0 ?
                        <span className={`error !text-[#fef300]`}>
                            <div className={'icon'}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                            {errorSignup.email}
                        </span> : ''
                }
            </div>
            <div className={'input-wrap base-input-password'}>
                <div className={'label-wrap'}>
                    Mật khẩu
                </div>
                <Input.Password
                    className={`${errorSignup && errorSignup?.password?.length > 0 ? 'error-input !border-none' : ''}`}
                    placeholder={'Mật khẩu'}
                    value={signupData.password}
                    onChange={(e) => handleChangeInput(e.target.value, 'password')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorSignup && errorSignup.password?.length > 0 ?
                        <span className={`error !text-[#fef300]`}>
                            <div className={'icon'}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                            {errorSignup.password}
                        </span> : ''
                }
            </div>
            <div className={'input-wrap base-input-password'}>
                <div className={'label-wrap'}>
                    Xác nhận mật khẩu
                </div>
                <Input.Password
                    className={`${errorSignup && errorSignup?.confirm_password?.length > 0 ? 'error-input !border-none' : ''}`}
                    placeholder={'Xác nhận mật khẩu'}
                    value={signupData.confirm_password}
                    onChange={(e) => handleChangeInput(e.target.value, 'confirm_password')}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {
                    errorSignup && errorSignup.confirm_password?.length > 0 ?
                        <span className={`error !text-[#fef300]`}>
                            <div className={'icon'}>
                              <InlineSVG src={IconWarning} width={14} height="auto"/>
                            </div>
                            {errorSignup.confirm_password}
                        </span> : ''
                }
            </div>
            <div className={'input-wrap'}>
                <div className={'label-wrap checkbox-custom'}>
                    <Checkbox
                        onChange={e => handleChangeInput(
                            e.target.checked ? USER_ROLE['COMPANY'] : USER_ROLE['CANDIDATE'],
                            'role'
                        )}
                    >
                        Đăng ký tài khoản doanh nghiệp
                    </Checkbox>
                </div>
            </div>

            <Flex vertical gap="small" style={{width: '100%'}}>
                <Button
                    loading={isLoadingBtnSignup}
                    type="primary"
                    size={'large'}
                    className={`auth-btn mt-3 font-semibold flex justify-center items-center`}
                    block
                    onClick={handleConfirmSignup}
                >
                    Register
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

            <div className={styles.option}>
                <span>Bạn đã có tài khoản? &nbsp;</span>
                <span onClick={() => navigate('/login')} className={'underline'}>Đăng nhập ngay</span>
            </div>
        </AuthLayout>
    );
}

export default Signup;
