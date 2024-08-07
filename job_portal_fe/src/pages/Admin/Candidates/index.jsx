import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Switch, Tooltip, Avatar } from "antd";
import MainLayout from "../../../layouts/MainLayout";
import { setTitlePage } from "../../../states/modules/app";
import { getAllCandidate, deleteCandidate, restoreCandidate } from "../../../api/admin";
import CandidateDetail from "./Components/CandidateDetail/index";
import styles from './styles.module.scss';
import './styles.scss'

const AdminCandidates = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state) => state.admin.allCandidate);
    const [status, setStatus] = useState({});
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        dispatch(setTitlePage('Danh sách ứng viên'));
        dispatch(getAllCandidate());
    }, [dispatch]);

    useEffect(() => {
        if (candidates) {
            const initialStatus = candidates.reduce((acc, candidate) => {
                acc[candidate._id] = candidate.is_deleted || false;
                return acc;
            }, {});
            setStatus(initialStatus);
        }
    }, [candidates]);

    const handleSeeDetail = (candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleCloseModal = () => {
        setSelectedCandidate(null);
    };

    const handleChangeStatus = async (id) => {
        if (status[id] === false) {
            await dispatch(deleteCandidate(id));
        } else if (status[id] === true) {
            await dispatch(restoreCandidate(id));
        }
        dispatch(getAllCandidate());
    };

    const getTooltipText = (id) => {
        return status[id] === false ? 'Nhấn để xóa' : 'Nhấn để khôi phục';
    };

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.cardList}>
                    {candidates.map(candidate => (
                        <Card
                            key={candidate._id}
                            className={`${styles.card} customCardActions`}
                            hoverable
                            cover={
                                <Avatar src={candidate.avatar} size={60} className={styles.avatar} />
                            }
                            actions={[
                                <Button 
                                    type="primary" 
                                    className={styles.button} 
                                    onClick={() => handleSeeDetail(candidate)}
                                >
                                    Chi tiết
                                </Button>,
                                <Tooltip title={getTooltipText(candidate._id)} key="status-toggle">
                                    <Switch
                                        checked={!status[candidate._id]}
                                        onChange={() => handleChangeStatus(candidate._id)}
                                    />
                                </Tooltip>
                            ]}
                        >
                            <Card.Meta
                                title={`${candidate.first_name} ${candidate.last_name}`}
                                description={
                                    <>
                                        <p>{candidate.email}</p>
                                        <p>Liên lạc: {candidate.phone}</p>
                                        <p>Sinh nhật: {new Date(candidate.birth).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                    </>
                                }
                            />
                        </Card>
                    ))}
                </div>
                {selectedCandidate && (
                    <CandidateDetail
                        isOpen={selectedCandidate}
                        candidate={selectedCandidate}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default AdminCandidates;
