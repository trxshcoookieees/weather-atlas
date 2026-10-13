"use client";

import { useWeather } from "@/context/WeatherContext";
import { formatTemperature, parseWeatherDay } from "@/lib/formatters";
import { getWeatherIconName } from "@/lib/weather/weather-codes";
import { WeatherIcon } from "@/components/weather";
import { getWeatherLabel } from "@/lib/weather/weather-descriptions";
import { Icon } from "@/components/ui";
import { Droplets } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { WeeklyForecastSkeleton } from "@/app/(weather)/[country_code]/[region]/[city_name]/today/_components/WeeklyForecastSkeleton";

export function WeeklyForecast() {
  const { weather, loading, error } = useWeather();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  if (loading || !weather) {
    return <WeeklyForecastSkeleton />;
  }

  if (error) {
    return <p>{error?.message}</p>;
  }

  const { daily, current, location } = weather;
  const todayKey = parseWeatherDay(current.time, location.timezone).key;

  return (
    <div className="w-full space-y-3.5 rounded-4xl surface p-6">
      <div>
        <p className="text-xl font-semibold">7-day Forecast</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Next week
        </p>
      </div>
      <div className="h-64 scrollbar-none divide-y-2 divide-zinc-900/20 overflow-y-scroll">
        {daily?.slice(0, 7).map((item) => {
          const day = parseWeatherDay(item.time, location.timezone);
          const isToday = day.key == todayKey;
          return (
            <div key={day.weekday} className="flex items-center py-2.5">
              <div className="inline w-24">
                <p className="font-semibold">
                  {isToday ? "Today" : day.weekday}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {day.date}
                </p>
              </div>
              <WeatherIcon
                name={getWeatherIconName(item.weatherCode, current.isDay)}
                className="hidden sm:block"
              />
              <span className="ml-12 hidden text-sm sm:inline">
                {getWeatherLabel(item.weatherCode)}
              </span>
              <div className="mr-6 ml-auto inline-flex items-center gap-1 text-sm text-sky-600 dark:text-sky-200">
                <Icon icon={Droplets} className="size-3" />
                <span>{item.humidity}%</span>
              </div>
              <span className="w-10 text-center text-sm text-neutral-600 dark:text-neutral-300">
                {formatTemperature(item.minTemperature, unit).display}
              </span>
              <span className="w-10 text-center font-semibold">
                {formatTemperature(item.maxTemperature, unit).display}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
