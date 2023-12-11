import React, { useEffect, useState } from 'react';
import { Table, Select, Space, DatePicker, Button, Flex, Pagination, Tag, Tooltip } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import qs from 'qs';
import { getAllAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { StyledDiv, StyledPage } from './styled';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import { CheckAttendanceStatusColor } from 'src/components/Utils/checkAttendanceStatusColor';

const { RangePicker } = DatePicker;
const { Option } = Select;

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

const AttendanceReport = () => {
    const [exportData, setExportData] = useState([]);
    const [reports, setReports] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPagination, setSelectedPagination] = useState({
        page: 1,
        pageSize: 10
    });
    const [selectedFilters, setSelectedFilters] = useState({
        status: null,
        userId: null,
        dateRange: []
    })

    const dispatch = useDispatch();
    const users = useSelector(getAllUsers)

    const getAttendanceReports = async (filters) => {
        const params = {};

        if (filters?.status !== null) {
            params.status = filters?.status;
        }

        if (filters?.userId !== null) {
            params.userId = filters?.userId;
        }

        if (filters?.dateRange.length > 0) {
            params.startDate = new Date(filters?.dateRange[0]);
            params.endDate = new Date(filters?.dateRange[1]);
        }

        if (!filters?.dateRange.length > 0) {
            params.date = new Date()

        }


        if (selectedPagination) {
            params.page = selectedPagination?.page;
            params.pageSize = selectedPagination?.pageSize;
        }

        const queryString = qs.stringify(params);
        try {
            setIsLoading(true);
            const res = await dispatch(getAllAttendanceApi(queryString)).unwrap();
            setReports(res?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleStatusChange = (value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            status: value
        }));
    };

    const handleUserChange = (value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            userId: value
        }));
    };

    const handleRangePicker = (dates) => {
        if (dates && dates.length === 2) {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                dateRange: dates
            }));
        }
    };

    const handleSubmit = () => {
        getAttendanceReports(selectedFilters);
    };

    const handleReset = () => {
        setSelectedFilters({
            status: null,
            userId: null,
            dateRange: []
        })
        setSelectedPagination()
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
    };

    useEffect(() => {
        if (!users?.length) {
            dispatch(getAllUsersApi());
        }

    }, []);

    useEffect(() => {
        getAttendanceReports(selectedFilters);
    }, [selectedPagination]);

    return (
        <StyledPage>
            <Flex justify="space-between" className="mb-3">
                <h5 className="p-2">Attendance Reports</h5>
                <CSVLink data={exportData} filename={'attendance-report.csv'}>
                    <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                        Export to CSV
                    </Button>
                </CSVLink>
            </Flex>
            <StyledDiv>
                <Flex justify="space-between" align="center" className="mb-2">
                    <Flex>
                        <Space size={6}>
                            <Select
                                placeholder="Select user"
                                onChange={handleUserChange}
                                style={{ minWidth: '120px', width: "200px" }}
                                value={selectedFilters.userId}
                            >
                                {users.map(user => (
                                    <Option key={user._id} value={user._id}>
                                        {`${user.first_name} ${user.last_name}`}
                                    </Option>
                                ))}
                            </Select>
                            <Select
                                placeholder="Select attendance status"
                                onChange={handleStatusChange}
                                style={{ minWidth: '120px', width: "200px" }}
                                value={selectedFilters.status}
                            >
                                <Option value="present">Present</Option>
                                <Option value="absent">Absent</Option>
                                <Option value="leave">Leave</Option>
                                <Option value="vacation">Vacation</Option>
                                <Option value="half-day">Half-day</Option>
                                <Option value="late">Late</Option>
                            </Select>
                            <RangePicker onChange={handleRangePicker} value={selectedFilters.dateRange} />

                        </Space>
                    </Flex>
                    <Flex>
                        <Space size={6}>
                            <Button type="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button onClick={handleReset}>
                                Reset
                            </Button>
                        </Space>
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
                    onShowSizeChange={(current, pageSize) => {
                        onPaginationChange(1, 1);
                    }}
                />
            ) : null}
        </StyledPage>
    );
};

export default AttendanceReport;
