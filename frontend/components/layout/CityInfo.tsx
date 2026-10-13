"use client";

import { SaveCity } from "@/components/ui/SaveCity";
import { useCity } from "@/context/CityContext";
import { useWeather } from "@/context/WeatherContext";
import { parseWeatherDateTime } from "@/lib/formatters";

export function CityInfo() {
  const { activeCity } = useCity();
  const { weather } = useWeather();

  let lastUpdate: string | null = null;

  if (weather) {
    const { current, location } = weather;
    lastUpdate = parseWeatherDateTime(current.time, location.timezone).label;
  }

  if (!activeCity) {
    return null;
  }

  return (
    <section className="flex items-center px-8 sm:justify-between">
      <div className="mr-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline-last">
          <span className="mr-2 text-xl font-semibold md:text-3xl">
            {activeCity.name}
          </span>
          <span className="md:text-md text-sm text-nowrap text-neutral-700 dark:text-neutral-300">
            {[activeCity.admin1, activeCity.country].filter(Boolean).join(", ")}
          </span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{`Last update at ${lastUpdate}`}</p>
      </div>
      <SaveCity
        id={activeCity.id}
        name={activeCity.name}
        latitude={activeCity.latitude}
        longitude={activeCity.longitude}
        admin1={activeCity.admin1}
        country={activeCity.country}
        countryCode={activeCity.countryCode}
      />
    </section>
  );
}
