import React, { useState } from 'react';
import { Table, Space, DatePicker, Button, Flex } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

const StyledPage = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const ExportButton = styled(Button)`
  margin-bottom: 10px;
`;

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Employee Name',
        dataIndex: 'employeeName',
        key: 'employeeName',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a href="#">View Details</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        date: '2023-01-01',
        employeeName: 'John Doe',
        status: 'Present',
    },
    // Add more data as needed
];

const AttendanceReport = () => {
    const [exportData, setExportData] = useState([]);

    const handleExport = () => {
        const csvData = data.map(item => ({
            date: item.date,
            employeeName: item.employeeName,
            status: item.status,
        }));

        setExportData(csvData);
    };

    return (
        <StyledPage>
            <h1>Attendance Report</h1>
            <Flex justify='space-between'>

                <RangePicker style={{ marginBottom: '20px' }} />



                <CSVLink data={exportData} headers={columns} filename={'attendance-report.csv'}>
                    <ExportButton type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                        Export to CSV
                    </ExportButton>
                </CSVLink>
            </Flex>

            <Table columns={columns} dataSource={data} />
        </StyledPage>
    );
};

export default AttendanceReport;
