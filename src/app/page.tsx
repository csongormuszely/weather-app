import CurrentWeather from "@/components/currentComponent";
import FutureWeather from "@/components/futureComponent";
import Header from "@/components/header";
import HourlyWeather from "@/components/hourlyComponent";
import SelectCity from "@/components/selectCityComponent";
import { getCurrentWeather } from "@/lib/currentWeather";
import { getDailyWeather } from "@/lib/dailyWeather";
import { getHourlyWeather } from "@/lib/hourlyWeather";
import { capitalize } from "@/utils/utils";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { city?: string };
}) {
  const city = searchParams["city"] || "";
  const currentWeather = await getCurrentWeather(city);
  const hourlyWeather = await getHourlyWeather(city);
  const dailyWeather = await getDailyWeather(city);
  return (
    <main>
      <Header />
      <div className="border-t-[1px] mx-4 border-slate-200" />
      {city === "" ? (
        <SelectCity />
      ) : (
        <div className="grid grid-cols-2 gap-12 px-16">
          <div className="mt-16">
            <div className="flex gap-8 items-center">
              <p className="text-4xl font-semibold ml-4">
                {capitalize(city)},
                <span className="font-normal ml-1">
                  {String(new Date().getHours()).length === 1
                    ? "0" + String(new Date().getHours())
                    : String(new Date().getHours())}
                  :
                  {String(new Date().getMinutes()).length === 1
                    ? "0" + String(new Date().getMinutes())
                    : String(new Date().getMinutes())}
                </span>
              </p>
              <CurrentWeather data={currentWeather} />
            </div>
            <HourlyWeather data={hourlyWeather} />
          </div>
          <div className="mt-16">
            <FutureWeather data={dailyWeather} />
          </div>
        </div>
      )}
    </main>
  );
}
