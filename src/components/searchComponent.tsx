"use client";

import { getCityByQuery } from "@/lib/cities";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchComponent({
  size = "sm",
}: {
  size?: "sm" | "lg";
}) {
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  async function onType(e: any) {
    setQuery(e.target.value);
    if (query.length <= 2) {
      return setResults([]);
    }
    const cities = await getCityByQuery(query);
    if (!cities || cities.length === 0) {
      return setResults([]);
    }
    setResults(cities);
  }
  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search for a city"
        className={`bg-slate-100 ${
          size === "sm"
            ? "md:rounded-md md:text-lg md:py-1 md:px-3"
            : "md:rounded-lg md:text-xl md:py-2 md:px-4"
        }
        rounded-lg text-xl py-2 px-4`}
        onChange={onType}
        value={query}
      />
      <div className="absolute top-12 left-0 w-full bg-slate-50 rounded-md">
        {results.map((result, index) => (
          <React.Fragment key={`frag_${result.id}`}>
            <Link key={`link_${result.id}`} href={`/?city=${result.name}`}>
              <div
                className={`p-2 ${size === "lg" && "text-lg"}`}
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
              >
                {result.name}
              </div>
            </Link>
            {index < results.length - 1 && (
              <div className="border-t-[1px] border-slate-200 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </form>
  );
}
