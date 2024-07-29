import React, {useEffect} from "react";
import './styles.scss'
import MainLayout from "../../../layouts/MainLayout/index.jsx";
import {useDispatch} from "react-redux";
import {setBreadcrumb, setTitlePage} from "../../../states/modules/app/index.js";

export default function CompanyDashboard() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTitlePage('Tổng quan'))
        dispatch(setBreadcrumb([]))
    }, [])

    return <MainLayout>

    </MainLayout>
}
