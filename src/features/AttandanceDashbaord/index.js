import React from 'react'
import TodayCount from './TodayCount'
import OnLeave from './OnLeave'
import ReportChart from './ReportChart'

const AttandanceDashbaord = () => {
    return (
        <>
            <h5 style={{ color: '#4154F1', marginBottom: '10px' }}>Attendance Dashboard</h5>

            <div className='d-flex gap-5'>
                <div className='w-75'>
                    <TodayCount />

                    <div className='mt-5'>
                        <ReportChart />

                    </div>
                </div>
                <div className='w-25 mt-3' >
                    <OnLeave />

                </div>

            </div>


        </>
    )
}

export default AttandanceDashbaord