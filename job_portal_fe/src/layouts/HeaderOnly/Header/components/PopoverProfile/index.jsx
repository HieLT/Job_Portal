import React from 'react';
import styles from "./styles.module.scss";
import {
    getProfile,
    removeAuthEmail,
    removeAuthRole,
    removeAuthToken,
    removeProfile
} from "../../../../../utils/localStorage.js";
import {startRequestGetMeFail} from "../../../../../states/modules/auth/index.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function PopoverProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.auth.authUser);

    const handleConfirmLogout = () => {
        removeAuthToken();
        removeAuthEmail();
        removeAuthRole();
        removeProfile();
        dispatch(startRequestGetMeFail())
        navigate('/login');
    }

    return (
        <div className={styles.modalInfoWrap}>
            <div className={styles.personalInformationWrap}>
                {
                    getProfile() === '1' ? <>
                        <div className={styles.name}>
                            {authUser.user.username}
                        </div>
                        <div className={styles.role}>
                            {authUser.user.email || 'Updating...'}
                        </div>
                    </> : ''
                }
            </div>
            <div className={styles.mainModalInfoWrap}>
                <ul className={styles.menuInfoWrap}>
                    {
                        getProfile() === '1' ? <li
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
