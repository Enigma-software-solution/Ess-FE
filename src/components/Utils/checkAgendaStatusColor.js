
import { callStatusType } from "src/constant/callStatusType";
import { CallStatusColor } from "src/constant/colors";

export const CheckAgendaStatusColor = (status) => {
    switch (status) {
        case callStatusType.Done:
            return CallStatusColor.Done;
        case callStatusType.Reschedule:
            return CallStatusColor.Reschedule;
        case callStatusType.Cancel:
            return CallStatusColor.Cancel;
        case callStatusType.Missed:
            return CallStatusColor.Missed;
       
        default:
            return '#000';
    }
};