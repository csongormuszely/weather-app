export async function getCurrentWeather(city: string) {
  const API_KEY = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}
