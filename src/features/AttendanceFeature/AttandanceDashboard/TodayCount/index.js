import { Col, DatePicker, Flex, Row, Select, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import CountCard from '../CountCard'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import qs from 'qs'
import { format } from 'date-fns'

import { getAllStatsApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api'
import dayjs from 'dayjs'

const TodayCount = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [todayStats, setTodayStats] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const dispatch = useDispatch()

    const getAllStats = async () => {
        setIsLoading(true)
        const params = qs.stringify({ date: new Date(selectedDate) });
        try {
            const res = await dispatch(getAllStatsApi(params)).unwrap();
            setTodayStats(res?.data)
        } catch (error) {
            console.error(error);
            toast.error('Error getting stats')
        }
        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getAllStats();
    }, [dispatch, selectedDate]);

    const onChange = (date, dateString) => {
        setSelectedDate(date)
    };

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
      };

    return (
        <>
            <Flex justify='space-between' align='center' className='mb-2'>
                <h6 style={{ color: '#899BBD' }} className='mb-1'>
                    {format(new Date(selectedDate), 'dd MMM yyyy')}
                </h6>
                <DatePicker onChange={onChange} allowClear={false} defaultValue={dayjs()}  disabledDate={disabledDate}/>

            </Flex>
            {
                isLoading ?
                    <Flex justify='center' align='center'>
                        <Spin />
                    </Flex>
                    :

                    <Row gutter={16} >
                        <Col className="gutter-row" span={6}>
                            <CountCard title='Present' day='Today' count={todayStats?.presentCount} />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <CountCard title='Absent' day='Today' count={todayStats?.absentCount} />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <CountCard title='Late' day='Today' count={todayStats?.lateCount} />
                        </Col>

                        <Col className="gutter-row" span={6}>
                            <CountCard title='Half-day' day='Today' count={todayStats?.halfCount} />
                        </Col>
                    </Row>
            }
        </>
    )
}

export default TodayCount