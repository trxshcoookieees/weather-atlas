"use client";

import { Chart } from "@/components/weather";
import { useWeather } from "@/context/WeatherContext";
import { parseWeatherDateTime } from "@/lib/formatters";
import { useSearchParams } from "next/navigation";

export function NextDayChart() {
  const { weather } = useWeather();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  if (!weather) return null;

  const { hourly, current, location } = weather;
  const currentHour = Number(
    parseWeatherDateTime(current.time, location.timezone).hours,
  );

  return (
    <div className="hidden max-h-max w-full space-y-5 rounded-4xl surface p-6 sm:block">
      <div>
        <p className="text-xl font-semibold">Temperature, next 24 hours</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Apparent temperature tracks 1–2° lower through the day
        </p>
      </div>
      {hourly && hourly.length > 10 ? (
        <Chart
          data={hourly.slice(currentHour + 1, currentHour + 25)}
          timezone={location.timezone}
          unit={unit}
        />
      ) : (
        <span className="text-4xl font-semibold">No Data :(</span>
      )}
    </div>
  );
}
