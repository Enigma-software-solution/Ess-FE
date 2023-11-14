import React from 'react';
import ViewUserAttendenceGraph from './ViewUserGraph';
import { useParams } from 'react-router-dom';
import SingleUserAttendanceDetails from './SingleUserAttendanceDetails';
import { StyledDetails, StyledDetailsTable } from './styled';
import UserStats from './UserStats';
import { Divider } from 'antd';

const AttendenceDetails = () => {

    let { id } = useParams();

    return (
        <StyledDetails>
            <StyledDetailsTable> <SingleUserAttendanceDetails userId={id} /></StyledDetailsTable>

            <Divider />

            <UserStats userId={id} />
            <Divider />
            <ViewUserAttendenceGraph />
        </StyledDetails>
    );
};

export default AttendenceDetails;
