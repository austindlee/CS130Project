/** The number of milliseconds per day */
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Takes in two dates and returns the difference in days
 * @param a first date object
 * @param b second date object
 * @return a number representing the difference in days between the two objects
 */
export function dateDiffInDays(a: Date, b: Date): number {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/**
 * Maps a number to a day of the week
 */
export const dayNumberMap: any = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
}

export const monthNumberMap: any = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function convertDateToString(dateObject: Date): string {
  let month = dateObject.getMonth();
  let day = dateObject.getDate();
  let hour = dateObject.getHours();
  let minutes = dateObject.getMinutes();
  let minutesString = minutes.toString();
  if(minutes < 10)
    minutesString = '0' + minutesString;
  let ampm = 'AM'
  if (hour >= 12) {
    ampm = 'PM'
  }
  if(hour >= 13) {
    hour -= 12;
  }

  return (monthNumberMap[month] + ' ' + day + ' at ' + hour + ':' + minutesString + ampm);
}