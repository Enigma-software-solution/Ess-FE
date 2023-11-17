import React from 'react';
import ViewUserAttendenceGraph from './ViewUserGraph';
import { useParams } from 'react-router-dom';
import SingleUserAttendanceDetails from './SingleUserAttendanceDetails';
import { StyledDetailsStats, StyledDetailsTable } from './styled';
import UserStats from './UserStats';
import { Divider } from 'antd';

const AttendenceDetails = () => {

    let { id } = useParams();

    return (
        <>
            <h4 style={{ color: '#4154F1', marginBottom: '10px' }}>Reports</h4>
            <StyledDetailsStats>
                <UserStats userId={id} />
                <ViewUserAttendenceGraph />
            </StyledDetailsStats>
            <Divider />
            <StyledDetailsTable> <SingleUserAttendanceDetails userId={id} /></StyledDetailsTable>
        </>
    );
};

export default AttendenceDetails;
