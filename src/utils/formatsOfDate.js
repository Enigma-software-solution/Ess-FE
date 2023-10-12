import { format } from 'date-fns';

export function formatDate(date, defaultFormat = "dd-MM-yyyy") {
    return format(new Date(date), defaultFormat);
}


export function formatTime(date, defaultFormat = "p") {
    return format(new Date(date), defaultFormat);
}
