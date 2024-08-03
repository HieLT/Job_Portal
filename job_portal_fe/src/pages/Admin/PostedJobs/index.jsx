import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { setTitlePage } from '../../../states/modules/app';
import { useSelector, useDispatch } from "react-redux";
import { getAllJob } from "../../../api/home";
import JobDetail from "./Components/JobDetail/index"; 

const AdminPostedJobs = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.home.jobs);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        dispatch(setTitlePage('Danh sách công việc'));
        dispatch(getAllJob());
    }, [dispatch]);

    const handleSeeDetail = (job) => {
        setSelectedJob(job);
        console.log(selectedJob);
        
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };
    
    
    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.barContainer}>
                    {jobs.map(job => (
                        <div key={job._id} className={styles.bar}>
                            <div className={styles.barContent}>
                                <h2 className={styles.barTitle}>{job.title}</h2>
                                <p className={styles.barInfo}>Công ty: {job.company_id}</p>
                                <p className={styles.barInfo}>Ngày đăng: {new Date(job.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year:'numeric' })}</p>
                                <p className={styles.barInfo}>Ngày hết hạn: {new Date(job.expired_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year:'numeric' })}</p>
                                <p className={styles.barInfo}>Trạng thái: {job.status}</p>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => handleSeeDetail(job)} className={styles.button}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm0 17.9c-4.14 0-7.72-3.28-9.13-7.9 1.41-4.62 5-7.9 9.13-7.9 4.14 0 7.72 3.28 9.13 7.9-1.41 4.62-5 7.9-9.13 7.9zm-1-5.9h2V7h-2v7zm0 4h2v-2h-2v2z" />
                                    </svg>
                                    Chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedJob && (
                    <JobDetail
                        isOpen={selectedJob}
                        job={selectedJob}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default AdminPostedJobs;
