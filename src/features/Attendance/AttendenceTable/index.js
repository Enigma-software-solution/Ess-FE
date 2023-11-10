import React, { useState } from 'react';
import { Table } from 'antd';
import { StyledBox, StyledButton, StyledHeading } from './styled';
import AttendenceDetails from '../AttendenceDetails';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/constant/routes';

const PresentEmployeesTable = ({ presentEmployees }) => {
    const navigate = useNavigate();


    const [selectedEmployee, setSelectedEmployee] = useState(null);


    const handleRowClick = (record) => {
        navigate(`${routes.USER_ATTENDANCE_DETAILS}/${record._id}`);
    };

    const columns = [
        {
            title: <span style={{ color: '#A7ACB2' }}>Name</span>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <span style={{ color: '#A7ACB2' }}>checkInTime</span>,
            dataIndex: 'checkInTime',
        },
        {
            title: <span style={{ color: '#A7ACB2' }}>Status</span>,
            dataIndex: 'status',
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
                <AttendenceDetails employeeDetails={selectedEmployee} />
            )}
        </StyledBox>
    );
};

export default PresentEmployeesTable;
