import React from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";

const AdminPostedJobs = () => {
    const jobs = [
        {
            id: 1,
            title: 'Software Engineer',
            description: 'Develop and maintain web applications.',
            datePosted: '2024-07-01',
        },
        {
            id: 2,
            title: 'Project Manager',
            description: 'Oversee project development and ensure timely delivery.',
            datePosted: '2024-06-25',
        },
        {
            id: 3,
            title: 'Data Analyst',
            description: 'Analyze data and provide insights to the team.',
            datePosted: '2024-07-10',
        },
    ];

    return (
        <MainLayout>
            <div className={styles.container}>
                <h1 className={styles.title}>Job Listings</h1>
                <div className={styles.grid}>
                    {jobs.map(job => (
                        <div key={job.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{job.title}</h2>
                                <p className={styles.cardSubtitle}>{job.description}</p>
                                <p className={styles.cardDate}>Posted on {new Date(job.datePosted).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </MainLayout>
    );
};

export default AdminPostedJobs;
