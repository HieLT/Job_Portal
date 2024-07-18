import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess} from "../../states/modules/app";
import {ArrowUpOutlined} from '@ant-design/icons'
import {Button} from "antd";

function HeaderOnly(props) {
    const {children} = props;
    const isShowSideBar = useSelector(state => state.app.isShowSideBar);
    const isThemeLight = useSelector(state => state.app.isThemeLight);
    const goToPage = useSelector(state => state.app.goToPage);
    const [visibleScrollButton, setVisibleScrollButton] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const handleScroll = () => {
        const currentTop = window.pageYOffset || document.documentElement.scrollTop
        if (currentTop > 300) {
            setVisibleScrollButton(true)
        } else {
            setVisibleScrollButton(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (goToPage.path && !goToPage.redirected) {
            dispatch(goToPageSuccess());
            navigate(goToPage.path);
        }
    }, [goToPage, navigate, dispatch]);


    return (
        <div className={`${styles.boxMainLayout}`}>
            <div className={styles.headerBox}></div>
            <div className={styles.mainLayoutWrap}>
                <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
                    <Header isHeaderOnly/>
                    <main className={styles.mainContentWrap}>
                        {children}
                    </main>
                </div>
            </div>
            {
                visibleScrollButton ? <div className={styles.scrollToTopButton} onClick={handleGoToTop}>
                    <Button>
                        <ArrowUpOutlined width={14} height={14}/>
                    </Button>
                </div> : ''
            }
        </div>
    );
}

export default HeaderOnly;
