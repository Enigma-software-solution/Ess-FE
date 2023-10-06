import React from 'react'
import AttendenceHistory from './AttendenceHistory'
import MarkAttendenceCard from './MarkAttendenceCard'
import AttendenceTable from './AttendeceTable'

const Attendence = () => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                <AttendenceHistory />
                <MarkAttendenceCard />
            </div>
            <div>
                <AttendenceTable />
            </div>
        </>

    )
}

export default Attendence