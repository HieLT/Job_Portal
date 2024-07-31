import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import { applyJob } from '../../../../api/job';
import { Button, message } from 'antd';  
import { getMyResumes } from '../../../../api/profile/index';

const ApplyModal = ({ isOpen, onClose, job_id }) => {
    const dispatch = useDispatch();
    const candidate = useSelector(state => state.auth.authUser);
    const isLoadingSubmitJob = useSelector(state => state.job.isLoadingSubmitJob);
    const resumes = useSelector(state => state.cv.myResumes);
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeOption, setResumeOption] = useState('upload'); 
    useEffect(() => {
        if (candidate?.account?.role === "Candidate") dispatch(getMyResumes()); 
    }, [dispatch]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file?.type !== 'application/pdf') {
            message.error('Chỉ được tải lên file PDF.');
            setResume(null); 
            handleClose()
        }
        setResume(file);
    };

    const handleCoverLetterChange = (e) => {
        setCoverLetter(e.target.value);
    };

    const handleResumeOptionChange = (e) => {
        setResumeOption(e.target.value);
    };

    const handleResumePathChange = (e) => {
        setResume(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!coverLetter.trim()) {
            message.error('Lời giới thiệu không thể để trống.');
            return;
        }
        const data = new FormData();
        if (resumeOption === 'upload' && resume) {
            data.append("file", resume);
            data.append("file_path" , "")
        } else if (resumeOption === 'upload' && !resume) {
            message.error('Hãy tải file lên.');
            return;
        } else if (resumeOption === 'choose' && resume) {
            data.append("resume_path", resume);
        } else if (resumeOption === 'choose' && !resume) {
            if (!resumes.length) {
                message.error('Không có resume đã đăng, hãy quay lại trang Hồ sơ cá nhân để tạo.');
                return;
            }
            data.append("resume_path", resumes[0].file_url);

        }
        data.append("job_id", job_id);
        data.append("cover_letter", coverLetter);
        data.append("candidate_id", candidate?.profile?._id );
        dispatch(applyJob(data));
        handleClose()
    };

    const handleClose = () => {
        onClose();
        setCoverLetter('');
        setResumeOption('upload');
        setResume(null); 
    };
    
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleClose}>X</button>
                <h2>Ứng Tuyển Ngay</h2>
                <div >
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
                                accept=".pdf"
                            />
                        </div>
                    )}
                    {resumeOption === 'choose' && (
                        <div className={styles.formGroup}>
                            <label htmlFor="resumePath">Chọn Resume có sẵn:</label>
                            <select 
                                id="resumePath" 
                                onChange={handleResumePathChange}
                            >
                                {resumes.length > 0 ? (
                                    resumes.map((resume) => (
                                        <option key={resume.id} value={resume.file_url}>
                                            {resume.file_name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Hiện tại không có resume</option>
                                )}
                            </select>
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label htmlFor="coverLetter">Cover Letter:</label>
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
                        loading = {isLoadingSubmitJob}
                        onClick={handleSubmit}
                    >Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default ApplyModal;