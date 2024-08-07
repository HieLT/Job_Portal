import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setTitlePage } from '../../../states/modules/app';
import { getJobAdmin } from "../../../api/admin";
import MainLayout from "../../../layouts/MainLayout";
import JobDetail from "./Components/JobDetail/index";
import styles from "./styles.module.scss";

const { Paragraph } = Typography;

const AdminPostedJobs = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.admin.jobs);
    const currentPage = useSelector((state) => state.admin.page);
    const totalPages = useSelector((state) => state.admin.totalPages);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        dispatch(setTitlePage('Danh sách công việc'));
        dispatch(getJobAdmin(1));
    }, [dispatch]);

    const handleSeeDetail = (job) => {
        setSelectedJob(job);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    const handlePageChange = async (newPage) => {
        await dispatch(getJobAdmin(newPage))
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    
    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.barContainer}>
                    {jobs?.length> 0 ? jobs.map(job => (
                        <Card
                            key={job._id}
                            title={job.title}
                            extra={<Button onClick={() => handleSeeDetail(job)} type="link" className={styles.buttonLink}>Chi tiết</Button>}
                            className={styles.card}
                        >
                            <Paragraph className={styles.paragraph}>
                                <strong>Công ty:</strong> {job.company_id.name}
                            </Paragraph>
                            <Paragraph className={styles.paragraph}>
                                <strong>Công Việc:</strong> {job.category_id.name}
                            </Paragraph>
                            <Paragraph className={styles.paragraph}>
                                <strong>Ngày đăng:</strong> {new Date(job.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </Paragraph>
                            <Paragraph className={styles.paragraph}>
                                <strong>Ngày hết hạn:</strong> {new Date(job.expired_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </Paragraph>
                            <Paragraph className={styles.paragraph}>
                                <strong>Trạng thái:</strong> {job.status}
                            </Paragraph>
                        </Card>
                    )) : (<Paragraph>Không có công việc nào hiện tại được đăng lên</Paragraph>)}
                    <div className='flex items-center justify-center mt-5'>
                        {jobs?.length > 0 ? (
                            <div className='flex items-center justify-center mt-5'>
                                <Pagination
                                    current={currentPage}
                                    total={totalPages * 10}
                                    onChange={handlePageChange}
                                    pageSize={10}
                                />
                            </div>
                        ) : ''}
                    </div>
                </div>
                {selectedJob && (
                    <JobDetail
                        isOpen={selectedJob}
                        job={selectedJob}
                        onClose={handleCloseModal}
                        className={styles.modal}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default AdminPostedJobs;
