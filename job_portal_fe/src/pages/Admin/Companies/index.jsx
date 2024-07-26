import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { getAllCompany } from "../../../api/admin";
import { setTitlePage } from '../../../states/modules/app/index.js';
import { useSelector, useDispatch } from "react-redux";

const AdminCompanies = () => {
    const dispatch = useDispatch(); 
    const companies = useSelector((state) => state.admin.allCompany);
    const [status, setStatus] = useState({});

    useEffect(() => {
        dispatch(setTitlePage('Danh sách công ty'));
        dispatch(getAllCompany());
    }, [dispatch]);

    const handleSeeDetail = (id) => {
        // Logic for seeing detail
        console.log(`See details for company id: ${id}`);
    };

    const handleChangeStatus = (id) => {
        // Toggle status
        setStatus(prevStatus => ({
            ...prevStatus,
            [id]: !prevStatus[id]
        }));
        console.log(`Change status for company id: ${id}`);
    };

    const handleDelete = (id) => {
        // Logic for deleting a company
        console.log(`Delete company id: ${id}`);
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
                                    <p className={styles.barDate}>Founded on {new Date(company.founded_year).toLocaleDateString()}</p>
                                    <a href={company.website_url} target="_blank" rel="noopener noreferrer" className={styles.barWebsite}>
                                        Visit Website
                                    </a>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <button onClick={() => handleSeeDetail(company._id)} className={styles.button}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm0 17.9c-4.14 0-7.72-3.28-9.13-7.9 1.41-4.62 5-7.9 9.13-7.9 4.14 0 7.72 3.28 9.13 7.9-1.41 4.62-5 7.9-9.13 7.9zm-1-5.9h2V7h-2v7zm0 4h2v-2h-2v2z"/>
                                        </svg>
                                        Chi tiết
                                    </button>
                                    <button onClick={() => handleChangeStatus(company._id)} className={`${styles.button} ${status[company._id] ? styles.green : styles.red}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm3.5 11h-2.75v5H9.75v-5H7.5l4.5-6 4.5 6z"/>
                                        </svg>
                                        Trạng thái
                                    </button>
                                    <button onClick={() => handleDelete(company._id)} className={styles.button}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 2V1H10V2H14V3H2V2H6ZM3 4V13C3 14.105 3.895 15 5 15H11C12.105 15 13 14.105 13 13V4H3Z"/>
                                        </svg>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminCompanies;
