"use client";

import { getHourlyData, getWeekdayName } from "@/utils/utils";
import Image from "next/image";
import React, { useState } from "react";

export default function FutureWeather({ data }: { data: any }) {
  const [dayOpen, setDayOpen] = useState<number | null>(null);

  if (dayOpen !== null) {
    const hours = getHourlyData(data.forecast.forecastday[dayOpen], true);
    const relevantHours = hours.filter(
      (hour: any, index: number) => index % 3 === 0
    );
    return (
      <div className="bg-slate-100 rounded-xl px-3 pt-7 pb-2 relative md:px-7">
        <div
          className="absolute top-7 left-4 cursor-pointer md:left-8"
          onClick={() => setDayOpen(null)}
        >
          <Image
            src="/back.png"
            width={32}
            height={32}
            alt="Back icon"
            className="w-8 h-8"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-7">
          {getWeekdayName(dayOpen, true)}
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
              <React.Fragment key={`frag_${index}`}>
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
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const days = data.forecast.forecastday.map((day: any) => {
    return day.day;
  });
  return (
    <div
      className="bg-slate-100 rounded-xl px-3 pt-7 pb-2 md:px-7"
      key={"daily_forecast_container"}
    >
      <h2 className="text-2xl font-semibold text-center mb-3">
        Daily Forecast
      </h2>
      {days.map((day: any, index: number) => (
        <React.Fragment key={`frag_${index}`}>
          <div
            key={`fut_${index}`}
            className="flex flex-col justify-between items-center gap-4 py-1 cursor-pointer md:flex-row"
            onClick={() => setDayOpen(index)}
          >
            <div className="flex gap-4 justify-start items-center md:gap-12">
              <p className="text-md font-medium w-8">{getWeekdayName(index)}</p>
              <Image
                src={`https:${
                  day.condition.icon.split("x")[0].slice(0, -2) +
                  "128x128" +
                  day.condition.icon.split("x")[1].slice(2)
                }`}
                width={64}
                height={64}
                alt="Weather icon"
                className="w-16 h-16"
              />
              <div className="flex gap-2">
                <Image
                  src={"/drops.png"}
                  width={32}
                  height={32}
                  alt="Weather icon"
                  className="w-6 h-6"
                />
                <p className="font-medium">{day.daily_chance_of_rain}%</p>
              </div>
              <p className="text-lg block md:hidden">
                <span className="font-semibold">
                  {Math.round(day.maxtemp_c)}°
                </span>{" "}
                /{" "}
                <span className="font-normal">
                  {Math.round(day.mintemp_c)}°
                </span>
              </p>
            </div>
            <p className="text-lg font-semibold  hidden md:block">
              {day.condition.text}
            </p>
            <p className="text-lg hidden md:block">
              <span className="font-semibold">
                {Math.round(day.maxtemp_c)}°
              </span>{" "}
              /{" "}
              <span className="font-normal">{Math.round(day.mintemp_c)}°</span>
            </p>
          </div>
          {index !== days.length - 1 && (
            <div
              className="border-t-[1px] border-slate-200 my-2"
              key={`fut_div_${index}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
