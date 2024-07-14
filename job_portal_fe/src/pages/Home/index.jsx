import React from "react";
import MainLayout from "../../layouts/MainLayout/index.jsx";

function Home() {
    const dataChart = {
        labels: ["Buổi 1", "Buổi 2", "Buổi 3", "Buổi 4", "Buổi 5", 'Buổi 6', 'Buổi 7', 'Buổi 8', 'Buổi 9', 'Buổi 10', 'Buổi 11', 'Buổi 12'],
        datasets: [
            {
                type: 'bar',
                label: "Đi đủ",
                data: [30, 25, 28, 30, 22, 20, 26],
                borderColor: "rgb(120, 80, 0, 0.8)",
                backgroundColor: "rgba(128,239,131,0.7)",
            },
            {
                type: 'bar',
                label: "Đi muộn",
                data: [0, 5, 0, 0, 4, 8, 4],
                borderColor: "rgba(0,189,70,0.8)",
                backgroundColor: "rgba(60,179,255,0.79)",
            },
            {
                type: 'bar',
                label: "Vắng mặt",
                data: [0, 0, 2, 0, 4, 2, 2],
                borderColor: "rgba(0,189,70,0.8)",
                backgroundColor: "rgba(253,160,160,0.64)",
            }
        ],
    }

    const dataLineChart = {
        labels: ["1", "2", "3", "4", "5", '6', '7'],
        datasets: [
            {
                label: 'My First 1',
                data: [0, 12, 22, 32, 45, 60, 52],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.31)",
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3
            },
            {
                label: 'My First 2',
                data: [5, 15, 32, 22, 45, 70, 50],
                fill: true,
                backgroundColor: "rgba(208,20,166,0.26)",
                borderColor: 'rgb(208,20,166)',
                tension: 0.3
            },
            {
                label: 'My First 3',
                data: [23, 34, 44, 54, 79, 55, 40],
                fill: true,
                backgroundColor: "rgba(13,120,232,0.29)",
                borderColor: 'rgb(13,120,232)',
                tension: 0.3
            }
        ]
    };

    const dataDoughnutChart = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255,99,132,0.92)',
                    'rgba(54,162,235,0.94)',
                    'rgba(255,206,86,0.94)',
                    'rgba(75,192,192,0.94)',
                    'rgba(153,102,255,0.96)',
                    'rgba(255,159,64,0.95)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        plugins: {
            title: {
                display: true,
                text: 'Biểu đồ tổng hợp EP tài khoản',
            }
        },
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            },
        },
    }

    return (
        <MainLayout>

        </MainLayout>
    );
}

export default Home;
