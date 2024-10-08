import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getDetailJob} from "../../../../api/home";
import styles from "./styles.module.css";
import HeaderOnly from "../../../../layouts/HeaderOnly/index.jsx";
import {goToPage, setBreadcrumb} from "../../../../states/modules/app/index.js";
import ApplyModal from "../ApplyModal/index.jsx";
import {Skeleton} from "antd";
import _ from "lodash";

const JobDetail = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();
    const job = useSelector(state => state.home.job);
    const user = useSelector(state => state.auth.authUser);
    const isAuthSuccess = useSelector(state => state.auth.isAuthSuccess);
    const company = job?.company_id || {};

    useEffect(() => {
        dispatch(getDetailJob(id));
        dispatch(setBreadcrumb([
            {
                href: '/',
                title: 'Trang chủ'
            },
            {
                title: 'Việc làm'
            }
        ]));
    }, [dispatch, id]);

    const isJobExpired = (expiryDateString) => {
        if (!expiryDateString) return false;
        const expiryDate = new Date(expiryDateString);
        const today = new Date();
        return expiryDate < today;
    };

    const isJobClosed = job?.status !== 'Open';
    if (!job) {
        return <div className={styles.loading}><Skeleton active/></div>;
    }

    const handleApplyClick = () => {
        if (!isAuthSuccess) {
            dispatch(goToPage({path: '/login'}))
        } else {
            if (_.isEmpty(user?.profile)) {
                dispatch(goToPage({path: '/account/profile'}))
            } else {
                setModalOpen(true)
            }
        }
    };

    const handleCloseApplyModal = () => {
        setModalOpen(false);
    };

    return (
        <HeaderOnly>
            <div className={styles.container}>
                <div className={styles.jobSection}>
                    {(isJobExpired(job.expired_at) || isJobClosed) && (
                        <div className={styles.headerBand}>
                            {isJobExpired(job.expired_at) ? "This job has expired" : "This job is closed"}
                        </div>
                    )}
                    <div className={styles.jobHeader}>
                        <h1 className={styles.jobTitle}><strong>{job.title}</strong></h1>
                    </div>
                    <div className={styles.jobInfo}>
                        <div className={styles.jobDetails}>
                            <div className={styles.jobSectionItem}>
                                <h2><strong>Mô tả</strong></h2>
                                <p>{job.description}</p>
                            </div>
                            <div className={styles.jobSectionItem}>
                                <h2><strong>Ngày Đăng</strong></h2>
                                <p>{new Date(job.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                            <div className={styles.jobSectionItem}>
                                <h2><strong>Ngày Hết Hạn</strong></h2>
                                <p>{new Date(job.expired_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                            <div className={styles.jobSectionItem}>
                                <h2><strong>Vị trí</strong></h2>
                                <p>{job.position}</p>
                            </div>
                            <div className={styles.jobSectionItem}>
                                <h2><strong>Lương</strong></h2>
                                <p>{job.salary}</p>
                            </div>
                            <div className={styles.jobSectionItem}>
                                <h2><strong>Yêu cầu kinh nghiệm</strong></h2>
                                <p>{job.experience_required}</p>
                            </div>
                            {user?.account?.role === 'Candidate' && !isJobExpired(job.expired_at) && !isJobClosed && (
                                <div className={styles.applyButtonContainer}>
                                    <button className={styles.applyButton} onClick={handleApplyClick}>Ứng tuyển ngay
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.companySection}>
                    <div className={styles.companyHeader}>
                        <h1><strong>Công Ty</strong></h1>
                        {company?.logo && <img src={company.logo} alt="Company Logo" className={styles.companyLogo}/>}
                    </div>
                    <div className={styles.companyInfo}>
                        <p><strong>Tên:</strong> {company?.name }</p>
                        <p><strong>Địa điểm:</strong> {company?.location}</p>
                        <p><strong>Liên hệ:</strong> {company?.phone }</p>
                        <p><strong>Website:</strong> <a href={company?.website_url} target="_blank" rel="noopener noreferrer">{company?.website_url}</a></p>


                    </div>
                </div>
            </div>
            <ApplyModal isOpen={isModalOpen} onClose={handleCloseApplyModal} job_id={id}/>
        </HeaderOnly>
    );
};

export default JobDetail;
