// import { format } from 'date-fns';

// export function formatDate(date, defaultFormat = "dd-MM-yyyy") {
//     return format(new Date(date), defaultFormat);
// }

// export function formatTime(date, defaultFormat = "p") {
//     return format(new Date(date), defaultFormat);
// }
import { format } from "date-fns";
import { utcToZonedTime, format as formatInTimeZone } from "date-fns-tz";

const timeZone = "America/New_York"; // EST Timezone

export function formatDate(date, defaultFormat = "dd-MM-yyyy") {
  const zonedDate = utcToZonedTime(new Date(date), timeZone);
  return format(zonedDate, defaultFormat);
}

export function formatTime(date, defaultFormat = "p") {
  const zonedDate = utcToZonedTime(new Date(date), timeZone);
  return format(zonedDate, defaultFormat);
}
