"use client";

import SearchComponent from "./searchComponent";

export default function Header() {
  return (
    <header className="flex items-center justify-center px-12 py-6 md:justify-between">
      <h1 className="text-lg font-semibold hidden md:block">Weather App</h1>
      <SearchComponent />
    </header>
  );
}
