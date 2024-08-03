import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { setTitlePage } from "../../../states/modules/app";
import { useSelector, useDispatch } from "react-redux";
import { getAllCandidate } from "../../../api/admin";
import CandidateDetail from "./Components/CandidateDetail/index";
import { deleteCandidate, restoreCandidate } from "../../../api/admin";

const AdminCandidates = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state) => state.admin.allCandidate);
    const [status, setStatus] = useState({});
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        dispatch(setTitlePage('Danh sách ứng viên'));
        dispatch(getAllCandidate());
    }, []);

    useEffect(() => {
        if (candidates) {
            const initialStatus = candidates.reduce((acc, candidate) => {
                acc[candidate._id] = candidate.is_deleted || false;
                return acc;
            }, {});
            setStatus(initialStatus);
        }
    }, [candidates]);

    const handleSeeDetail = (candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleCloseModal = () => {
        setSelectedCandidate(null);
    };

    const handleChangeStatus = async (id) => {
        if (status[id] === false) {
            await dispatch(deleteCandidate(id));
            dispatch(getAllCandidate());
        } else if (status[id] === true) {
            await dispatch(restoreCandidate(id));
            dispatch(getAllCandidate());
        }
        setStatus(prevStatus => ({
            ...prevStatus,
            [id]: !prevStatus[id]
        }));
    };

    const getTooltipText = (id) => {
        return status[id] === false ? 'Nhấn để xóa' : 'Nhấn để khôi phục';
    };

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.barContainer}>
                    {candidates.map(candidate => (
                        <div key={candidate._id} className={styles.bar}>
                            <img
                                src={candidate.avatar}
                                alt={`${candidate.first_name} ${candidate.last_name}`}
                                className={styles.avatar}
                            />
                            <div className={styles.barContent}>
                                <h2 className={styles.barTitle}>{`${candidate.first_name} ${candidate.last_name}`}</h2>
                                <p className={styles.barSubtitle}>{candidate.email}</p>
                                <p className={styles.barInfo}>Liên lạc: {candidate.phone}</p>
                                <p className={styles.barInfo}>Sinh nhật: {new Date(candidate.birth).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => handleSeeDetail(candidate)} className={styles.button}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm0 17.9c-4.14 0-7.72-3.28-9.13-7.9 1.41-4.62 5-7.9 9.13-7.9 4.14 0 7.72 3.28 9.13 7.9-1.41 4.62-5 7.9-9.13 7.9zm-1-5.9h2V7h-2v7zm0 4h2v-2h-2v2z" />
                                    </svg>
                                    Chi tiết
                                </button>
                                <div className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        id={`status-toggle-${candidate._id}`}
                                        checked={!status[candidate._id]}
                                        onChange={() => handleChangeStatus(candidate._id)}
                                    />
                                    <label htmlFor={`status-toggle-${candidate._id}`} className={styles.slider}></label>
                                    <div className={styles.tooltip}>
                                        {getTooltipText(candidate._id)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedCandidate && (
                    <CandidateDetail
                        isOpen={selectedCandidate}
                        candidate={selectedCandidate}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default AdminCandidates;
