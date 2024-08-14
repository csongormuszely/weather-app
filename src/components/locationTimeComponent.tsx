"use client";

import { capitalize } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function LocationTime({ city }: { city: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
    };
    updateTime();
  }, []);

  return (
    <p className="text-4xl font-semibold ml-4">
      {capitalize(city)},
      <span className="font-normal ml-1">
        {String(currentTime.getHours()).length === 1
          ? "0" + String(currentTime.getHours())
          : String(currentTime.getHours())}
        :
        {String(currentTime.getMinutes()).length === 1
          ? "0" + String(currentTime.getMinutes())
          : String(currentTime.getMinutes())}
      </span>
    </p>
  );
}
