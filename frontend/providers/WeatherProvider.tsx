"use client";

import { WeatherContext } from "@/context/WeatherContext";
import { WeatherResponse } from "@/lib/weather/types";
import { useCallback, useEffect, useState } from "react";
import { SavedCity, setActiveCity } from "@/lib/weather/saved-cities";
import { useRouter, useSearchParams } from "next/navigation";
import { getWeatherForecast } from "@/lib/weather/api";

const CACHE = new Map<number, { data: WeatherResponse; t: number }>();
const STALE = 5 * 60 * 1000;

export function WeatherProvider({
  children,
  defaultCity,
}: {
  children: React.ReactNode;
}) {
  const [city, setCityState] = useState<SavedCity | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
        setLoading(false);
        return;
      }
      const data = await getWeatherForecast(c.latitude, c.longitude);
      CACHE.set(c.id, { data, t: Date.now() });
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load weather",
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    //
  });

  const setCity = useCallback(
    async (c: SavedCity) => {
      const params = new URLSearchParams();
      params.set("unit", unit);
      router.push(`/${c.countryCode}/${c.region}/${c.name}/today?${params}`, {
        scroll: false,
      });
      setActiveCity(c);
      await fetchCity(c);
    },
    [unit, fetchCity, router],
  );

  return (
    <WeatherContext.Provider
      value={{
        city,
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
