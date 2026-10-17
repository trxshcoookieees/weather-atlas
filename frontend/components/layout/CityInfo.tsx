"use client";

import { SaveCity } from "@/components/ui/SaveCity";
import { useWeather } from "@/context/WeatherContext";
import { useCity } from "@/context/CityContext";
import { parseWeatherDateTime } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/Skeleton";

export function CityInfo() {
  const { city, weather, loading } = useWeather();
  const { isLoaded, isCityResolved } = useCity();

  const isLoading = !isLoaded || !isCityResolved || loading;

  if (isLoading) {
    return (
      <section className="flex min-h-22 items-center justify-between px-8">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </section>
    );
  }

  if (!city) return null;

  let lastUpdate: string | null = null;

  if (weather) {
    const { current, location } = weather;
    lastUpdate = parseWeatherDateTime(current.time, location.timezone).label;
  }

  return (
    <section className="flex min-h-22 items-center px-8 sm:justify-between">
      <div className="mr-4 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline-last">
          <span className="mr-2 text-xl font-semibold md:text-3xl">
            {city.name}
          </span>
          <span className="md:text-md text-sm text-nowrap text-neutral-700 dark:text-neutral-300">
            {[city.region, city.country].filter(Boolean).join(", ")}
          </span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {lastUpdate ? `Last update at ${lastUpdate}` : "Loading weather…"}
        </p>
      </div>

      <SaveCity
        id={city.id}
        name={city.name}
        latitude={city.latitude}
        longitude={city.longitude}
        country={city.country}
        region={city.region}
        locale={city.locale}
        timezone={city.timezone}
      />
    </section>
  );
}
