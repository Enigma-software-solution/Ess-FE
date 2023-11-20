import React from 'react'
import TodayCount from './TodayCount'
import OnLeave from './OnLeave'
import ReportChart from './ReportChart'
import { Flex } from 'antd'

const AttandanceDashbaord = () => {
    return (
        <>
            <h5 style={{ color: '#4154F1', marginBottom: '10px' }}>Attendance Dashboard</h5>

            <Flex gap={20}>
                <div className='w-75'>
                    <TodayCount />
                    <ReportChart />
                </div>
                <div className='w-25 mt-3' >
                    <OnLeave />
                </div>

            </Flex>


        </>
    )
}

export default AttandanceDashbaord