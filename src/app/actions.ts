"use server";

export async function getWeather() {
  const API_KEY = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Zurich`
  );
  const data = await res.json();
}
