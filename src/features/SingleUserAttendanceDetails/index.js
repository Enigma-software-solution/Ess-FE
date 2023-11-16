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
