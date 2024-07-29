import React from 'react';
import styles from "./styles.module.scss";
import {removeAuthToken} from "../../../../../utils/localStorage.js";
import {startRequestGetMeFail} from "../../../../../states/modules/auth/index.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {USER_ROLE} from "../../../../../utils/constants.js";

function PopoverProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.auth.authUser);

    const isUpdatedCompany = authUser?.account?.role === USER_ROLE['COMPANY'] && !_.isEmpty(authUser?.account?.profile)
    const isUpdatedCandidate = authUser?.account?.role === USER_ROLE['CANDIDATE'] && !_.isEmpty(authUser?.account?.profile)

    const handleConfirmLogout = () => {
        removeAuthToken();
        dispatch(startRequestGetMeFail())
        navigate('/');
    }

    return (
        <div className={styles.modalInfoWrap}>
            <div className={styles.personalInformationWrap}>
                {
                    !_.isEmpty(authUser?.profile) ? <>
                        <div className={styles.role}>
                            {authUser?.account?.email}
                        </div>
                    </> : ''
                }
            </div>
            <div className={styles.mainModalInfoWrap}>
                <ul className={styles.menuInfoWrap}>
                    {
                        isUpdatedCompany ? <li
                            onClick={() => navigate('/account/dashboard')}
                            className={`${styles.itemInfoWrap}`}
                        >
                            <div>
                                <span className={styles.text}>Tổng quan</span>
                            </div>
                        </li> : (
                            isUpdatedCandidate ? <li
                                onClick={() => navigate('/account/applied-jobs')}
                                className={`${styles.itemInfoWrap}`}
                            >
                                <div>
                                    <span className={styles.text}>Công việc đã ứng tuyển</span>
                                </div>
                            </li> : ''
                        )
                    }
                    <li
                        onClick={() => navigate('/account/profile')}
                        className={`${styles.itemInfoWrap}`}
                    >
                        <div>
                            <span className={styles.text}>Hồ sơ cá nhân</span>
                        </div>
                    </li>
                    <li
                        onClick={() => handleConfirmLogout()}
                        className={styles.itemInfoWrap}
                    >
                        <div>
                            <span className={styles.text}>Đăng xuất</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PopoverProfile;
