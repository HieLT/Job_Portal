import React, { useState } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from '../../../../api/job';
import { Button } from 'antd';

const ApplyModal = ({ isOpen, onClose, job_id }) => {
    const dispatch = useDispatch();
    const candidate = useSelector(state => state.auth.authUser);
    const isLoadingSubmitJob = useSelector(state => state.job.isLoadingSubmitJob);
    
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeOption, setResumeOption] = useState('upload'); 

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleCoverLetterChange = (e) => {
        setCoverLetter(e.target.value);
    };

    const handleResumeOptionChange = (e) => {
        setResumeOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", resume);
        data.append("job_id", job_id);
        data.append("cover_letter", coverLetter);
        data.append("candidate_id", candidate.profile._id);
        data.append("resume_path", ''); 
        dispatch(applyJob(data));
        handleClose()
    };

    const handleClose = () =>{
        onClose();
        setCoverLetter('');
        setResumeOption('upload')
    }

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleClose}>X</button>
                <h2>Ứng Tuyển Ngay</h2>
                <div>
                    <div className={styles.formGroup}>
                        <label htmlFor="resumeOption">Chọn tùy chọn resume:</label>
                        <select 
                            id="resumeOption" 
                            value={resumeOption} 
                            onChange={handleResumeOptionChange}
                        >
                            <option value="upload">Tải Resume lên</option>
                            <option value="choose">Chọn Resume có sẵn</option>
                        </select>
                    </div>
                    {resumeOption === 'upload' && (
                        <div className={styles.formGroup}>
                            <label htmlFor="resume">Upload Resume:</label>
                            <input 
                                type="file" 
                                id="resume" 
                                onChange={handleFileChange} 
                            />
                        </div>
                    )}
                    {resumeOption === 'choose' && (
                        <div className={styles.formGroup}>
                            {/* Implement resume selection logic here */}
                            <label htmlFor="resumePath">Chọn Resume có sẵn:</label>
                            <select 
                                id="resumePath" 
                                onChange={(e) => setResume(e.target.value)}
                            >
                                <option value="">Chonj</option>
                                {/* Add options dynamically based on available resumes */}
                            </select>
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label htmlFor="coverLetter">Lời giới thiệu:</label>
                        <textarea
                            id="coverLetter"
                            value={coverLetter}
                            onChange={handleCoverLetterChange}
                            rows="5"
                            placeholder="Write your cover letter here..."
                        />
                    </div>
                    <Button
                        type='primary'
                        className={"main-btn-primary"}
                        loading={isLoadingSubmitJob}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ApplyModal;
