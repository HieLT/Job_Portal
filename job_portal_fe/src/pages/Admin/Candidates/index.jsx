import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { setTitlePage } from "../../../states/modules/app";
import { useSelector, useDispatch } from "react-redux";
import { getAllCandidate } from "../../../api/admin";

const AdminPostedJobs = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state) => state.admin.allCandidate);
    const [status, setStatus] = useState({});

    useEffect(() => {
        dispatch(setTitlePage('Danh sách ứng viên'));
        dispatch(getAllCandidate());
    }, [dispatch]);

    const handleSeeDetail = (id) => {
    };

    const handleChangeStatus = (id) => {
        setStatus(prevStatus => ({
            ...prevStatus,
            [id]: !prevStatus[id]
        }));
    };

    const handleDelete = (id) => {
    };

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
                            <div className={styles.buttonContainer}>
                                <button onClick={() => handleSeeDetail(candidate._id)} className={styles.button}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm0 17.9c-4.14 0-7.72-3.28-9.13-7.9 1.41-4.62 5-7.9 9.13-7.9 4.14 0 7.72 3.28 9.13 7.9-1.41 4.62-5 7.9-9.13 7.9zm-1-5.9h2V7h-2v7zm0 4h2v-2h-2v2z"/>
                                    </svg>
                                    Chi tiết
                                </button>
                                <button onClick={() => handleChangeStatus(candidate._id)} className={`${styles.button} ${status[candidate._id] ? styles.green : styles.red}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm3.5 11h-2.75v5H9.75v-5H7.5l4.5-6 4.5 6z"/>
                                    </svg>
                                    Trạng thái
                                </button>
                                <button onClick={() => handleDelete(candidate._id)} className={styles.button}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 2V1H10V2H14V3H2V2H6ZM3 4V13C3 14.105 3.895 15 5 15H11C12.105 15 13 14.105 13 13V4H3Z"/>
                                    </svg>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminPostedJobs;
