import { getHourlyWeather } from "@/lib/hourlyWeather";
import { getHourlyData } from "@/utils/utils";
import Image from "next/image";

export default async function HourlyWeather({ city }: { city: string }) {
  const data = await getHourlyWeather(city);
  const hours = getHourlyData(data);
  const currentHour = new Date().getHours();
  const relevantHours = hours
    .slice(currentHour, currentHour + 24)
    .filter((hour: any, index: number) => index % 3 === 0);
  return (
    <div className="mt-16 bg-slate-100 p-4 rounded-xl px-3 pb-4 pt-7 md:px-5">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Hourly Forecast
      </h2>
      <div className="flex gap-2 md:gap-3 relative">
        <div className="flex flex-col items-center justify-start gap-[2.9rem] pb-3 w-20 md:bg-inherit md:gap-[2.6rem] md:w-12">
          <Image
            src="/clock.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-5 h-5 md:w-6 md:h-6"
          />
          <Image
            src="/weather.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-7 h-7 md:w-8 md:h-8"
          />
          <Image
            src="/temperature.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-7 h-7 md:w-8 md:h-8"
          />
          <Image
            src="/drops.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-7 h-7 md:w-8 md:h-8"
          />
        </div>
        <div className="flex justify-between overflow-scroll px-2 md:flex-grow md:overflow-auto">
          {relevantHours.map((hour: any, index: Number) => (
            <>
              <div
                key={`hour_${index}`}
                className={`border-slate-200 ${
                  index === 0
                    ? "border-r-[1px] md:border-r-[2px]"
                    : "border-r-[1px]"
                }`}
              />
              <div
                key={hour.time_epoch}
                className="flex flex-col items-center justify-start gap-4 md:w-auto"
              >
                <p className="text-md pb-3 px-3">
                  {new Date(hour.time_epoch * 1000)
                    .toLocaleTimeString()
                    .split(":")
                    .splice(0, 2)
                    .join(":")}
                </p>
                <Image
                  src={`https:${
                    hour.condition.icon.split("x")[0].slice(0, -2) +
                    "128x128" +
                    hour.condition.icon.split("x")[1].slice(2)
                  }`}
                  width={64}
                  height={64}
                  alt="Weather icon"
                  className="w-14 h-14 md:w-16 md:h-16"
                />
                <p className="text-2xl font-semibold py-3">
                  {Math.round(hour.temp_c)}°
                </p>
                <p className="text-xl font-medium pt-3">
                  {hour.chance_of_rain}%
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
