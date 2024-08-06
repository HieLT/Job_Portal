import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const isJobExpired = (expiryDateString) => {
  const expiryDate = new Date(expiryDateString);
  const today = new Date();
  return isNaN(expiryDate.getTime()) || expiryDate < today;
}

const ResultField = (props) => {
  const { jobs } = props;

  const filteredJobs = jobs.filter(
    (job) => !isJobExpired(job.expired_at) && job.status === 'Open' && !job.is_deleted
  );

  return (
    <div className={styles.resultField}>
      {filteredJobs.length === 0 ? (
        <p className={styles.noJobsMessage}>No jobs available</p>
      ) : (
        filteredJobs.map((job) => (
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
        ))
      )}
    </div>
  );
};

export default ResultField;
