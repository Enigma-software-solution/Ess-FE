import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { getUserAttendanceStatsById } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { getAttendenceByIdSelector } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/selectors';
import { StyledStatsTable } from './styled';

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
    const dispatch = useDispatch();

    const userStats = useSelector(getAttendenceByIdSelector);

    useEffect(() => {
        dispatch(getUserAttendanceStatsById(userId));
    }, []);

    const data = [userStats];

    return (
        <StyledStatsTable>
            <h2>Attendance Stats</h2>
            <Table columns={columns} dataSource={data} pagination={false} rowKey={(record) => record.id} />
        </StyledStatsTable>
    );
};

export default UserStats;
