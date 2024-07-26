import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess} from "../../states/modules/app";
import SideBar from "./SiderBar/index.jsx";
import {Breadcrumb} from "antd";

function MainLayout(props) {
    const {children} = props;
    const isShowSideBar = useSelector(state => state.app.isShowSideBar);
    const isThemeLight = useSelector(state => state.app.isThemeLight);
    const title = useSelector((state) => state.app.title)
    const breadcrumb = useSelector(state => state.app.breadcrumb);
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
        <div className={`${styles.boxMainLayout}`}>
            <div className={styles.headerBox}></div>
            <div className={styles.mainLayoutWrap}>
                <SideBar
                    isThemeLight={isThemeLight}
                    isShowSideBar={isShowSideBar}
                />
                <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
                    <Header/>
                    <main className={styles.mainContentWrap}>
                        <div className={styles.headerMainWrap}>
                            <div className={styles.titleWrap}>{title}</div>
                            <div className={`${styles.breadcrumbWrap} breadcrumb-custom`}>
                                {(breadcrumb && breadcrumb?.length > 0) ?
                                    <Breadcrumb items={breadcrumb} separator={'-'}/> : ''}
                            </div>
                        </div>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
