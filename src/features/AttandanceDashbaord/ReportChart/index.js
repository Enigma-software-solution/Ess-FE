import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { useDispatch } from 'react-redux';
import { getYearlyStatsApi } from 'src/store/slices/attendanceSlice/AllStatsSlice/api';
import qs from 'qs'
import { format } from 'date-fns';



const BarChart = () => {

    const [allStats, setAllStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.log(allStats, 's    ')

    const dispatch = useDispatch()


    const getYearlylStats = async () => {
        const queryParams = qs.stringify({
            year: format(new Date(), 'yyyy'),
        });

        try {
            const res = await dispatch(getYearlyStatsApi(queryParams)).unwrap();
            setAllStats(res?.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getYearlylStats();
    }, []);

    if (isLoading || !allStats) {
        return <div>Loading...</div>;
    }

    const months = allStats ? Object.keys(allStats) : [];


    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Leave',
                data: months.map((month) => allStats?.[month].leave),
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
            {
                label: 'Absent',
                data: months.map((month) => allStats?.[month].absent),
                backgroundColor: 'rgba(255,99,132,0.6)',
            },
            {
                label: 'Half Day',
                data: months.map((month) => allStats?.[month].halfDay),
                backgroundColor: 'rgba(255,205,86,0.6)',
            },
            {
                label: 'Present',
                data: months.map((month) => allStats?.[month].present),
                backgroundColor: 'rgba(54,162,235,0.6)',
            },
            {
                label: 'Total',
                data: months.map((month) => allStats?.[month].total),
                backgroundColor: 'rgba(153,102,255,0.6)',
            },
        ],
    };

    const chartOptions = {

    };




    return (
        <div style={{ boxShadow: '4px 2px 20px -7px  rgba(0,0,0,0.2)', marginTop: '40px', padding: '20px' }}>
            <h5 style={{ color: '#4154F1', marginBottom: '10px' }}>
                Yearly Reports
            </h5>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};


export default BarChart;