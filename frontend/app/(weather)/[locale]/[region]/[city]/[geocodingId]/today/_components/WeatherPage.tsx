"use client";

import { CurrentWeather } from "./CurrentWeather";
import { HourlyForecast } from "./HourlyForecast";
import { NextDayChart } from "./NextDayChart";
import { WeeklyForecast } from "./WeeklyForecast";
import { useCity } from "@/context/CityContext";
import { useEffect, useState } from "react";
import { getCityById } from "@/lib/weather/api";
import { City } from "@/lib/weather/types";

type WeatherPageProps = {
  countryCode: string;
  region: string;
  city: string;
  geocodingId: number;
};

export function WeatherPage({ geocodingId }: WeatherPageProps) {
  const { activeCity, setActiveCity, isLoaded, savedCities } = useCity();

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!Number.isSafeInteger(geocodingId) || geocodingId <= 0) {
      setError(new Error("Invalid city ID"));
      return;
    }

    const isCityInState =
      activeCity?.id === geocodingId ||
      savedCities.some((c) => c.id === geocodingId);

    if (isCityInState) {
      setError(null);
      return; // Do nothing cuz we're already on the right page
    }

    const controller = new AbortController();
    let cancelled = false;

    async function loadCity() {
      setError(null);

      try {
        const city = await getCityById(geocodingId, controller.signal);

        if (cancelled) return;

        const savedCity: City = {
          id: city.id,
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
          country: city.country ?? "",
          region: city.region,
          locale: city.locale,
          timezone: city.timezone,
        };

        setActiveCity(savedCity);
      } catch (error) {
        if (cancelled) return;

        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error : new Error("Failed to load city"),
        );
      }
    }

    void loadCity();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [geocodingId, isLoaded]);

  if (error) {
    return <p>Failed to load city: {error.message}</p>;
  }

  return (
    <>
      <CurrentWeather />

      <HourlyForecast />

      <section className="flex flex-col gap-6 xl:flex-row">
        <NextDayChart />
        <WeeklyForecast />
      </section>
      <div className="flex gap-6">Source Notes</div>
    </>
  );
}
