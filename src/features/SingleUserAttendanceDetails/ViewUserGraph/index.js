import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { StyledGraph } from './styled';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Full Month Chart',
        },
    },
};

const labels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];

const attendanceData = {
    labels,
    datasets: [
        {
            label: 'Present',
            data: [12, 9, 8, 10, 8, 9, 10, 8, 9, 8, 10, 8, 9, 10, 8, 9, 8, 10, 8, 9, 10, 8, 9, 8, 10, 8, 9, 10, 8, 9, 10],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
            label: 'Absent',
            data: [2, 1, 2, 0, 2, 1, 0, 2, 1, 2, 0, 2, 1, 0, 2, 1, 2, 0, 2, 1, 0, 2, 1, 2, 0, 2, 1, 0, 2, 1, 0],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Late',
            data: [1, 0, 1, 2, 0, 1, 2, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1],
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
        },
    ],
};

const ViewUserAttendanceGraph = () => {
    return (
        <StyledGraph >
            <Bar options={options} data={attendanceData} width={"500px"} height={"300px"} />
        </StyledGraph>
    );
};

export default ViewUserAttendanceGraph;
