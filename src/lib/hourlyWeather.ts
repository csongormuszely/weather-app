export async function getHourlyWeather(city: string) {
  const API_KEY = process.env.WEATHER_API_KEY;
  const date = new Date();
  date.setHours(date.getHours() + 24);
  const unixTime = date.getTime();
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=2&unixdt=${unixTime}`
  );
  const data = await res.json();
  return data;
}
