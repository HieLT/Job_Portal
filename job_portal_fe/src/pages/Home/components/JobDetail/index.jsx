import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../../../api/home";
import styles from "./styles.module.css";
import HeaderOnly from "../../../../layouts/HeaderOnly/index.jsx";
import { setBreadcrumb } from "../../../../states/modules/app/index.js";
import ApplyModal from "../ApplyModal/index.jsx";
import { Skeleton } from "antd";

const JobDetail = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const job = useSelector(state => state.home.job);
    const user = useSelector(state => state.auth.authUser)
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

    if (!job) {
        return <div className={styles.loading}><Skeleton active /></div>;
    }


    const handleApplyClick = () => {
        setModalOpen(true)
    }
    const handleCloseApplyModal = () => {
        setModalOpen(false)
    }
    return (
        <HeaderOnly>
            <div className={styles.container}>
                <div className={styles.jobSection}>
                    <div className={styles.jobHeader}>
                        <h1 className={styles.jobTitle}><strong>{job.title}</strong></h1>
                    </div>
                    <div className={styles.jobInfo}>
                        <div className={styles.jobSectionItem}>
                            <h2><strong>Mô tả</strong></h2>
                            <p>{job.description}</p>
                        </div>
                        <div className={styles.jobSectionItem}>
                            <h2><strong>Ngày Đăng</strong></h2>
                            <p>{new Date(job.createdAt).toISOString().split('T')[0]}</p>
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
                        {
                            user?.account?.role === 'Candidate' ?
                            <div className={styles.applyButtonContainer}>
                                <button className={styles.applyButton} onClick={handleApplyClick} >Ứng tuyển ngay</button>
                            </div> : ''
                        }

                    </div>
                </div>
                <div className={styles.companySection}>
                    <div className={styles.companyHeader}>
                        <h1><strong>Công Ty</strong></h1>
                        {company?.logo && <img src={company.logo} alt="Company Logo" className={styles.companyLogo} />}
                    </div>
                    <div className={styles.companyInfo}>
                        <p><strong>Tên:</strong> {company?.name || "Not Available"}</p>
                        <p><strong>Vị trí:</strong> {company?.location || "Not Available"}</p>
                        <p><strong>Liên hệ:</strong> {company?.phone || "Not Available"}</p>
                        <p><strong>Thành lập từ:</strong> {company?.founded_year || "Not Available"}</p>
                    </div>
                </div>
            </div>

            <ApplyModal isOpen={isModalOpen} onClose={handleCloseApplyModal} job_id={id} />
        </HeaderOnly>
    );
};

export default JobDetail;
