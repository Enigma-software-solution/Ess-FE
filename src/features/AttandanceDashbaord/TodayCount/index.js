import { Col, DatePicker, Flex, Row, Select, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import CountCard from '../CountCard'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import qs from 'qs'
import { format } from 'date-fns'
import Loader from 'src/components/Loader'
import { getAllStatsApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api'

const TodayCount = () => {
    const [loader, setLoader] = useState(false)
    const [todayStats, setTodayStats] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const dispatch = useDispatch()

    const getAllStats = async () => {
        setLoader(true)
        const params = qs.stringify({ date: new Date(selectedDate) });
        try {
            const res = await dispatch(getAllStatsApi(params)).unwrap();
            setTodayStats(res?.data)
        } catch (error) {
            console.error(error);
            toast.error('Error getting stats')
        }
        finally {
            setLoader(false)
        }
    }


    useEffect(() => {
        getAllStats();
    }, [dispatch, selectedDate]);

    const onChange = (date, dateString) => {
        setSelectedDate(date)
    };




    return (
        <>
            <Flex justify='space-between' align='center' className='mb-2'>
                <h6 style={{ color: '#899BBD' }} className='mb-1'>
                    {format(new Date(selectedDate), 'dd MMM yyyy')}
                </h6>
                <DatePicker onChange={onChange} allowClear={false} />

            </Flex>
            {
                !loader ?
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
                    :

                    <Flex justify='center' align='center'>
                        <Spin />
                    </Flex>
            }




        </>
    )
}

export default TodayCount