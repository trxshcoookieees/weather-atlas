import {
  CloudRain,
  CloudSun,
  Droplets,
  Eye,
  Gauge,
  Heart,
  Navigation,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { Badge, Icon } from "@/components/ui";
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

export default async function Overview({ searchParams }: PageProps<"/">) {
  const { location, current, hourly, daily } = await getWeatherForecast(
    Number(56.1210898),
    Number(92.9360696),
  );

  const unit = (await searchParams).unit === "F" ? "F" : "C";

  const currentHour = Number(
    parseWeatherDateTime(current.time, location.timezone).hours,
  );

  const todayKey = parseWeatherDay(current.time, location.timezone).key;

  const today = daily?.[0];

  return (
    <WeatherRefresh>
      <div className={"space-y-6 px-8 pt-7"}>
        {/* Top header */}
        <section className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold">Amsterdam</span>
              <span className="text-sm text-slate-600/70">Netherlands</span>
            </div>
            <p className="mt-1 text-xs text-slate-600/70">
              Last update at{" "}
              {parseWeatherDateTime(current.time, location.timezone).label}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={Heart} className="text-slate-600" />
            <span className="text-sm font-semibold">Save</span>
          </div>
        </section>
        {/* Current weather and parameters */}
        <section className="flex min-h-75 gap-5">
          <div className="flex w-2/3 items-center justify-between surface rounded-4xl p-7 pr-32">
            <div className={"h-full space-y-3"}>
              <p className="medium text-7xl">
                {formatTemperature(current.temperature, unit).display}
              </p>
              <p className="text-slate-600">
                Feels like{" "}
                {formatTemperature(current.apparentTemperature, unit).display} ·
                High{" "}
                {formatTemperature(today?.maxTemperature ?? 0, unit).display} /
                Low{" "}
                {formatTemperature(today?.minTemperature ?? 0, unit).display}
              </p>
              <p className="max-w-3/5 text-slate-600">
                A fresh, bright afternoon with clouds breaking from the west. A
                brief shower is possible around 17:00.
              </p>
            </div>
            <div className="space-y-2">
              <WeatherIcon
                name={getWeatherIconName(current.weatherCode, current.isDay)}
                alt="Partly Cloudy Day"
                size={200}
                variant={"animated"}
              />
              <Badge variant="pillMuted" className="mx-auto">
                <span className={"text-xs font-semibold"}>Partly cloudy</span>
              </Badge>
            </div>
          </div>
          <div className="grid w-1/3 grid-cols-2 grid-rows-3 gap-3">
            <div className="space-y-2.5 surface rounded-2xl p-4">
              <div className="mr-auto flex items-center gap-2">
                <Icon icon={Droplets} className="text-cyan-900" />
                <span className="text-xs text-slate-600">Humidity</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mr-auto text-xl font-semibold">
                  {today?.humidity ?? 0}%
                </span>
                <span className="text-xs text-slate-500">Comfortable</span>
              </div>
            </div>
            <div className="space-y-2.5 surface rounded-xl p-4">
              <div className="mr-auto flex items-center gap-2">
                <Icon icon={Navigation} className="text-cyan-900" />
                <span className="text-xs text-slate-600">Wind</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mr-auto text-xl font-semibold">
                  {today?.windSpeed ?? 0} m/s
                </span>
                <span className="text-xs text-slate-500">SW · 224°</span>
              </div>
            </div>
            <div className="space-y-2.5 surface rounded-xl p-4">
              <div className="mr-auto flex items-center gap-2">
                <Icon icon={Gauge} className="text-cyan-900" />
                <span className="text-xs text-slate-600">Pressure</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mr-auto text-xl font-semibold">
                  {today?.avgPressureMsl ?? 0} hPa
                </span>
                <span className="text-xs text-slate-500">Steady</span>
              </div>
            </div>
            <div className="space-y-2.5 surface rounded-xl p-4">
              <div className="mr-auto flex items-center gap-2">
                <Icon icon={Eye} className="text-cyan-900" />
                <span className="text-xs text-slate-600">Visibility</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mr-auto text-xl font-semibold">
                  {Math.round((today?.visibility ?? 0) / 1000)} km
                </span>
                <span className="text-xs text-slate-500">Excellent</span>
              </div>
            </div>
            <div className="space-y-2.5 surface rounded-xl p-4">
              <div className="mr-auto flex items-center gap-2">
                <Icon icon={Sun} className="text-cyan-900" />
                <span className="text-xs text-slate-600">UV Index</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mr-auto text-xl font-semibold">
                  {today?.uvIndex ?? 0} Low
                </span>
                <span className="text-xs text-slate-500">Protection 30m</span>
              </div>
            </div>
            <div className="space-y-2.5 surface rounded-xl p-4">
              <div className="mr-auto flex items-center gap-2">
                <Icon icon={CloudRain} className="text-cyan-900" />
                <span className="text-xs text-slate-600">Precipitation</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mr-auto text-xl font-semibold">
                  {today?.precipitation ?? 0} mm
                </span>
                <span className="text-xs text-slate-500">Past hour</span>
              </div>
            </div>
          </div>
        </section>
        {/* Hourly forecast */}
        <section className="p space-y-4 surface rounded-3xl p-5.5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xl font-semibold">Hourly forecast</p>
              <p className="text-sm text-slate-600">
                Wind strengthens before a light late-afternoon shower
              </p>
            </div>
            <Link href="#" className="text-sm font-semibold text-cyan-900">
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
                    className="group w-full max-w-40 space-y-2.5 surface-muted px-3 py-3.5 transition-colors hover:bg-cyan-600/20"
                  >
                    <div className="flex items-center justify-between gap-10">
                      <div>
                        <p className="text-sm text-slate-600 group-hover:font-semibold group-hover:text-cyan-900">
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
                      <p className="text-xs text-slate-600">
                        {compassPoint(item.windDirection)}&nbsp;&nbsp;
                        {item.windSpeed} m/s
                      </p>
                      <div className="flex items-center gap-1 text-xs text-blue-400">
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
          <div className="max-h-max w-full space-y-5 surface rounded-3xl p-6">
            <div>
              <p className="text-xl font-semibold">
                Temperature, next 24 hours
              </p>
              <p className="text-sm text-slate-600">
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
          <div className="w-full space-y-3.5 surface rounded-3xl p-6">
            <div>
              <p className="text-xl font-semibold">7-day Forecast</p>
              <p className="text-sm text-slate-600">Next week</p>
            </div>
            <div className="h-64 scrollbar-thin divide-y-2 divide-slate-600/20 overflow-y-scroll">
              {daily?.slice(0, 7).map((item) => {
                const day = parseWeatherDay(item.time, location.timezone);
                const isToday = day.key == todayKey;
                return (
                  <div key={day.weekday} className="flex items-center py-2.5">
                    <div className="inline w-24">
                      <p className="font-semibold">
                        {isToday ? "Today" : day.weekday}
                      </p>
                      <p className="text-sm text-slate-600">{day.date}</p>
                    </div>
                    <WeatherIcon
                      name={getWeatherIconName(item.weatherCode, current.isDay)}
                    />
                    <span className="ml-12 text-sm text-slate-600">
                      Brief description of weather. TODO!!!
                    </span>
                    <div className="mr-6 ml-auto inline-flex items-center gap-1 text-sm text-blue-400">
                      <Icon icon={Droplets} className="size-3" />
                      <span>{item.humidity}%</span>
                    </div>
                    <span className="w-10 text-center text-sm text-slate-600">
                      {
                        formatTemperature(item.minApparentTemperature, unit)
                          .display
                      }
                    </span>
                    <span className="w-10 text-center font-semibold">
                      {
                        formatTemperature(item.maxApparentTemperature, unit)
                          .display
                      }
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
