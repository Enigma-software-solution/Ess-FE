import { ExportOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, Space, Table } from 'antd';
import { format } from 'date-fns';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsersStatsApi } from 'src/store/slices/attendanceSlice/AllStatsSlice/api';
import * as XLSX from 'xlsx';

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
    ];

    const handleExport = () => {
        if (allStats) {
            const dataForExport = allStats.map((item) => ({
                UserName: `${item?.user?.first_name} ${item?.user?.last_name}`,
                Present: item.present,
                Absent: item.absent,
                Leave: item.leave,
                'Half-Day': item.halfDay,
                Vacation: item.vacation,
            }));

            const worksheet = XLSX.utils.json_to_sheet(dataForExport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'All Users Stats');
            XLSX.writeFile(workbook, 'all_users_stats.xlsx');
        }
    };

    return (
        <>
            <Flex justify='space-between' className='mb-3'>
                <Space size={6}>
                    <DatePicker picker='month' onChange={handleMonthChange} value={selectedMonth} />
                    <DatePicker picker='year' onChange={handleYearChange} value={selectedYear} />
                </Space>
                <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                    Export
                </Button>
            </Flex>

            <Table columns={columns} dataSource={allStats} loading={isLoading} pagination={false} />
        </>
    )
}

export default AllUsersStatsTable
