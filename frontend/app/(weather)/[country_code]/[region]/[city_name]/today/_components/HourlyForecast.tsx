"use client";

import Link from "next/link";
import { formatTemperature, parseWeatherDateTime } from "@/lib/formatters";
import { WeatherIcon } from "@/components/weather";
import { compassPoint } from "@/lib/utils";
import { getWeatherIconName } from "@/lib/weather/weather-codes";
import { Icon } from "@/components/ui";
import { Droplets } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { useSearchParams } from "next/navigation";
import { HourlyForecastSkeleton } from "@/app/(weather)/[country_code]/[region]/[city_name]/today/_components/HourlyForecastSkeleton";

export function HourlyForecast() {
  const { weather, loading } = useWeather();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  if (!weather) return null;

  const { hourly, current, location } = weather;

  return loading ? (
    <HourlyForecastSkeleton />
  ) : (
    <section className="space-y-4 rounded-2xl max-sm:-mx-8 sm:rounded-3xl sm:surface sm:p-4 lg:rounded-4xl lg:py-5.5 xl:p-7">
      <div className="hidden items-end justify-between sm:flex">
        <div>
          <p className="text-xl font-semibold">Hourly forecast</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Wind strengthens before a light late-afternoon shower
          </p>
        </div>
        <Link
          href="#"
          className="text-sm font-semibold text-neutral-600 dark:text-neutral-300"
        >
          Full hourly forecast →
        </Link>
      </div>
      <div className="flex scrollbar-none gap-2.5 overflow-x-auto max-sm:px-8">
        {hourly
          ?.slice(
            Number(
              parseWeatherDateTime(current.time, location.timezone).hours,
            ) + 1,
            Number(
              parseWeatherDateTime(current.time, location.timezone).hours,
            ) + 11,
          )
          .map((item, i) => {
            return (
              <div
                key={`hourly-${i}`}
                className="w-max shrink-0 space-y-2.5 rounded-xl bg-neutral-700/10 px-3 py-3.5 2xl:px-3 3xl:w-full 3xl:shrink dark:bg-neutral-300/20"
              >
                <div className="flex items-center justify-between gap-10">
                  <div>
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      {parseWeatherDateTime(item.time, location.timezone).time}
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatTemperature(item.temperature, unit).display}
                    </p>
                  </div>
                  <WeatherIcon
                    name={getWeatherIconName(item.weatherCode, item.isDay)}
                    alt="Partly cloudy day"
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    {compassPoint(item.windDirection)}&nbsp;&nbsp;
                    {item.windSpeed} m/s
                  </p>
                  <div className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-200">
                    <Icon icon={Droplets} className="size-3" />
                    <span>{item.humidity}%</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
