import React from 'react'
import TodayCount from './TodayCount'
import OnLeave from './OnLeave'
import ReportChart from './ReportChart'
import { Row, Col } from 'antd';

const AttandanceDashbaord = () => {
    return (
        <>
            <h5 style={{ color: '#4154F1', marginBottom: '10px' }}>Attendance Dashboard</h5>

            <Row gutter={20}>
                <Col sm={24} md={18}>
                    <TodayCount />
                    <ReportChart />
                </Col>
                <Col sm={24} md={6}>
                    <OnLeave />
                </Col>
            </Row>
        </>
    )
}

export default AttandanceDashbaord;
