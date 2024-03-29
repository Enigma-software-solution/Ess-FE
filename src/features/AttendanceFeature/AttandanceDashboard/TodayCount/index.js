import { DatePicker, Flex, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import CountCard from '../CountCard'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import qs from 'qs'
import { format } from 'date-fns'
import { getAllStatsApi } from 'src/store/slices/attendanceSlice/GetAttendanceSlice/api'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

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

                <DatePicker onChange={onChange} allowClear={false} defaultValue={dayjs()} disabledDate={disabledDate} />

            </Flex>
            {
                isLoading ?
                    <Flex justify='center' align='center'>
                        <Spin />
                    </Flex>
                    :
                    <Swiper
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        slidesPerView={4}
                        spaceBetween={10}
                        grabCursor={true}
                        style={{ padding: '26px' }}
                    >
                        <SwiperSlide>
                            <CountCard title='Present' day='Today' count={todayStats?.presentCount} />
                        </SwiperSlide>

                        <SwiperSlide>
                            <CountCard title='Absent' day='Today' count={todayStats?.absentCount} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CountCard title='Late' day='Today' count={todayStats?.lateCount} />
                        </SwiperSlide>
                    </Swiper>
            }
        </>
    )
}

export default TodayCount