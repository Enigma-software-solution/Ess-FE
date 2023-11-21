import { AttendanceStatusColor } from "src/constant/colors";


export const getAttendanceStatusColor = (status) => {
    switch (status) {
        case 'present':
            return AttendanceStatusColor.Present;
        case 'absent':
            return AttendanceStatusColor.Absent;
        case 'leave':
            return AttendanceStatusColor.Leave;
        case 'vacation':
            return AttendanceStatusColor.Vacation;
        case 'late':
            return AttendanceStatusColor.Late;
        case 'half-day':
            return AttendanceStatusColor.HalfDay;
        default:
            return '#000';
    }
};