import React from 'react';
import { Drawer } from 'antd';
import { StyledColumn, StyledGraphRow, StyledUserColumn } from './styled';
import ViewUser from './ViewUser';
import ViewUserAttendenceGraph from './ViewUserGraph';

const AttendenceDetails = ({ isOpen, handleDetailsDrawer, employeeDetails }) => {

    return (
        <Drawer
            title="Attendence Details"
            placement="right"
            closable={true}
            onClose={handleDetailsDrawer}
            open={isOpen}
            width={1000}
        >

            {employeeDetails && employeeDetails.name && (
                <>
                    <StyledGraphRow gutter={8}>
                        <StyledUserColumn span={6}><ViewUser /></StyledUserColumn>
                        <StyledColumn span={17}><ViewUserAttendenceGraph /></StyledColumn>
                    </StyledGraphRow>

                    {/* <StyledDetailsRow gutter={8}>
                        <StyledColumn span={6}>col-6</StyledColumn>
                        <StyledColumn span={6}>col-6</StyledColumn>
                    </StyledDetailsRow> */}
                </>
            )}
        </Drawer>
    );
};

export default AttendenceDetails;
