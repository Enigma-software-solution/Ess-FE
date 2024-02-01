
import { callLeadsType } from "src/constant/callLeadsType";
import { CallLeadsColor } from "src/constant/colors";

export const CheckAgendaLeadsColor = (status) => {
    switch (status) {
        case callLeadsType.priority_lead:
            return CallLeadsColor.priority_lead;
        case callLeadsType.bad_lead:
            return CallLeadsColor.bad_lead;
        case callLeadsType.good_lead:
            return CallLeadsColor.good_lead;
        case callLeadsType.garbage:
            return CallLeadsColor.garbage;
       
        default:
            return '#000';
    }
};