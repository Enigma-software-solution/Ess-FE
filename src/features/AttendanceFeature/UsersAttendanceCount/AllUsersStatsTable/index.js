import { ExportOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, Space, Table } from 'antd';
import { format } from 'date-fns';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsersStatsApi } from 'src/store/slices/attendanceSlice/AllStatsSlice/api';
import * as XLSX from 'xlsx';
import { StyledReportCount } from './styled';
import { capitalize } from "lodash";
import dayjs from 'dayjs';
import CustomSearchField from 'src/components/SearchField';

const AllUsersStatsTable = () => {
    const [allStats, setAllStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(dayjs())
    const [selectedYear, setSelectdYear] = useState(dayjs())
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch()

    const getAllStats = async () => {

        const queryParams = qs.stringify({
            month: selectedMonth ? format(new Date(selectedMonth), 'MMM') : undefined,
            year: selectedYear ? format(new Date(selectedYear), 'yyyy') : undefined,

        })

        try {
            const res = await dispatch(getAllUsersStatsApi(queryParams)).unwrap()
            setAllStats(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleMonthChange = (date) => {
        setSelectedMonth(date)
    }

    const handleYearChange = (date) => {
        setSelectdYear(date)
    }

    const handleSubmit = () => {
        const queryParams = qs.stringify({
            month: selectedMonth ? format(new Date(selectedMonth), 'MMM') : undefined,
            year: selectedYear ? format(new Date(selectedYear), 'yyyy') : undefined,
        });

        getAllStats(queryParams);
        handleReset()
    };

    const handleReset = () => {
        setSelectedMonth(null);
        setSelectdYear(null);
        getAllStats()
    };


    useEffect(() => {
        getAllStats()
    }, [])

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => capitalize(a.user.first_name).localeCompare(capitalize(b.user.first_name)),
            render: (text, record) => capitalize(`${record?.user?.first_name} ${record?.user?.last_name}`),
        },
        {
            title: 'Present',
            dataIndex: 'present',
            key: 'present',
        },
        {
            title: 'Absent',
            dataIndex: 'absent',
            key: 'absent',

        },
        {
            title: 'Leave',
            dataIndex: 'leave',
            key: 'leave',
        },
        {
            title: 'Half-Day',
            dataIndex: 'halfDay',
            key: 'halfDay',
        },
        {
            title: 'Vacation',
            dataIndex: 'vacation',
            key: 'vacation',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            render: (text, record) => record.absent + record.leave + record.halfDay + record.vacation,
        },
    ];

    const handleExport = () => {
        if (allStats) {
            const dataForExport = allStats.map((item) => ({
                Name: `${item?.user?.first_name} ${item?.user?.last_name}`,
                Absent: item.absent,
                Present: item.present,
                // Leave: item.leave,
                // 'Half-Day': item.halfDay,
                // Vacation: item.vacation,
                Total: item.absent + item.leave + item.halfDay + item.vacation,
            }));

            // Calculate the total for the entire sheet
            const totalRow = {
                Name: 'Total',
                Absent: allStats.reduce((acc, item) => acc + item.absent, 0),
                Present: allStats.reduce((acc, item) => acc + item.present, 0),
                // Leave: allStats.reduce((acc, item) => acc + item.leave, 0),
                // 'Half-Day': allStats.reduce((acc, item) => acc + item.halfDay, 0),
                // Vacation: allStats.reduce((acc, item) => acc + item.vacation, 0),
                Total: allStats.reduce((acc, item) => acc + item.absent + item.leave + item.halfDay + item.vacation, 0),
            };

            const worksheet = XLSX.utils.json_to_sheet([...dataForExport, totalRow]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'All Users Stats');
            XLSX.writeFile(workbook, 'all_users_stats.xlsx');
        }
    };
    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };


    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchQuery(searchValue);

    }
    const filteredStats = allStats?.filter((data) => {
        const fullName = `${data?.user?.first_name} ${data?.user?.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    return (
        <StyledReportCount>
            <Flex justify='space-between' className='m-'>
                <h5>Reports Count</h5>
               
                <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                    Export
                </Button>
            </Flex>
            <CustomSearchField onChange={handleSearchChange} text={"Search User"} />
            <Space size={20} className='p-3 mb-3 mt-2'  style={{width:'100%', boxShadow: '0px 8px 24px rgba(149,157,165,0.2)' }}>
            
                
                <DatePicker picker='month' onChange={handleMonthChange} defaultValue={selectedMonth} disabledDate={disabledDate} />
                <DatePicker picker='year' onChange={handleYearChange} defaultValue={selectedYear} disabledDate={disabledDate} />
                <div>
                    <Button type="primary" onClick={handleSubmit} style={{ marginLeft: 8 }} disabled={selectedMonth === null && selectedYear === null}>
                        Submit
                    </Button>

                    <Button onClick={handleReset} style={{ marginLeft: 8 }}>
                        Reset
                    </Button>

                </div>
            </Space>


            <Table columns={columns} dataSource={filteredStats} loading={isLoading} pagination={false} />
        </StyledReportCount>
    )
}

export default AllUsersStatsTable
