export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getHourlyData(data: any, is_single_day = false) {
  const hours = [];
  if (is_single_day) {
    for (const hour of data.hour) {
      hours.push(hour);
    }
    return hours;
  }
  for (const day of data.forecast.forecastday) {
    for (const hour of day.hour) {
      hours.push(hour);
    }
  }
  return hours;
}

export function getWeekdayName(daysAhead: number, full: boolean = false) {
  const weekdays = full
    ? [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return weekdays[date.getDay()];
}
