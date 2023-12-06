import { Avatar, DatePicker, Flex, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import qs from 'qs'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { StyledCard } from './styled'
import { getAllAttendanceApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api'

const OnLeave = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [onLeaveUser, setOnLeaveUsers] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const dispatch = useDispatch()

    const getAllAttendance = async () => {
        setIsLoading(true)
        const params = qs.stringify({
            date: new Date(selectedDate),
            status: ['leave', 'absent', 'vacation']
        });
        try {
            const res = await dispatch(getAllAttendanceApi(params)).unwrap();
            setOnLeaveUsers(res?.data)
        } catch (error) {
            console.error(error);
            toast.error('Error getting stats')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllAttendance();
    }, [dispatch, selectedDate]);

    const onChange = (date, dateString) => {
        setSelectedDate(date)
    };

    return (
        <StyledCard title='Who Is On Leave'>
            <div className='d-flex justify-content-between align-items-center'>
                <p style={{ fontWeight: 'bold' }}>On Leave : <span style={{ color: "red" }}>{onLeaveUser?.attendance.length}</span></p>
                <DatePicker onChange={onChange} allowClear={false} />

            </div>
            {
                isLoading ?
                    <Flex justify='center' align='center' style={{ minHeight: '200px' }}>
                        <Spin />
                    </Flex>
                    :
                    <div style={{ overflow: 'auto', height: '240px', marginTop: '20px' }}>
                        {
                            onLeaveUser?.attendance?.map(data => {
                                return (
                                    <div className='d-flex align-items-center gap-2 mt-3' key={data?.user?.first_name} >
                                        <Avatar />
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#4154F1' }}>
                                                {data?.user?.first_name} {data?.user?.last_name}</p>

                                            <Flex align='center' gap={6}>
                                                <p style={{ fontSize: '12px', color: '#899BBD' }}>
                                                    {format(new Date(data?.date), 'dd MMM ')}
                                                </p>
                                                <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#899BBD' }}> {data?.status}</p>
                                            </Flex>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </StyledCard>
    )
}

export default OnLeave