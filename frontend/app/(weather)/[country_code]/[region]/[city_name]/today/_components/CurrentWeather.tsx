"use client";

import { WeatherMetric } from "@/components/weather/WeatherMetric";
import { CloudRain, Droplets, Eye, Gauge, Navigation, Sun } from "lucide-react";
import { WeatherIcon } from "@/components/weather";
import { formatTemperature, parseWeatherDateTime } from "@/lib/formatters";
import { getWeatherIconName } from "@/lib/weather/weather-codes";
import {
  getHumidityLabel,
  getPressureLabel,
  getUVILabel,
  getVisibilityLabel,
  getWeatherLabel,
} from "@/lib/weather/weather-descriptions";
import { compassPoint } from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";
import { useSearchParams } from "next/navigation";
import { CurrentWeatherSkeleton } from "@/app/(weather)/[country_code]/[region]/[city_name]/today/_components/CurrentWeatherSkeleton";

export function CurrentWeather() {
  const { weather, loading, error } = useWeather();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!weather) {
    return null;
  }

  const {
    location,
    current,
    hourly,
    daily,
    pressureDelta,
    precipitationDelta,
  } = weather;

  const today = daily[0];
  const currentHour = Number(
    parseWeatherDateTime(current.time, location.timezone).hours,
  );
  const currentHourIndex = 24 + currentHour;

  const currentVisibility = Math.round((today?.visibility ?? 0) / 1000);

  return loading ? (
    <CurrentWeatherSkeleton />
  ) : (
    <section className="flex min-h-75 flex-col gap-5 xl:flex-row">
      <div className="relative flex w-full flex-col-reverse rounded-2xl surface p-4 sm:flex-row sm:rounded-3xl sm:p-7 lg:rounded-4xl xl:w-1/2 xl:justify-between 2xl:w-2/3 2xl:pr-32">
        <div className="space-y-3">
          <p className="medium max-w-max text-4xl sm:text-5xl lg:text-7xl">
            {formatTemperature(current.temperature, unit).display}
          </p>
          <p className="max-w-max">
            <span className="block sm:inline">
              {`Feels like ${formatTemperature(current.apparentTemperature, unit).display}`}
            </span>
            <span className="hidden sm:inline"> · </span>
            <span className="text-neutral-600 dark:text-neutral-300">
              {`High ${formatTemperature(today?.maxTemperature ?? 0, unit).display} / Low ${formatTemperature(today?.minTemperature ?? 0, unit).display}`}
            </span>
          </p>
          <p className="w-full text-sm sm:max-w-3/5 sm:text-base">
            A fresh, bright afternoon with clouds breaking from the west. A
            brief shower is possible around 17:00.
          </p>
        </div>
        <div className="absolute top-4 right-7 cursor-default space-y-2 select-none sm:static">
          <WeatherIcon
            name={getWeatherIconName(current.weatherCode, current.isDay)}
            alt="Partly Cloudy Day"
            size={200}
            variant={"animated"}
            className="w-24 sm:w-50 2xl:h-50"
          />
          <div className="mx-auto mt-4 hidden max-h-8 w-max items-center rounded-full border border-neutral-600 px-3 py-2 sm:flex dark:border-neutral-300">
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              {getWeatherLabel(current.weatherCode)}
            </span>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-3 xl:w-1/2 xl:grid-cols-2 2xl:w-1/3">
        <WeatherMetric
          icon={Droplets}
          label="Humidity"
          value={`${current.humidity ?? 0} %`}
          detail={getHumidityLabel(current.humidity)}
        />
        <WeatherMetric
          icon={Navigation}
          label="Wind"
          value={`${current?.windSpeed ?? 0} m/s`}
          detail={`${compassPoint(current.windDirection)} · ${current.windDirection}°`}
        />
        <WeatherMetric
          icon={Gauge}
          label="Pressure"
          value={`${today?.avgPressureMsl ?? 0} hPa`}
          detail={getPressureLabel(pressureDelta)}
        />
        <WeatherMetric
          icon={Eye}
          label="Visibility"
          value={`${currentVisibility} km`}
          detail={getVisibilityLabel(currentVisibility)}
        />
        <WeatherMetric
          icon={Sun}
          label="UV Index"
          value={getUVILabel(hourly[currentHourIndex]?.uvIndex)}
          // detail="Protection 30m"
        />
        <WeatherMetric
          icon={CloudRain}
          label="Precipitation"
          value={`${precipitationDelta} mm`}
          detail="Past hour"
        />
      </div>
    </section>
  );
}
