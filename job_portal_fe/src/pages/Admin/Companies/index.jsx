import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { getAllCompany } from "../../../api/admin";
import { setBreadcrumb } from '../../../states/modules/app/index.js';
import { useSelector, useDispatch } from "react-redux";

const AdminCompanies = () => {
    const dispatch = useDispatch(); 
    const companies = useSelector((state) => state.admin.allCompany);
    console.log(companies);

    useEffect(() => {
        dispatch(setBreadcrumb({
            breadcrumb: 'Danh sách công ty'
        }));
        dispatch(getAllCompany());
    }, [dispatch]);

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.barContainer}>
                    {companies.map((company) => (
                        <div key={company._id} className={styles.bar}>
                            <div className={styles.barContent}>
                                <img src={company.logo} alt={company.name} className={styles.barLogo} />
                                <h2 className={styles.barTitle}>{company.name}</h2>
                                <p className={styles.barDescription}>{company.email}</p>
                                <p className={styles.barDate}>Founded on {new Date(company.founded_year).toLocaleDateString()}</p>
                                <a href={company.website_url} target="_blank" rel="noopener noreferrer" className={styles.barWebsite}>
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminCompanies;
