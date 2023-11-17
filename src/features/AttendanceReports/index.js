import React, { useEffect, useState } from 'react';
import { Table, Select, Space, DatePicker, Button, Typography, Flex, Pagination, Tag } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import qs from 'qs';
import { getAllAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { AttendanceStatusColor } from 'src/constant/colors';
import { StyledDiv, StyledPage } from './styled';

const { RangePicker } = DatePicker;
const { Option } = Select;

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
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const [selectedPagination, setSelectedPagination] = useState(null);

    const dispatch = useDispatch();

    const getAttendanceReports = async (options = {}) => {
        const { month, startDate, endDate, status, pagination } = options;
        const params = qs.stringify({
            month,
            startDate,
            endDate,
            status,
            ...pagination,
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

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    const handleRangePicker = (dates) => {
        if (dates && dates.length === 2) {
            setSelectedDateRange(dates);
        }
    };

    const handleSubmit = () => {
        const status = selectedStatus;
        let startDate = null;
        let endDate = null;

        if (selectedDateRange && selectedDateRange.length === 2) {
            startDate = selectedDateRange[0]?.toISOString();
            endDate = selectedDateRange[1]?.toISOString();
        }
        getAttendanceReports({ status, startDate, endDate });
    };  

    const handleReset = () => {
        setSelectedStatus(null);
        setSelectedDateRange(null);
        getAttendanceReports();
    };

    const handleExport = () => {
        const csvData = reports?.map((item) => ({
            date: item?.date,
            employeeName: `${item?.user?.first_name} ${item?.user?.last_name}`,
            checkInTime: item?.checkInTime,
            status: item.status,
        }));
        setExportData(csvData);
    };

    const { totalItems, pageSize, totalPages, page } = reports?.paginator ?? {};

    const onPaginationChange = (page, pageSize) => {
        setSelectedPagination({
            page,
            pageSize,
        });

        const pagination = {
            page,
            pageSize,
        };
        getAttendanceReports({ pagination });
    };

    useEffect(() => {
        getAttendanceReports();
    }, []);

    return (
        <StyledPage>
            <Flex justify="space-between" className="mb-3" >
                <h5 className="p-2">Attendance Reports</h5>
                <CSVLink data={exportData} filename={'attendance-report.csv'}>
                    <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                        Export to CSV
                    </Button>
                </CSVLink>
            </Flex>
            <StyledDiv>
                <Flex justify="space-between" align="center" className="mb-2">
                    <Flex align="center" gap={4} >
                        <Space>
                            <Select
                                placeholder="Select attendance status"
                                onChange={handleStatusChange}
                                style={{ minWidth: '120px', width: "200px" }}
                            >
                                <Option value="present">Present</Option>
                                <Option value="absent">Absent</Option>
                                <Option value="leave">Leave</Option>
                                <Option value="vacation">Vacation</Option>
                                <Option value="half-day">Half-day</Option>
                                <Option value="late">Late</Option>
                            </Select>
                        </Space>
                        <RangePicker onChange={handleRangePicker} />
                    </Flex>
                    <Flex gap={"20px"}>
                        <Button type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button onClick={handleReset}>
                            Reset
                        </Button>
                    </Flex>
                </Flex>
            </StyledDiv>

            <Table columns={columns} dataSource={reports?.attendance} loading={isLoading} pagination={false} />

            {reports?.paginator && reports?.attendance.length ? (
                <Pagination
                    style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}
                    total={totalItems}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={pageSize}
                    defaultCurrent={page}
                    onChange={(page, pageSize) => {
                        onPaginationChange(page, pageSize);
                    }}
                    showSizeChanger
                    onShowSizeChange={(current, size) => {
                        console.log(`Current: ${current}, PageSize: ${size}`);
                    }}
                />
            ) : null}
        </StyledPage>
    );
};

export default AttendanceReport;
