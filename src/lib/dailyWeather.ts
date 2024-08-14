export async function getDailyWeather(city: string) {
  const API_KEY = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
  );
  const data = await res.json();
  return data;
}
