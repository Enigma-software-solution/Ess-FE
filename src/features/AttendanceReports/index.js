import React, { useEffect, useState } from 'react';
import { Table, Spin, Select, Space, DatePicker, Button, Typography, Flex, Tag } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import qs from 'qs';
import { getAllAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { AttendanceStatusColor } from 'src/constant/colors';

const { RangePicker, MonthPicker } = DatePicker;
const { Option } = Select;

const StyledPage = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const ExportButton = styled(Button)`
  margin-bottom: 10px;
`;

const getStatusColor = (status) => {
    switch (status) {
        case 'present':
            return AttendanceStatusColor.Present;
        case 'absent':
            return AttendanceStatusColor.Absent;
        case 'leave':
            return AttendanceStatusColor.Leave;
        case 'vacation':
            return AttendanceStatusColor.Vacation;
        case 'late':
            return AttendanceStatusColor.Late;
        case 'half-day':
            return AttendanceStatusColor.HalfDay;
        default:
            return '#000'; 
    }
};

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
        render: (text) => {
            return (
                <Tag color={getStatusColor(text)}>{text}</Tag>
            );
        },
    },
];

const AttendanceReport = () => {
    const [exportData, setExportData] = useState([]);
    const [reports, setReports] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const getAttendanceReports = async (options = {}) => {
        const { month, startDate, endDate, status } = options;
        const params = qs.stringify({
            month: month,
            startDate: startDate,
            endDate: endDate,
            status: status,
        });

        try {
            setIsLoading(true);
            const res = await dispatch(getAllAttendanceApi(params)).unwrap();
            setReports(res?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMonthChange = (value) => {
        const month = format(new Date(value), 'MMM');
        getAttendanceReports({ month });
    };

    const handleRangePicker = (dates) => {
        if (dates && dates.length === 2) {
            const startDate = format(new Date(dates[0]), 'yyyy-MM-dd');
            const endDate = format(new Date(dates[1]), 'yyyy-MM-dd');
            getAttendanceReports({ startDate, endDate });
        }
    };

    const handleStatusChange = (value) => {
        getAttendanceReports({ status: value });
    };

    useEffect(() => {
        getAttendanceReports();
    }, []);

    const handleExport = () => {
        const csvData = reports?.map((item) => ({
            date: item?.date,
            employeeName: `${item?.user?.first_name} ${item?.user?.last_name}`,
            checkInTime: item?.checkInTime,
            status: item.status,
        }));

        setExportData(csvData);
    };

    return (
        <StyledPage>
            <h5 className='p-2'>Attendance Reports</h5>
            <Flex justify='space-between' align='center' className='mb-2'>
                <Flex align='center' gap={4}>
                    <Space>
                        <Select placeholder="Select attendance status" onChange={handleStatusChange} style={{ minWidth: '120px' }}>
                            <Option value="present">Present</Option>
                            <Option value="absent">Absent</Option>
                            <Option value="leave">Leave</Option>
                            <Option value="vacation">Vacation</Option>
                            <Option value="half-day">Half-day</Option>
                            <Option value="late">Late</Option>
                        </Select>
                    </Space>
                    <MonthPicker onChange={handleMonthChange} />
                    <RangePicker onChange={handleRangePicker} />
                </Flex>
                <CSVLink data={exportData} filename={'attendance-report.csv'}>
                    <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                        Export to CSV
                    </Button>
                </CSVLink>
            </Flex>
            <Table columns={columns} dataSource={reports} loading={isLoading} />
        </StyledPage>
    );
};

export default AttendanceReport;
