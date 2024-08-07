import React, {useEffect} from 'react';
import './styles.scss'
import PropTypes from "prop-types";
import styles from './styles.module.scss';
import Theme from "../../assets/images/logos/theme.png";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess} from "../../states/modules/app/index.js";

AuthLayout.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

AuthLayout.defaultProps = {
    title: '',
    description: ''
}

function AuthLayout(props) {
    const {children, title, description, height, width, childrenHeight} = props;
    const goToPage = useSelector(state => state.app.goToPage);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (goToPage.path && !goToPage.redirected) {
            dispatch(goToPageSuccess());
            navigate(goToPage.path);
        }
    }, [goToPage, navigate, dispatch]);

    return (
        <div className={`bg-[#f1f0fe] ${height || 'h-auto'} p-10 flex items-center`}>
            <div className={`${width || ''} ${childrenHeight || ''} rounded-xl ml-auto mr-auto bg-[white] overflow-hidden`}>
                <div className={styles.authLoginWrap}>
                    <div className={styles.themeWrap}>
                        <img src={Theme} alt=""/>
                    </div>
                    <div className={styles.formWrap}>
                        <div className={styles.content}>
                            <div className={styles.header}>{title}</div>
                            <div className={styles.headerDetail}>{description}</div>
                            <div className={styles.childrenWrap}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
