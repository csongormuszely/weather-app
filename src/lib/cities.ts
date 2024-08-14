"use server";

export async function getCityByQuery(query: string) {
  const API_KEY = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}
