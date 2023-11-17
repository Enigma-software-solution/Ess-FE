import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { useDispatch } from 'react-redux';
import { getYearlyStatsApi } from 'src/store/slices/attendanceSlice/AllStatsSlice/api';
import qs from 'qs'
import { format } from 'date-fns';
import { DatePicker, Flex } from 'antd';
import dayjs from 'dayjs';
import { AttendanceStatusColor } from 'src/constant/colors';



const BarChart = () => {

    const [allStats, setAllStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.log(allStats, 's    ')

    const dispatch = useDispatch()


    const getYearlylStats = async (year = new Date()) => {
        const queryParams = qs.stringify({
            year: format(new Date(year), 'yyyy'),
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


    const getStatusColor = (status) => {
        switch (status) {
            case 'present':
                return AttendanceStatusColor.Present;
            case 'absent':
                return AttendanceStatusColor.Absent;
            case 'leave':
                return AttendanceStatusColor.Leave;
            case 'vacation':
                return AttendanceStatusColor.Vacation;
            case 'late':
                return AttendanceStatusColor.Late;
            case 'half-day':
                return AttendanceStatusColor.HalfDay;
            default:
                return '#000';
        }
    };

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Leave',
                data: months.map((month) => allStats?.[month].leave),
                backgroundColor: AttendanceStatusColor.Leave
            },
            {
                label: 'Absent',
                data: months.map((month) => allStats?.[month].absent),
                backgroundColor: AttendanceStatusColor.Absent
            },
            {
                label: 'Half Day',
                data: months.map((month) => allStats?.[month].halfDay),
                backgroundColor: AttendanceStatusColor.HalfDay
            },
            {
                label: 'Present',
                data: months.map((month) => allStats?.[month].present),
                backgroundColor: AttendanceStatusColor.Present
            },
            {
                label: 'Total',
                data: months.map((month) => allStats?.[month].total),
                backgroundColor: 'rgba(153,102,255,0.6)',
            },
        ],
    };



    const handleYearlyReports = (e) => {
        getYearlylStats(e)
    }




    return (
        <div style={{ boxShadow: '4px 2px 20px -7px  rgba(0,0,0,0.2)', marginTop: '40px', padding: '20px' }}>
            <Flex justify='space-between' align='center' className='mb-2'>
                <h5 style={{ color: '#4154F1', marginBottom: '10px' }}>
                    Yearly Reports
                </h5>

                <DatePicker picker='year' onChange={handleYearlyReports} allowClear={false} defaultValue={dayjs()} />
            </Flex>
            <Bar data={chartData} />
        </div>
    );
};


export default BarChart;