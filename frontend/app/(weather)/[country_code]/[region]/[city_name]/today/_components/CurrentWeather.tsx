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

export function CurrentWeather() {
  const { weather, loading, error } = useWeather();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  if (loading) {
    return <p>Loading weather...</p>;
  }

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

  return (
    <section className="flex min-h-75 gap-5">
      <div className="surface flex w-2/3 items-center justify-between rounded-4xl p-7 pr-32">
        <div className="h-full space-y-3">
          <p className="medium text-7xl">
            {formatTemperature(current.temperature, unit).display}
          </p>
          <p className="">
            {`Feels like ${formatTemperature(current.apparentTemperature, unit).display} · `}
            <span className="text-neutral-600 dark:text-neutral-300">
              {`High ${formatTemperature(today?.maxTemperature ?? 0, unit).display} / Low ${formatTemperature(today?.minTemperature ?? 0, unit).display}`}
            </span>
          </p>
          <p className="max-w-3/5">
            A fresh, bright afternoon with clouds breaking from the west. A
            brief shower is possible around 17:00.
          </p>
        </div>
        <div className="cursor-default space-y-2 select-none">
          <WeatherIcon
            name={getWeatherIconName(current.weatherCode, current.isDay)}
            alt="Partly Cloudy Day"
            size={200}
            variant={"animated"}
          />
          <div className="mx-auto flex max-h-8 w-max items-center rounded-full border border-neutral-600 px-3 py-2 dark:border-neutral-300">
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              {getWeatherLabel(current.weatherCode)}
            </span>
          </div>
        </div>
      </div>
      <div className="grid w-1/3 grid-cols-2 grid-rows-3 gap-3">
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
