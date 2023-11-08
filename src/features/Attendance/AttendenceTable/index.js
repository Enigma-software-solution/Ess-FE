import React, { useState } from 'react';
import { Table } from 'antd';
import { StyledBox, StyledButton, StyledHeading } from './styled';
import AttendenceDetails from '../AttendenceDetails';

const PresentEmployeesTable = ({ presentEmployees }) => {

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);


    const handleRowClick = (record) => {
        setSelectedEmployee(record); 
        setIsDetailsDrawerOpen(true);
    };

    const columns = [
        {
            title: <span style={{ color: '#A7ACB2' }}>Name</span>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <span style={{ color: '#A7ACB2' }}>Employee Name</span>,
            dataIndex: 'Employee Name',
        },
        {
            title: <span style={{ color: '#A7ACB2' }}>Department</span>,
            dataIndex: 'Department',
        },
        {
            title: <span style={{ color: '#A7ACB2' }}>Details</span>,
            dataIndex: 'Details',
            render: (text, record) => (
                <div className='d-flex gap-1'>
                    <StyledButton onClick={() => setSelectedEmployee(record)}>
                        View
                    </StyledButton>
                </div>
            )
        },

    ];

    return (
        <StyledBox>
            <StyledHeading>Attendance List</StyledHeading>
            <Table columns={columns} dataSource={presentEmployees} rowKey="id"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />

            {selectedEmployee && (
                <AttendenceDetails employeeDetails={selectedEmployee} isOpen={isDetailsDrawerOpen} handleDetailsDrawer={() => setIsDetailsDrawerOpen(false)} />
            )}
        </StyledBox>
    );
};

export default PresentEmployeesTable;
