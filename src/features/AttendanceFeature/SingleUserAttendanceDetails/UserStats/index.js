import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Spin } from 'antd';
import { getUserAttendanceStatsById } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { getAttendenceByIdSelector } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/selectors';
import { format } from 'date-fns';
import { StyledStatusCard } from './styled';
import qs from 'qs';
import { DatePicker } from 'antd';

const { MonthPicker, YearPicker } = DatePicker;



const UserStats = ({ userId }) => {
    const [stats, setStats] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectedYear, setSelectdYear] = useState(null)
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userStats = useSelector(getAttendenceByIdSelector);

    const statItems = [
        { label: 'Absent ', value: userStats?.absentCount },
        { label: 'Half-Day', value: userStats?.halfCount },
        { label: 'Late ', value: userStats?.lateCount },
        { label: 'Leave', value: userStats?.leave },
        { label: 'Present ', value: userStats?.presentCount },
        { label: 'Total Attendance ', value: userStats?.totalAttendanceCount },
    ];

    const getAttendanceStats = async (month, year) => {
        setLoading(true);
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
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };

    const handleMonthChange = (value) => {
        setSelectedMonth(value)
        setSelectdYear(null)
        const month = format(new Date(value), 'MMM');
        getAttendanceStats(month);
    };

    const handleYearChange = (value) => {
        setSelectdYear(value)
        setSelectedMonth(null)
        const year = format(new Date(value), 'yyyy');
        const month = format(new Date(value), 'MMM');
        getAttendanceStats(month, year);
    };

    useEffect(() => {
        getAttendanceStats();
    }, [userId]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <MonthPicker onChange={handleMonthChange} placeholder="Select month" value={selectedMonth} />
                    <YearPicker onChange={handleYearChange} placeholder='Select Year' value={selectedYear} />
                </div>
            </div>
            <Card title="Attendance Stats" style={{ width: 300, color: '#4154F1' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', height: "133px" }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    statItems?.map((item, index) => (
                        <StyledStatusCard key={index}>
                            <strong>{item?.label}</strong>
                            <p>{item?.value}</p>
                        </StyledStatusCard>
                    ))
                )}
            </Card>
        </div>
    );
};

export default UserStats;
