import CurrentWeather from "@/components/currentComponent";
import FutureWeather from "@/components/futureComponent";
import Header from "@/components/header";
import HourlyWeather from "@/components/hourlyComponent";
import LocationTime from "@/components/locationTimeComponent";
import SelectCity from "@/components/selectCityComponent";
import ServerComponent from "@/components/serverComponent";
import { getCurrentWeather } from "@/lib/currentWeather";
import { getDailyWeather } from "@/lib/dailyWeather";
import { getHourlyWeather } from "@/lib/hourlyWeather";

export default async function Home({
  searchParams,
}: {
  searchParams: { city?: string };
}) {
  const city = searchParams["city"] || "";

  const dailyWeather = await getDailyWeather(city);
  return (
    <main className="mb-24">
      <Header />
      <div className="border-t-[1px] mx-4 border-slate-200" />
      {city === "" ? (
        <SelectCity />
      ) : (
        <div className="grid grid-cols-1 gap-6 px-6 md:px-16 md:grid-cols-2 md:gap-12">
          <div className="mt-12 md:mt-16">
            <div className="flex flex-col gap-6 items-center md:gap-8 md:flex-row">
              <LocationTime city={city} />
              <CurrentWeather city={city} />
            </div>
            <HourlyWeather city={city} />
          </div>
          <div className="mt-16">
            <FutureWeather data={dailyWeather} />
          </div>
        </div>
      )}
    </main>
  );
}
