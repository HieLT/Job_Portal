import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
const ResultField = () => {

  const jobs = useSelector((state) => state.home.jobs);

  return (
    <div className={styles.resultField}>
      {jobs.map((job) => (
        <div key={job._id} className={styles.jobCard}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobCompany}>{job.company}</p>
          </div>
          <div className={styles.jobDetails}>
            <p className={styles.jobType}>{job.type}</p>
            <p className={styles.jobSalary}>Lương: {job.salary}</p>
            <p className={styles.jobDescription}>{job.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultField;
