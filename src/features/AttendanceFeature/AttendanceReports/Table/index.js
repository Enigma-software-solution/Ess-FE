import React, { useState } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { format } from 'date-fns';
import { CheckAttendanceStatusColor } from 'src/components/Utils/checkAttendanceStatusColor';
import { StyledTable } from './styled';

const AttendanceHistory = ({ reports, isLoading }) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const handleExpand = (expanded, record) => {
        const keys = expanded ? [record.employeeName] : [];
        setExpandedRowKeys(keys);
    };
    const groupedReports = reports?.reduce((acc, report) => {
        const fullName = `${report?.user.first_name} ${report?.user.last_name}`;
        if (!acc[fullName]) {
            acc[fullName] = [];
        }
        acc[fullName].push(report);
        return acc;
    }, {});
    const groupedData = Object.keys(groupedReports).map((name) => ({
        key: name,
        employeeName: name,
        attendanceRecords: groupedReports[name],
    }));
    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                render: (text, record) => (text ? format(new Date(text), 'dd MMM yyyy') : 'N/A'),

            },
            {
                title: 'Check In',
                dataIndex: 'checkInTime',
                render: (text, record) => (text ? format(new Date(text), 'p') : 'N/A'),

            },
            {
                title: 'Check Out',
                dataIndex: 'checkOutTime',
                render: (text, record) => (text ? format(new Date(text), 'p') : 'N/A'),

            },
            {
                title: 'Notes',
                dataIndex: 'notes',
                ellipsis: true,
                render: (text, record) => (
                    <Tooltip title={text} placement="topLeft" arrowPointAtCenter>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {text}
                        </div>
                    </Tooltip>
                ),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (text) => {
                    return (
                        <Tag color={CheckAttendanceStatusColor(text)}>{text}</Tag>
                    );
                },
            },
        ];
        return (
            <Table
                columns={columns}
                dataSource={record?.attendanceRecords}
                pagination={false}
            />
        );
    };

    const columns = [
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
        },
    ];

    return (
        <StyledTable
            isLoading={isLoading}
            columns={columns}
            expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpand: handleExpand,
                rowExpandable: () => true,
            }}
            dataSource={groupedData}
            pagination={false}
        />
    );
};

export default AttendanceHistory;
