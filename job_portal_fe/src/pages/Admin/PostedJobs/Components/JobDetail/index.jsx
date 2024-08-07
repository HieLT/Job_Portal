import React from "react";
import styles from "./styles.module.scss";

const JobDetail = ({ isOpen, job, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose} key={job._id}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>X</button>
                <h2 className={styles.modalTitle}>{job.title}</h2>
                <p className={styles.modalInfo}>Công ty: {job.company_id.name}</p>
                <p className={styles.modalInfo}>Ngày đăng: {new Date(job.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                <p className={styles.modalInfo}>Ngày hết hạn: {new Date(job.expired_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                <p className={styles.modalInfo}>Trạng thái: {job.status}</p>
                <p className={styles.modalInfo}>Mô tả: {job.description}</p>
                <p className={styles.modalInfo}>Kinh nghiệm: {job.experience_required}</p>
                <p className={styles.modalInfo}>Số lượng: {job.number_of_recruitment}</p>
                <p className={styles.modalInfo}>Lương: {job.salary}</p>
                <p className={styles.modalInfo}>Loại: {job.type}</p>
            </div>
        </div>
    );
};

export default JobDetail;
