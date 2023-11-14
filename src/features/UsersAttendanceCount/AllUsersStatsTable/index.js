import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsersStatsApi } from 'src/store/slices/attendanceSlice/AllStatsSlice/api'

const AllUsersStatsTable = () => {
    const [allStats, setAllStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    const getAllStats = async () => {
        try {
            const res = await dispatch(getAllUsersStatsApi()).unwrap()
            console.log(res, 'ssssssssss')
            setAllStats(res?.data)
        } catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getAllStats()
    }, [])




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
            sorter: (a, b) => a.present - b.present,
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
            <Table columns={columns} dataSource={allStats} loading={isLoading} pagination={false} />
        </>
    )
}

export default AllUsersStatsTable