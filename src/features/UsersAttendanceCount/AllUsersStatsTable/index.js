import { Button, DatePicker, Space, Table } from 'antd'
import { format } from 'date-fns'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsersStatsApi } from 'src/store/slices/attendanceSlice/AllStatsSlice/api'


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
            const res = await dispatch(getAllUsersStatsApi(selectedMonth && queryParams)).unwrap()
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

    return (
        <>
            <Space size={10} style={{ marginBottom: '10px' }}>
                <DatePicker picker='month' onChange={handleMonthChange} value={selectedMonth} />
                <DatePicker picker='year' onChange={handleYearChange} value={selectedYear} />
            </Space>

            <Table columns={columns} dataSource={allStats} loading={isLoading} pagination={false} />
        </>
    )
}

export default AllUsersStatsTable
