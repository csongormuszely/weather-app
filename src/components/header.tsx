"use client";

import SearchComponent from "./searchComponent";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-12 py-6">
      <h1 className="text-lg font-semibold">Weather App</h1>
      <SearchComponent />
    </header>
  );
}
