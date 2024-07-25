import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../../../api/home";
import styles from "./styles.module.css";
import HeaderOnly from "../../../../layouts/HeaderOnly/index.jsx";

const JobDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log("id" , id);
    const job = useSelector(state => state.home.job); // Adjust according to your state
    console.log('job' , job);
    useEffect(() => {
        dispatch(getDetailJob(id));
    }, [dispatch, id]);

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <HeaderOnly>
            <div className={styles.jobDetails}>
                <div className={styles.jobHeader}>
                    <h1 className={styles.jobTitle}>{job.title}</h1>
                    <p className={styles.jobCompany}>{job.company}</p>
                </div>
                <div className={styles.jobInfo}>
                    <div className={styles.jobSection}>
                        <h2>Description</h2>
                        <p>{job.description}</p>
                    </div>
                    <div className={styles.jobSection}>
                        <h2>Type</h2>
                        <p>{job.type}</p>
                    </div>
                    <div className={styles.jobSection}>
                        <h2>Salary</h2>
                        <p>{job.salary}</p>
                    </div>
                    <div className={styles.jobSection}>
                        <h2>Experience Required</h2>
                        <p>{job.experience_required}</p>
                    </div>
                </div>
            </div>
        </HeaderOnly>
    );
};

export default JobDetail;
