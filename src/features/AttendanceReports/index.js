import React, { useEffect, useState } from 'react';
import { Table, Spin, DatePicker, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import AttendanceTabs from '../AttandanceDashbaord/AttendanceTabs';
import { useDispatch } from 'react-redux';

import { format } from 'date-fns';
import qs from 'qs';
import { getAllAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';

const { RangePicker, MonthPicker } = DatePicker;

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
        render: (text, record) => (text ? format(new Date(text), 'dd MMM yyyy') : 'N/A'),
    },
    {
        title: 'Employee Name',
        dataIndex: 'user.first_name',
        render: (text, record) => `${record?.user?.first_name} ${record?.user?.last_name}`,
    },
    {
        title: 'Check In Time',
        dataIndex: 'checkInTime',
        key: 'checkInTime',
        render: (text) => (text ? format(new Date(text), 'p') : 'N/A'),
    },
    {
        title: 'Check Out Time',
        dataIndex: 'checkOutTime',
        key: 'checkOutTime',
        render: (text) => (text ? format(new Date(text), 'p') : 'N/A'),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];

const AttendanceReport = () => {
    const [exportData, setExportData] = useState([]);
    const [reports, setReports] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const getAttendanceReports = async (month, startDate, endDate) => {
        const params = qs.stringify({
            month: month,
            startDate: startDate,
            endDate: endDate,
        });

        try {
            setIsLoading(true);
            const res = await dispatch(getAllAttendanceApi(params)).unwrap();
            setReports(res?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMonthChange = (value) => {
        const month = format(new Date(value), 'MMM');
        getAttendanceReports(month);
    };

    const handleRangePicker = (dates) => {
        if (dates && dates.length === 2) {
            const startDate = format(new Date(dates[0]), 'yyyy-MM-dd');
            const endDate = format(new Date(dates[1]), 'yyyy-MM-dd');
            getAttendanceReports(null, startDate, endDate);
        }
    };

    useEffect(() => {
        getAttendanceReports();
    }, []);

    const handleExport = () => {
        const csvData = reports?.map((item) => ({
            date: item?.date,
            employeeName: `${item?.user?.first_name} ${item?.user?.last_name}`,
            status: item.status,
        }));

        setExportData(csvData);
    };

    return (
        <StyledPage>
            <AttendanceTabs />
            <h5>Attendance Report</h5>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <MonthPicker onChange={handleMonthChange} placeholder="Select month" />
                    <RangePicker onChange={handleRangePicker} />
                </div>
                <CSVLink data={exportData} filename={'attendance-report.csv'}>
                    <ExportButton type="primary" icon={<ExportOutlined />} onClick={handleExport} >
                        Export to CSV
                    </ExportButton>
                </CSVLink>
            </div>
            {isLoading ? <Spin size="large" /> : <Table columns={columns} dataSource={reports} />}
        </StyledPage>
    );
};

export default AttendanceReport;
