"use client";

import { CurrentWeather } from "./CurrentWeather";
import { HourlyForecast } from "./HourlyForecast";
import { NextDayChart } from "./NextDayChart";
import { WeeklyForecast } from "./WeeklyForecast";

export function WeatherPage() {
  return (
    <>
      <CurrentWeather />

      <HourlyForecast />

      <section className="flex flex-col gap-6 xl:flex-row">
        <NextDayChart />
        <WeeklyForecast />
      </section>
      <div className="flex gap-6">Source Notes</div>
    </>
  );
}
