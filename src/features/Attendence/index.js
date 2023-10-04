import React from 'react'
import AttendenceHistory from './AttendenceHistory'
import MarkAttendenceCard from './MarkAttendenceCard'

const Attendence = () => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <AttendenceHistory />
            <MarkAttendenceCard />
        </div>
    )
}

export default Attendence