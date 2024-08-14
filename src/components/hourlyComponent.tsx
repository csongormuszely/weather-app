import { getHourlyData } from "@/utils/utils";
import Image from "next/image";

export default function HourlyWeather({ data }: { data: any }) {
  const hours = getHourlyData(data);
  const currentHour = new Date().getHours();
  const relevantHours = hours
    .slice(currentHour, currentHour + 24)
    .filter((hour: any, index: number) => index % 3 === 0);

  return (
    <div className="mt-16 bg-slate-100 p-4 rounded-xl px-6 pb-4 pt-7">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Hourly Forecast
      </h2>
      <div className="flex gap-3">
        <div className="flex flex-col items-center justify-start gap-[2.6rem] pb-3">
          <Image
            src="/clock.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-6 h-6"
          />
          <Image
            src="/weather.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-8 h-8"
          />
          <Image
            src="/temperature.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-8 h-8"
          />
          <Image
            src="/drops.png"
            width={32}
            height={32}
            alt="Clock icon"
            className="w-8 h-8"
          />
        </div>
        <div className="flex justify-between flex-grow">
          {relevantHours.map((hour: any, index: Number) => (
            <>
              <div
                key={`hour_${index}`}
                className={`border-slate-200 ${
                  index === 0 ? "border-r-[2px]" : "border-r-[1px]"
                }`}
              />
              <div
                key={hour.time_epoch}
                className="flex flex-col items-center justify-start gap-4"
              >
                <p className="text-md pb-3">
                  {new Date(hour.time_epoch * 1000)
                    .toLocaleTimeString()
                    .split(":")
                    .splice(0, 2)
                    .join(":")}
                </p>
                <Image
                  src={`https:${hour.condition.icon}`}
                  width={64}
                  height={64}
                  alt="Weather icon"
                  className="w-16 h-16"
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
