"use client";

import { useEffect, useState } from "react";
import { getCity } from "@/lib/weather/api";

export function CitySearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 2) return;

    const controller = new AbortController();

    async function searchCities() {
      try {
        const cities = await getCity(debouncedQuery, controller.signal);
        console.log(cities);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("City search failed: ", error);
        }
      }
    }
    searchCities();

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <input
      type="search"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search city or coordinates"
      className="surface h-10 w-full rounded-lg pr-3 pl-9 text-sm outline-black/10 focus:outline"
    />
  );
}
