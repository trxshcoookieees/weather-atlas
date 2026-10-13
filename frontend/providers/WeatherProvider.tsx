"use client";

import { WeatherContext } from "@/context/WeatherContext";
import { useCity } from "@/context/CityContext";
import type { WeatherResponse } from "@/lib/weather/types";
import type { SavedCity } from "@/lib/weather/saved-cities";
import { getWeatherForecast } from "@/lib/weather/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { slugify } from "@/lib/utils";

const CACHE = new Map<number, { data: WeatherResponse; t: number }>();
const STALE = 5 * 60 * 1000;

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const { activeCity, setActiveCity } = useCity();

  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestId = useRef(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  const cityId = activeCity?.id;
  const latitude = activeCity?.latitude;
  const longitude = activeCity?.longitude;

  useEffect(() => {
    const id = ++requestId.current;

    if (cityId == null || latitude == null || longitude == null) {
      setWeather(null);
      setLoading(false);
      setError(null);
      return;
    }

    const lat = latitude;
    const lon = longitude;

    const cached = CACHE.get(cityId);

    if (cached && Date.now() - cached.t < STALE) {
      setWeather(cached.data);
      setLoading(false);
      setError(null);
      return;
    }

    setWeather(null);
    setLoading(true);
    setError(null);

    async function loadWeather() {
      try {
        const data = await getWeatherForecast(lat, lon);

        if (id !== requestId.current) return;

        if (typeof cityId === "number") {
          CACHE.set(cityId, { data, t: Date.now() });
        }
        setWeather(data);
      } catch (err) {
        if (id !== requestId.current) return;

        setError(
          err instanceof Error ? err : new Error("Failed to load weather"),
        );
      } finally {
        if (id === requestId.current) {
          setLoading(false);
        }
      }
    }

    void loadWeather();

    return () => {
      requestId.current++;
    };
  }, [cityId, latitude, longitude]);

  const setCity = useCallback(
    (city: SavedCity) => {
      setActiveCity(city);

      const params = new URLSearchParams(searchParams.toString());
      params.set("unit", unit);

      router.push(
        `/${slugify(city.countryCode)}/${slugify(city.admin1)}/${slugify(city.name)}/${city.id}/today?${params.toString()}`,
        { scroll: false },
      );
    },
    [setActiveCity, unit, router, searchParams],
  );

  return (
    <WeatherContext.Provider
      value={{
        city: activeCity,
        weather,
        loading,
        error,
        setCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
