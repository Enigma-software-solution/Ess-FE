import { AttendanceStatus } from "src/constant/attendanceStatus";
import { AttendanceStatusColor } from "src/constant/colors";

export const CheckAttendanceStatusColor = (status) => {
    switch (status) {
        case AttendanceStatus.Present:
            return AttendanceStatusColor.Present;
        case AttendanceStatus.Absent:
            return AttendanceStatusColor.Absent;
        case AttendanceStatus.Leave:
            return AttendanceStatusColor.Leave;
        case AttendanceStatus.Vacation:
            return AttendanceStatusColor.Vacation;
        case AttendanceStatus.Late:
            return AttendanceStatusColor.Late;
        case AttendanceStatus.HalfDay:
            return AttendanceStatusColor.HalfDay;
        default:
            return '#000';
    }
};