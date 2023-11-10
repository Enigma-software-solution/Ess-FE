import React from 'react';
import { Row } from 'antd';
import { StyledGraphColumn, StyledGraphRow, StyledUserColumn } from './styled';
import ViewUser from './ViewUser';
import ViewUserAttendenceGraph from './ViewUserGraph';

const AttendenceDetails = ({ employeeDetails }) => {

    return (
        <div style={{ cursor: 'pointer' }}>
            <StyledGraphRow gutter={8} >
                <StyledUserColumn span={6}><ViewUser /></StyledUserColumn>
                <StyledGraphColumn span={17}><ViewUserAttendenceGraph /></StyledGraphColumn>
            </StyledGraphRow>
        </div>
    );
};

export default AttendenceDetails;
