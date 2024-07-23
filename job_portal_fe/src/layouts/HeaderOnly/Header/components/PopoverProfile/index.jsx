import React from 'react';
import styles from "./styles.module.scss";
import {removeAuthToken} from "../../../../../utils/localStorage.js";
import {startRequestGetMeFail} from "../../../../../states/modules/auth/index.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

function PopoverProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.auth.authUser);

    const handleConfirmLogout = () => {
        removeAuthToken();
        dispatch(startRequestGetMeFail())
        navigate('/login');
    }

    return (
        <div className={styles.modalInfoWrap}>
            <div className={styles.personalInformationWrap}>
                {
                    !_.isEmpty(authUser.profile) ? <>
                        <div className={styles.role}>
                            {authUser.account.email}
                        </div>
                    </> : ''
                }
            </div>
            <div className={styles.mainModalInfoWrap}>
                <ul className={styles.menuInfoWrap}>
                    {
                        !_.isEmpty(authUser.profile) ? <li
                            onClick={() => navigate('/account/profile')}
                            className={`${styles.itemInfoWrap}`}
                        >
                            <div>
                                <span className={styles.text}>Hồ sơ cá nhân</span>
                            </div>
                        </li> : ''
                    }
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
