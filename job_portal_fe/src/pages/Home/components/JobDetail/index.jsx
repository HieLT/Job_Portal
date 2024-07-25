import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../../../api/home";
import styles from "./styles.module.css";
import HeaderOnly from "../../../../layouts/HeaderOnly/index.jsx";

const JobDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const job = useSelector(state => state.home.job);
    const company = job?.company_id || {};
    useEffect(() => {
        dispatch(getDetailJob(id));
    }, [dispatch, id]);

    console.log("Job Details:", job);

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <HeaderOnly>
            <div className={styles.container}>
                <div className={styles.jobSection}>
                    <div className={styles.jobHeader}>
                        <p><h1 className={styles.jobTitle}><strong>{job.title}</strong></h1></p>
                    </div>
                    <div className={styles.jobInfo}>
                        <div className={styles.jobSectionItem}>
                            <h2><strong>Mô tả</strong></h2>
                            <p>{job.description}</p>
                        </div>
                        <div className={styles.jobSectionItem}>
                            <h2><strong>Ngày Đăng</strong></h2>
                            <p>{job.createdAt}</p>
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
        </HeaderOnly>
    );
};

export default JobDetail;
