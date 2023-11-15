import React from 'react';
import { Bar } from 'react-chartjs-2';

const attendanceData = {
    present: [
        120,  // January
        140,  // February
        160,  // March
        180,  // April
        200,  // May
        220,  // June
        240,  // July
        260,  // August
        280,  // September
        300,  // October
        280,  // November
        260,  // December
    ],
    leave: [
        10,   // January
        15,   // February
        8,    // March
        5,    // April
        12,   // May
        18,   // June
        20,   // July
        8,    // August
        5,    // September
        3,    // October
        5,    // November
        7,    // December
    ],
};



const ReportChart = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Present',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: attendanceData.present, // Array of present data for each month
            },
            {
                label: 'Leave',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: attendanceData.leave, // Array of leave data for each month
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Annual Attendance Report</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ReportChart;
