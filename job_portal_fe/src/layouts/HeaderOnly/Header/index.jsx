import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Breadcrumb, Popover} from "antd";
import contentInfo from './components/PopoverProfile';
import ImageUser from '../../../../src/assets/images/logos/user_default.png'
import {useDispatch, useSelector} from "react-redux";
import {USER_ROLE} from "../../../utils/constants.js";
import {useNavigate} from "react-router-dom";
import {CommentOutlined} from '@ant-design/icons'
import {goToPage} from "../../../states/modules/app/index.js";

const Header = ({isHeaderOnly}) => {
    const openFullScreen = () => {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authUser = useSelector((state) => state.auth.authUser);
    const isAuthSuccess = useSelector((state) => state.auth.isAuthSuccess);
    const breadcrumb = useSelector(state => state.app.breadcrumb);

    const isCandidateAndHasAvatar = (authUser?.account?.role === USER_ROLE['CANDIDATE'] && authUser.profile?.avatar)
    const isCompanyAndHasLogo = (authUser?.account?.role === USER_ROLE['COMPANY'] && authUser.profile?.logo)
    const isAdmin = authUser?.account?.role === USER_ROLE['ADMIN']

    return (
        <header className={`${styles.headerWrap} ${isHeaderOnly && '!bg-[white]'}`}>
            <div className={styles.headerLeftWrap}>
                {
                    isHeaderOnly ?
                        <div className={styles.headerMainWrap}>
                            <div className={`${styles.breadcrumbWrap} breadcrumb-custom`}>
                                {
                                    (breadcrumb && breadcrumb?.length > 0) ?
                                        <Breadcrumb items={breadcrumb} separator=">"/> : ''
                                }
                            </div>
                        </div> : ''
                }
            </div>
            <div className={`${styles.headerRightWrap}`}>
                <div className={`${styles.itemHeaderRight}`}>
                    <div onClick={() => openFullScreen()} className={`${styles.iconWrap}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20.571" width="18"
                             height="20.571">
                            <path fill="currentColor"
                                  d="M5.464 12.857h-4.5a.963.963 0 1 0 0 1.928H4.5v3.536c0 .534.43.964.964.964s.964-.43.964-.964v-4.5a.962.962 0 0 0-.964-.964zm7.071-5.143h4.5a.964.964 0 1 0 0-1.928h-3.536V2.25a.963.963 0 1 0-1.928 0v4.5c0 .534.43.964.964.964zM5.464 1.286a.963.963 0 0 0-.964.964v3.536H.964a.963.963 0 1 0 0 1.928h4.5c.534 0 .964-.43.964-.964v-4.5a.963.963 0 0 0-.964-.964zm11.571 11.571h-4.499a.962.962 0 0 0-.964.964v4.5a.965.965 0 0 0 1.928 0v-3.536h3.536a.965.965 0 0 0 0-1.928z"/>
                        </svg>
                    </div>
                </div>

                <div className={`${styles.itemHeaderRight}`}>
                    {
                        isAuthSuccess ? <div className={'flex items-center'}>
                                {
                                    !isAdmin ?
                                        <div
                                            className={'w-9 flex items-center justify-center h-9 p-2 rounded-[50%] mr-5'}
                                            onClick={() => dispatch(goToPage({path: '/conversations'}))}
                                        >
                                            <CommentOutlined style={{color: 'black', fontSize: '25px'}}/>
                                        </div>
                                        : ''
                                }
                                <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentInfo}
                                         trigger="click">
                                    <div className={styles.infoWrap}>
                                        <div className={styles.avatarWrap}>
                                            <img src={isCandidateAndHasAvatar ? authUser?.profile?.avatar :
                                                (isCompanyAndHasLogo ? authUser?.profile?.logo : ImageUser)
                                            }
                                                 alt="" onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = ImageUser;
                                            }}/>
                                        </div>
                                    </div>
                                </Popover>
                            </div> :
                            <div onClick={() => navigate('/login')}
                                 className={'font-semibold text-base'}>
                                Đăng nhập
                            </div>
                    }
                </div>

            </div>
        </header>
    );
}

export default Header
