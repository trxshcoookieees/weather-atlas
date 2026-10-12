import { CurrentWeather } from "./_components";

export default async function Overview({
  params,
}: {
  params: Promise<{ country_code: string; admin: string; city_name: string }>;
}) {
  return (
    <>
      {/* Current weather and parameters */}
      <CurrentWeather />
      {/*/!* Hourly forecast *!/*/}
      {/*<HourlyForecast />*/}
      {/*/!* 24h & Weekly forecast*!/*/}
      {/*<section className="flex gap-6">*/}
      {/*  <NextDayChart />*/}
      {/*  <WeeklyForecast />*/}
      {/*</section>*/}
    </>
  );
}
