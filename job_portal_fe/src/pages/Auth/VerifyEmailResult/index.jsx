import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Result, Spin} from "antd";
import {verifyEmail} from "../../../api/auth/index.js";
import '../../../index.scss'

function VerifyEmailResult() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useSelector(state => state.app.location)
    const isLoadingVerifyEmail = useSelector(state => state.auth.isLoadingVerifyEmail)
    const verifyResult = useSelector(state => state.auth.verifyResult)
    const verifyToken = location.params.token

    useEffect(() => {
        dispatch(verifyEmail(verifyToken))
    }, [dispatch, verifyToken])

    return (
        <div className={'bg-[#f1f0fe] h-screen flex justify-center items-center'}>
            {
                isLoadingVerifyEmail ? <Spin size={'large'}/> :
                    <Result
                        status={verifyResult.type === 1 ? "success" : 'error'}
                        title={verifyResult.message}
                        extra={[
                            <Button type="primary" className={'auth-btn'}
                                    key="console" onClick={() => navigate('/')}
                            >
                                Về trang chủ
                            </Button>,
                        ]}
                    />
            }
        </div>
    );
}

export default VerifyEmailResult;
