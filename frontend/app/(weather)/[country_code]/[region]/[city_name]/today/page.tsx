import {
  CurrentWeather,
  HourlyForecast,
  NextDayChart,
  WeeklyForecast,
} from "./_components";

export default async function Overview() {
  return (
    <>
      {/* Current weather and parameters */}
      <CurrentWeather />
      {/*/!* Hourly forecast *!/*/}
      <HourlyForecast />
      {/*/!* 24h & Weekly forecast*!/*/}
      <section className="flex gap-6">
        <NextDayChart />
        <WeeklyForecast />
      </section>
      <div className="flex gap-6">Source Notes</div>
    </>
  );
}
