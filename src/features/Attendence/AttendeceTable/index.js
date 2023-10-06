import React from 'react';
import { Table } from 'antd';
import { MockData } from '../mockData';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Employee ID',
        dataIndex: 'employee_id',
        key: 'employee_id',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];



const AttendanceTable = () => {
    return (
        <Table
            columns={columns}
            dataSource={MockData}
            pagination={false}
        />
    );
};

export default AttendanceTable;
