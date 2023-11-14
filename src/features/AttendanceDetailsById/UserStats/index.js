import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Table } from 'antd';
import { getUserAttendanceStatsById } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { getAttendenceByIdSelector } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/selectors';
import { format } from 'date-fns';
import { StyledStatsTable } from './styled';
import qs from 'qs';
import { DatePicker } from 'antd';

const { MonthPicker, YearPicker } = DatePicker;


const columns = [
    {
        title: 'Absent Count',
        dataIndex: 'absentCount',
        key: 'absentCount',
    },
    {
        title: 'Half Count',
        dataIndex: 'halfCount',
        key: 'halfCount',
    },
    {
        title: 'Late Count',
        dataIndex: 'lateCount',
        key: 'lateCount',
    },
    {
        title: 'Leave',
        dataIndex: 'leave',
        key: 'leave',
    },
    {
        title: 'Present Count',
        dataIndex: 'presentCount',
        key: 'presentCount',
    },
    {
        title: 'Total Attendance Count',
        dataIndex: 'totalAttendanceCount',
        key: 'totalAttendanceCount',
    },
];

const UserStats = ({ userId }) => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const userStats = useSelector(getAttendenceByIdSelector);

    const getAttendanceStats = async (month, year) => {
        const params = qs.stringify({
            month: month,
            year: year,
        });

        const data = {
            userId,
            params,
        }

        try {
            const res = await dispatch(getUserAttendanceStatsById(data))
            setStats(userStats)
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleMonthChange = (value) => {
        const month = format(new Date(value), 'MMM');
        getAttendanceStats(month);
    };

    const handleYearChange = (value) => {
        const year = format(new Date(value), 'yyyy');
        const month = format(new Date(value), 'MMM');
        getAttendanceStats(month, year);
    };

    useEffect(() => {
        getAttendanceStats();
    }, [userId]);

    const data = [userStats];

    return (
        <StyledStatsTable>
            <h2>Attendance Stats</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <MonthPicker onChange={handleMonthChange} placeholder="Select month" />
                    <YearPicker onChange={handleYearChange} placeholder='Select Year' />
                </div>

            </div>
            {isLoading ? <Spin size="large" /> : <Table columns={columns} dataSource={data} pagination={false} rowKey={(record) => record.id} />}

        </StyledStatsTable>
    );
};

export default UserStats;
