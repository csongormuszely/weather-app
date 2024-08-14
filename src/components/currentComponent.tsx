import Image from "next/image";

export default function CurrentWeather({ data }: { data: any }) {
  return (
    <div className="bg-slate-100 rounded-xl inline-block px-3 py-2">
      <div className="flex items-center gap-3">
        <Image
          src={`https:${
            data.current.condition.icon.split("x")[0].slice(0, -2) +
            "128x128" +
            data.current.condition.icon.split("x")[1].slice(2)
          }`}
          width={100}
          height={100}
          alt="Weather icon"
        />
        <p className="text-5xl font-bold">{data.current.temp_c}°</p>
      </div>
    </div>
  );
}
