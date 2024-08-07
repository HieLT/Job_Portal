import React from 'react';
import styles from './styles.module.scss'; 

const CompanyDetail = ({ isOpen,company, onClose }) => {
    if (!isOpen) return null; 

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>×</button>
                <div className={styles.modalHeader}>
                    <img src={company?.logo} alt={`${company.name} logo`} className={styles.modalLogo} />
                    <h2 className={styles.modalCompanyName}>{company?.name}</h2>
                </div>
                <div className={styles.modalBody}>
                    <p><strong>Website:</strong> <a href={company?.website_url} target="_blank" rel="noopener noreferrer">{company?.website_url}</a></p>
                    <p><strong>Ngày Thành Lập:</strong> {company?.founded_year}</p>
                    <p><strong>Email:</strong> {company?.account?.email}</p>
                    <p><strong>Ngày được khởi tạo:</strong> {new Date(company.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
