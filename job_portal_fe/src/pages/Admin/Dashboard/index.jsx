import React, { useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import MainLayout from "../../../layouts/MainLayout/index.jsx";
import Card from './Components/Card/index.jsx';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBreadcrumb } from '../../../states/modules/app/index.js';

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Revenue',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
    ],
};

function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumb({
            breadcrumb: 'Dashboard'
        }));
    }, []);
    const title = useSelector((state) => state.app.breadcrumb)
    console.log(title);

    return (
        <MainLayout>
            <div className={styles.dashboard}>
                <div className={styles['card-container']}>
                    <div className={styles.card}>
                        <Card />
                    </div>
                    <div className={styles.card}>
                        <Card />
                    </div>
                    <div className={styles.card}>
                        <Card />
                    </div>
                    <div className={styles.card}>
                        <h2 className={styles['card-title']}>Bar Chart</h2>
                        <Bar data={barData} />
                    </div>
                    <div className={styles.card}>
                        <h2 className={styles['card-title']}>Line Chart</h2>
                        <Line data={lineData} />
                    </div>
                    <div className={styles.card}>
                        <h2 className={styles['card-title']}>Pie Chart</h2>
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard;
