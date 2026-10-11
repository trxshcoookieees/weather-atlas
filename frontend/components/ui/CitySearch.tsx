"use client";

import { useEffect, useState } from "react";
import { getCity } from "@/lib/weather/api";
import { CityAPIResponse } from "@/lib/weather/types";

export function CitySearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [cities, setCities] = useState<CityAPIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setCities([]);
      setIsOpen(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function searchCities() {
      setIsLoading(true);
      setError(null);

      try {
        const cities = await getCity(debouncedQuery, controller.signal);

        setCities(cities);
        setIsOpen(true);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("City search failed: ", error);
          setError("Failed to fetch cities");
          setCities([]);
          setIsOpen(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }
    searchCities();

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search city or coordinates"
        className="surface h-10 w-full rounded-lg pr-3 pl-9 text-sm outline-black/10 focus:outline"
      />

      {isOpen && (
        <ul className="absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-lg border border-white/30 bg-stone-300 shadow-md dark:bg-neutral-800">
          {isLoading ? (
            <li className="px-4 py-3 text-sm text-neutral-500">
              Поиск городов...
            </li>
          ) : error ? (
            <li className="px-4 py-3 text-sm text-red-500">{error}</li>
          ) : cities.length === 0 ? (
            <li className="px-4 py-3 text-sm text-neutral-500">
              Города не найдены
            </li>
          ) : (
            cities.map((city) => (
              <li key={city.id}>
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="font-medium">{city.name}</span>
                  {city.admin1 && <span>, {city.admin1}</span>}
                  {city.country && <span>, {city.country}</span>}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
