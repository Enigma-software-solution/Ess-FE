import React, { useState } from 'react';
import { Card, Button, message } from 'antd';
import { format } from 'date-fns';

const MarkAttendenceCard = () => {
    const [attendanceMarked, setAttendanceMarked] = useState(false);

    const handleMarkAttendance = () => {
        const currentTime = new Date();
        const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        setAttendanceMarked(true);
        console.log(`Attendance marked as present at ${formattedTime}`);
        message.success('Attendance marked successfully!');
    };

    return (
        <Card title="Attendance Card">
            <p>
                {attendanceMarked
                    ? 'Attendance has been marked for this session.'
                    : 'Click the button below to mark attendance for this session.'}
            </p>
            <Button
                type="primary"
                onClick={handleMarkAttendance}
                disabled={attendanceMarked}
            >
                {attendanceMarked ? 'Attendance Marked' : 'Mark Attendance'}
            </Button>
        </Card>
    );
};

export default MarkAttendenceCard;
