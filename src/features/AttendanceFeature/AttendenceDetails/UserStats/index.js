import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { getUserAttendanceStatsById } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { getAttendenceByIdSelector } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/selectors';
import { StyledStatusCard } from './styled';

const UserStats = ({ userId }) => {
    const dispatch = useDispatch();
    const userStats = useSelector(getAttendenceByIdSelector);

    useEffect(() => {
        dispatch(getUserAttendanceStatsById(userId));
    }, ); 

    const statItems = [
        { label: 'Absent ', value: userStats?.absentCount },
        { label: 'Half-Day', value: userStats?.halfCount },
        { label: 'Late ', value: userStats?.lateCount },
        { label: 'Leave', value: userStats?.leave },
        { label: 'Present ', value: userStats?.presentCount },
        { label: 'Total Attendance ', value: userStats?.totalAttendanceCount },
    ];

    return (
        <Card title="Attendance Stats" style={{ width: 300 }}>
            {statItems.map((item, index) => (
                <StyledStatusCard key={index}>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                </StyledStatusCard>
            ))}
        </Card>
    );
};

export default UserStats;
