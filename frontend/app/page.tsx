import { CloudRain, Droplets, Eye, Gauge, Navigation, Sun } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { compassPoint } from "@/lib/utils";
import { WeatherChart, WeatherIcon } from "@/components/weather";
import { getWeatherForecast } from "@/lib/weather/api";
import {
  formatTemperature,
  parseWeatherDateTime,
  parseWeatherDay,
} from "@/lib/formatters";
import { getWeatherIconName } from "@/lib/weather/weather-codes";
import WeatherRefresh from "@/components/weather/WeatherRefresh";
import {
  getHumidityLabel,
  getPressureLabel,
  getUVILabel,
  getVisibilityLabel,
  getWeatherLabel,
} from "@/lib/weather/weather-descriptions";
import { WeatherMetric } from "@/components/weather/WeatherMetric";
import { SaveCity } from "@/components/ui/SaveCity";

const DEFAULT_CITY = {
  latitude: "52.52437",
  longitude: "13.41053",
};

export default async function Overview({ searchParams }: PageProps<"/">) {
  const {
    unit = "C",
    latitude,
    longitude,
    id,
    name,
    admin,
    country,
  } = await searchParams;

  const lat = latitude ? Number(latitude) : Number(DEFAULT_CITY.latitude);
  const lng = longitude ? Number(longitude) : Number(DEFAULT_CITY.longitude);
  // TODO check 0 value, check range for coordinates
  // -90 <= lat <= 90
  // -180 <= lng <= 180

  const city = {
    id: id ? Number(id) : 2950159,
    name: name ?? "Berlin",
    latitude: lat,
    longitude: lng,
    admin: admin ?? "",
    country: country ?? "",
  };

  const {
    location,
    current,
    hourly,
    daily,
    pressureDelta,
    precipitationDelta,
  } = await getWeatherForecast(lat, lng);

  const todayKey = parseWeatherDay(current.time, location.timezone).key;
  const today = daily[0];

  const currentHour = Number(
    parseWeatherDateTime(current.time, location.timezone).hours,
  );
  const currentHourIndex = 24 + currentHour;

  const currentVisibility = Math.round((today?.visibility ?? 0) / 1000);

  return (
    <WeatherRefresh>
      <div className="space-y-6 px-8 pt-7">
        {/* Top header */}
        <section className="flex items-center justify-between">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-semibold">{city.name}</span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {[city.admin, city.country].filter(Boolean).join(", ")}
              </span>
            </div>
            <p className="text-sm">
              Last update at{" "}
              {parseWeatherDateTime(current.time, location.timezone).label}
            </p>
          </div>
          <SaveCity
            id={city.id}
            name={city.name}
            latitude={city.latitude}
            longitude={city.longitude}
            admin={city.admin}
            country={city.country}
          />
        </section>
        {/* Current weather and parameters */}
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
        {/* Hourly forecast */}
        <section className="surface space-y-4 rounded-4xl p-5.5">
          <div className="flex items-end justify-between">
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
          <div className="flex gap-2.5">
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
                    className="w-full max-w-40 space-y-2.5 rounded-3xl px-3 py-3.5"
                  >
                    <div className="flex items-center justify-between gap-10">
                      <div>
                        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                          {
                            parseWeatherDateTime(item.time, location.timezone)
                              .time
                          }
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
        {/* 24h & Weekly forecast*/}
        <section className="flex gap-6">
          <div className="surface max-h-max w-full space-y-5 rounded-4xl p-6">
            <div>
              <p className="text-xl font-semibold">
                Temperature, next 24 hours
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Apparent temperature tracks 1–2° lower through the day
              </p>
            </div>
            {hourly && hourly.length > 10 ? (
              <WeatherChart
                data={hourly.slice(currentHour + 1, currentHour + 25)}
                timezone={location.timezone}
                unit={unit}
              />
            ) : (
              <span className="text-4xl font-semibold">No Data :(</span>
            )}
          </div>
          <div className="surface w-full space-y-3.5 rounded-4xl p-6">
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
                    />
                    <span className="ml-12 text-sm">
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
        </section>
        <section>Source notes</section>
      </div>
    </WeatherRefresh>
  );
}
