import type { Metadata } from "next";
import { compassPoint } from "@/lib/utils";
import { generateWeatherMetadata, formatSlug } from "@/lib/utils";
import { getTemperatureUnit } from "@/app/actions/temperature";
import { getCityById, getWeatherForecast } from "@/lib/server/weather";
import {
  formatTemperature,
  parseWeatherDateTime,
  parseWeatherDay,
} from "@/lib/formatters";
import { SaveCity } from "@/components/ui/save-city";
import { Chart } from "@/components/weather/chart";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { getWeatherIconName } from "@/lib/weather/weather-codes";
import {
  getHumidityLabel,
  getPressureLabel,
  getUVILabel,
  getVisibilityLabel,
  getWeatherLabel,
} from "@/lib/weather/weather-descriptions";
import { WeatherMetric } from "@/components/weather/weather-metric";
import { CloudRain, Droplets, Eye, Gauge, Navigation, Sun } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[region]/[city]/[id]/today">): Promise<Metadata> {
  const { city, region } = await params;

  return generateWeatherMetadata(formatSlug(city), formatSlug(region));
}

export default async function Today(
  props: PageProps<"/[locale]/[region]/[city]/[id]/today">,
) {
  const { id } = await props.params;
  const unit = await getTemperatureUnit();

  const city = await getCityById(Number(id));
  const {
    location,
    current,
    hourly,
    daily,
    precipitationDelta,
    pressureDelta,
  } = await getWeatherForecast(city.latitude, city.longitude);
  const lastUpdate = parseWeatherDateTime(
    current.time,
    location.timezone,
  ).label;
  const today = daily[0];
  const currentHour = Number(
    parseWeatherDateTime(current.time, location.timezone).hours,
  );
  const currentHourIndex = 24 + currentHour;
  const currentVisibility = Math.round((today?.visibility ?? 0) / 1000);

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="mr-4">
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
      <section className="flex min-h-75 flex-col gap-5 xl:flex-row">
        <div className="relative flex h-51 w-full flex-col-reverse rounded-2xl surface p-4 sm:h-62 sm:flex-row sm:rounded-3xl sm:p-7 md:max-lg:h-60 lg:rounded-4xl xl:h-75 xl:w-1/2 xl:justify-between 2xl:h-76 2xl:w-2/3 2xl:pr-32">
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
            <p className="w-full text-sm sm:text-base md:max-w-3/5">
              A fresh, bright afternoon with clouds breaking from the west. A
              brief shower is possible around 17:00.
            </p>
          </div>
          <div className="absolute top-4 right-4 cursor-default space-y-2 select-none sm:static">
            <WeatherIcon
              name={getWeatherIconName(current.weatherCode, current.isDay)}
              alt="Partly Cloudy Day"
              size={200}
              variant={"animated"}
              className="size-24 sm:size-32 xl:size-48 2xl:size-50"
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
            value={`${current.windSpeed ?? 0} m/s`}
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
            value={getUVILabel(hourly[currentHourIndex].uvIndex)}
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

      <section className="flex flex-col gap-6 xl:flex-row">
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
        <div className="w-full space-y-3.5 rounded-4xl surface p-6">
          <div>
            <p className="text-xl font-semibold">7-day Forecast</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Next week
            </p>
          </div>
          <div className="h-64 scrollbar-none divide-y-2 divide-neutral-600 overflow-y-scroll">
            {daily?.map((item) => {
              const day = parseWeatherDay(item.time, location.timezone);
              const todayKey = parseWeatherDay(
                current.time,
                location.timezone,
              ).key;
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
      </section>
    </>
  );
}
