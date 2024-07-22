import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { setBreadcrumb } from "../../../states/modules/app";
import { useSelector, useDispatch } from "react-redux";
import { getAllCandidate } from "../../../api/admin";

const AdminPostedJobs = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state) => state.admin.allCandidate);

    useEffect(() => {
        dispatch(setBreadcrumb({
            breadcrumb: 'Danh sách ứng viên'
        }));
        dispatch(getAllCandidate());
    }, [dispatch]);

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.barContainer}>
                    {candidates.map(candidate => (
                        <div key={candidate._id} className={styles.bar}>
                            <img src={candidate.avatar} alt={`${candidate.first_name} ${candidate.last_name}`} className={styles.avatar} />
                            <div className={styles.barContent}>
                                <h2 className={styles.barTitle}>{`${candidate.first_name} ${candidate.last_name}`}</h2>
                                <p className={styles.barSubtitle}>{candidate.email}</p>
                                <p className={styles.barInfo}>Liên lạc: {candidate.phone}</p>
                                <p className={styles.barInfo}>Sinh nhật: {new Date(candidate.birth).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminPostedJobs;
