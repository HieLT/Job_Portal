import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};




const ResultField = () => {
  const jobs = useSelector((state) => state.home.jobs);
  const isJobExpired = (expiryDateString) => {
    const expiryDate = new Date(expiryDateString);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className={styles.resultField}>
      {jobs
        .filter((job) => !isJobExpired(job.expired_at) && job.status === 'Open' && job.is_deleted === false)  
        .map((job) => (
          <Link key={job._id} to={`/job/${job._id}`} className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <p className={styles.jobCompany}>{job.company}</p>
            </div>
            <div className={styles.jobDetails}>
              <p className={styles.jobType}>{job.type}</p>
              <p className={styles.jobDate}>Ngày đăng: {new Date(job.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
              <p className={styles.jobSalary}>Lương: {job.salary}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ResultField;
