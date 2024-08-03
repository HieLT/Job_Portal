import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { getAllCompany } from "../../../api/admin";
import { setTitlePage } from '../../../states/modules/app/index.js';
import { useSelector, useDispatch } from "react-redux";
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
                <div className={styles.barContainer}>
                    {companies.map((company) => (
                        <div key={company._id} className={styles.bar}>
                            <div className={styles.barContent}>
                                <img src={company.logo} alt={company.name} className={styles.barLogo} />
                                <div className={styles.barInfo}>
                                    <h2 className={styles.barTitle}>{company.name}</h2>
                                    <p className={styles.barDescription}>{company.email}</p>
                                    <p className={styles.barDate}>Ngày thành lập: {new Date(company.founded_year).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                    <a href={company.website_url} target="_blank" rel="noopener noreferrer" className={styles.barWebsite}>
                                        Visit Website
                                    </a>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <button onClick={() => handleSeeDetail(company)} className={styles.button}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm0 17.9c-4.14 0-7.72-3.28-9.13-7.9 1.41-4.62 5-7.9 9.13-7.9 4.14 0 7.72 3.28 9.13 7.9-1.41 4.62-5 7.9-9.13 7.9zm-1-5.9h2V7h-2v7zm0 4h2v-2h-2v2z" />
                                        </svg>
                                        Chi tiết
                                    </button>
                                    <div className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            id={`status-toggle-${company._id}`}
                                            checked={!status[company._id]}
                                            onChange={() => handleChangeStatus(company._id)}
                                        />
                                        <label htmlFor={`status-toggle-${company._id}`} className={styles.slider}></label>
                                        <div className={styles.tooltip}>
                                            {getTooltipText(company._id)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
