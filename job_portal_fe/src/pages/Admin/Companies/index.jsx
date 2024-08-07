import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import  "./styles.scss";
import MainLayout from "../../../layouts/MainLayout";
import { getAllCompany } from "../../../api/admin";
import { setTitlePage } from '../../../states/modules/app/index.js';
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Switch, Tooltip, Avatar } from "antd";
import CompanyDetail from "./Components/CompanyDetail/index";
import { deleteCompany, restoreCompany } from "../../../api/admin";

const AdminCompanies = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.admin.allCompany);
    const [status, setStatus] = useState({});
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        dispatch(setTitlePage('Danh sách công ty'));
        dispatch(getAllCompany());
    }, [dispatch]);

    useEffect(() => {
        if (companies) {
            const initialStatus = companies.reduce((acc, company) => {
                acc[company._id] = company.is_deleted || false;
                return acc;
            }, {});
            setStatus(initialStatus);
        }
    }, [companies]);

    const handleSeeDetail = (company) => {
        setSelectedCompany(company);
    };

    const handleCloseModal = () => {
        setSelectedCompany(null);
    };

    const handleChangeStatus = async (id) => {
        if (status[id] === false) {
            await dispatch(deleteCompany(id));
            dispatch(getAllCompany());
        } else if (status[id] === true) {
            await dispatch(restoreCompany(id));
            dispatch(getAllCompany());
        }
    };

    const getTooltipText = (id) => {
        return status[id] === false ? 'Nhấn để xóa' : 'Nhấn để khôi phục';
    };

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.cardList}>
                    {companies.map(company => (
                        <Card
                            key={company._id}
                            className={`${styles.card} customCardActions`}
                            hoverable
                            cover={
                                <Avatar src={company?.logo} size={60} className={styles.avatar} />
                            }
                            actions={[
                                <Button 
                                    type="primary" 
                                    className={styles.button} 
                                    onClick={() => handleSeeDetail(company)}
                                >
                                    Chi tiết
                                </Button>,
                                <Tooltip title={getTooltipText(company._id)} key="status-toggle">
                                    <Switch
                                        checked={!status[company._id]}
                                        onChange={() => handleChangeStatus(company._id)}
                                    />
                                </Tooltip>
                            ]}
                        >
                            <Card.Meta
                                title={`${company.name}`}
                                description={
                                    <>
                                        <p>{company?.email}</p>
                                        <p>Ngày Thành Lập: {new Date(company?.founded_year).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                        <p>Website: {company?.website_url}</p>
                                    </>
                                }
                            />
                        </Card>
                    ))}
                </div>
                {selectedCompany && (
                    <CompanyDetail
                        isOpen={selectedCompany}
                        company={selectedCompany}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default AdminCompanies;
