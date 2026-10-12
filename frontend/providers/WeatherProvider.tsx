"use client";

import { WeatherContext } from "@/context/WeatherContext";
import { useCity } from "@/context/CityContext";
import type { WeatherResponse } from "@/lib/weather/types";
import type { SavedCity } from "@/lib/weather/saved-cities";
import { getWeatherForecast } from "@/lib/weather/api";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CACHE = new Map<number, { data: WeatherResponse; t: number }>();
const STALE = 5 * 60 * 1000;

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const { activeCity, setActiveCity } = useCity();

  const [city, setCityState] = useState<SavedCity | null>(activeCity);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  const fetchCity = useCallback(async (c: SavedCity) => {
    setLoading(true);
    setError(null);

    try {
      const cached = CACHE.get(c.id);

      if (cached && Date.now() - cached.t < STALE) {
        setWeather(cached.data);
        return;
      }

      const data = await getWeatherForecast(c.latitude, c.longitude);

      CACHE.set(c.id, { data, t: Date.now() });
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load weather"),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCityState(activeCity);
  }, [activeCity]);

  useEffect(() => {
    if (!city) {
      setWeather(null);
      return;
    }

    void fetchCity(city);
  }, [city, fetchCity]);

  const setCity = useCallback(
    (c: SavedCity) => {
      setCityState(c);
      setActiveCity(c);

      const params = new URLSearchParams(searchParams.toString());
      params.set("unit", unit);

      router.push(
        `/${c.countryCode}/${c.admin1}/${c.name}/today?${params.toString()}`,
        { scroll: false },
      );
    },
    [setActiveCity, unit, router, searchParams],
  );

  return (
    <WeatherContext.Provider value={{ city, weather, loading, error, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
}
