import React, { useEffect, useState } from 'react';
import { Select, Space, DatePicker, Button, Flex, ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { getAllAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api';
import { StyledDiv, StyledPage } from './styled';
import { getAllUsers } from 'src/store/slices/userSlice/selectors';
import { getAllUsersApi } from 'src/store/slices/userSlice/apis';
import AttendanceHistory from './Table';
import { format } from 'date-fns';
import locale from 'antd/locale/en_US';

const { RangePicker } = DatePicker;
const { Option } = Select;


const STATUS_OPTIONS = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'leave', label: 'Leave' },
    { value: 'half-day', label: 'Half-day' },
    { value: 'vacation', label: 'Vacation' },
];

const AttendanceReport = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("Select Type");
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedFilters, setSelectedFilters] = useState({
        status: null,
        userId: null,
        date: null,
        dateRange: [],
        pageSize: 1000,
        month: null,
    })

    const dispatch = useDispatch();
    const users = useSelector(getAllUsers)

    const getAttendanceReports = async (filters) => {
        const params = {};

        if (filters?.status !== null) {
            params.status = filters?.status;
        }

        if (filters?.date !== null) {
            const selectedDate = new Date(filters?.date);
            params.date = selectedDate.toLocaleDateString('en-US');
        }

        if (filters?.month !== null) {
            params.month = format(new Date(selectedMonth), 'MMM')
        }

        if (filters?.userId !== null) {
            params.userId = filters?.userId;
        }

        if (filters?.pageSize !== null) {
            params.pageSize = filters?.pageSize;
        }

        if (filters?.dateRange.length > 0) {
            params.startDate = format(new Date(filters?.dateRange[0]), 'yyyy-MM-dd');
            params.endDate = format(new Date(filters?.dateRange[1]), 'yyyy-MM-dd');
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

    const handleDateChange = (value) => {
        setSelectedDate(value)
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            date: value
        }));
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
        setSelectedRange(dates)
        if (dates) {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                dateRange: dates,

            }));
        }
    };

    const handleMonthChange = (month) => {
        if (month) {
            setSelectedMonth(month)
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                month: month,
            }))
        }
    }

    const handleSubmit = () => {
        getAttendanceReports(selectedFilters);
        handleReset();
    };

    const handleReset = () => {
        setSelectedFilters({
            status: null,
            userId: null,
            dateRange: [],
            date: null,
            month: null,
        });
        setSelectedDate(null);
        setSelectedMonth(null);
        setSelectedRange(null);
        setType('Select Type');

        getAttendanceReports({
            status: null,
            userId: null,
            dateRange: [],
            date: null,
            month: null,
            pageSize: 1000,
        });
    };


    useEffect(() => {
        if (!users?.length) {
            dispatch(getAllUsersApi());
        }

    }, []);

    useEffect(() => {
        getAttendanceReports(selectedFilters);
    }, []);

    const PickerWithType = ({ type }) => {
        if (type === 'date') return <DatePicker name='date' value={selectedDate} onChange={handleDateChange} />;
        if (type === 'month') return <DatePicker picker="month" onChange={handleMonthChange} value={selectedMonth} />;
        if (type === 'dateRange') return <RangePicker onChange={handleRangePicker} value={selectedRange} />;
        return null;
    };

    return (
        <StyledPage>
            <Flex justify="space-between" className="mb-3">
                <h5 className="p-2">Attendance Reports</h5>
            </Flex>
            <StyledDiv>
                <Flex justify="space-between" align="center" className="mb-2">
                    <Flex>
                        <Space size={6}>
                            <Select
                                placeholder="Select user"
                                onChange={handleUserChange}
                                showSearch
                                style={{ minWidth: '120px', width: "200px" }}
                                value={selectedFilters.userId}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {users?.map(user => (
                                    <Option key={user?._id} value={user?._id}>
                                        {`${user?.first_name} ${user?.last_name}`}
                                    </Option>
                                ))}
                            </Select>
                            <Select
                                placeholder="Select attendance status"
                                onChange={handleStatusChange}
                                options={STATUS_OPTIONS}
                                showSearch
                                style={{ minWidth: '120px', width: "200px" }}
                                value={selectedFilters.status}
                            >
                            </Select>
                            <Space>
                                <Select
                                    onChange={setType}
                                    style={{ minWidth: '120px', width: '200px' }}
                                    value={type}
                                >
                                    <Option value="date">Date</Option>
                                    <Option value="month">Month</Option>
                                    <Option value="dateRange">Date Range</Option>
                                </Select>
                                <ConfigProvider locale={locale}>
                                    <PickerWithType type={type} />
                                </ConfigProvider>
                            </Space>

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

            {<AttendanceHistory reports={reports?.attendance ?? []} isLoading={isLoading} />}
            {/* {reports?.paginator && reports?.attendance.length ? (
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
            ) : null} */}
        </StyledPage>

    );
};

export default AttendanceReport;
