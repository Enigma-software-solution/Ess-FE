import React from 'react';
import { Table } from 'antd';

const PresentEmployeesTable = ({ presentEmployees }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    return (
        <div>
            <h2>Present Employees</h2>
            <Table columns={columns} dataSource={presentEmployees} rowKey="id" />
        </div>
    );
};

export default PresentEmployeesTable;
