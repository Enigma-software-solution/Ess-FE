import { ExportOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, Space, Table } from 'antd';
import { format } from 'date-fns';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsersStatsApi } from 'src/store/slices/attendanceSlice/AllStatsSlice/api';
import * as XLSX from 'xlsx';
import { StyledReportCount } from './styled';
import dayjs from 'dayjs';

const AllUsersStatsTable = () => {
    const [allStats, setAllStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectedYear, setSelectdYear] = useState(null)

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
        setSelectdYear(null)
    }

    const handleYearChange = (date) => {
        setSelectdYear(date)
        setSelectedMonth(null)

    }


    useEffect(() => {
        getAllStats()
    }, [selectedMonth, selectedYear])

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.user.first_name.localeCompare(b.user.first_name),
            render: (text, record) => `${record?.user?.first_name} ${record?.user?.last_name}`,
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
                UserName: `${item?.user?.first_name} ${item?.user?.last_name}`,
                Absent: item.absent,
                Leave: item.leave,
                'Half-Day': item.halfDay,
                Vacation: item.vacation,
                Total: item.absent + item.leave + item.halfDay + item.vacation,
            }));

            // Calculate the total for the entire sheet
            const totalRow = {
                UserName: 'Total',
                Absent: allStats.reduce((acc, item) => acc + item.absent, 0),
                Leave: allStats.reduce((acc, item) => acc + item.leave, 0),
                'Half-Day': allStats.reduce((acc, item) => acc + item.halfDay, 0),
                Vacation: allStats.reduce((acc, item) => acc + item.vacation, 0),
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

    return (
        <StyledReportCount>
            <Flex justify='space-between' className='m-2'>
                <h5>Reports Count</h5>
                <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                    Export
                </Button>
            </Flex>
            <Space size={6} className='p-3 mb-3' style={{ boxShadow: '0px 8px 24px rgba(149,157,165,0.2)' }}>
                <DatePicker picker='month' onChange={handleMonthChange} value={selectedMonth}  disabledDate={disabledDate}  />
                <DatePicker picker='year' onChange={handleYearChange} value={selectedYear} disabledDate={disabledDate} />
            </Space>

            <Table columns={columns} dataSource={allStats} loading={isLoading} pagination={false} />
        </StyledReportCount>
    )
}

export default AllUsersStatsTable
