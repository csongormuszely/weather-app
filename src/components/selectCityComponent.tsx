"use client";

import Image from "next/image";
import SearchComponent from "./searchComponent";
import { getCurrentCity } from "@/lib/geolocation";
import { useRouter } from "next/navigation";

export default function SelectCity() {
  const router = useRouter();
  async function getGeolocation() {
    const city = await getCurrentCity();
    router.push(`/?city=${city?.city}`);
  }
  return (
    <div className="text-center py-24 max-w-[800px] mx-auto">
      <h1 className="text-6xl font-bold">Weather App</h1>
      <h2 className="text-3xl font-normal leading-snug mt-16">
        Please select your city or use Geolocation to select the city
        automatically.
      </h2>
      <div className="flex gap-4 justify-center items-center mt-16">
        <SearchComponent size={"lg"} />
        <button
          className="bg-slate-100 rounded-md px-4 py-2"
          onClick={getGeolocation}
        >
          <Image
            src="/location.png"
            width={32}
            height={32}
            alt="Back icon"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
}
