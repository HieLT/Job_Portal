import React from 'react';
import styles from './styles.module.scss'; 

const CandidateDetail = ({ isOpen, candidate, onClose }) => {
    if (!isOpen) return 1;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>×</button>
                <div className={styles.modalHeader}>
                    <img src={candidate?.avatar} alt={`${candidate.first_name} ${candidate.last_name}`} className={styles.modalAvatar} />
                    <h2 className={styles.modalCandidateName}>{`${candidate?.first_name} ${candidate.last_name}`}</h2>
                </div>
                <div className={styles.modalBody}>
                    <p><strong>Email:</strong> {candidate?.account?.email}</p>
                    <p><strong>Phone:</strong> {candidate?.phone}</p>
                    <p><strong>Birthdate:</strong> {new Date(candidate?.birth).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                </div>
            </div>
        </div>
    );
};

export default CandidateDetail;
