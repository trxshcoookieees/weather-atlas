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
    <section className="flex items-center justify-between px-8">
      <div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-semibold">{activeCity.name}</span>
          <span className="text-neutral-700 dark:text-neutral-300">
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
