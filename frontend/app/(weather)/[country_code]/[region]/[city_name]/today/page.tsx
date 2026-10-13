import {
  CurrentWeather,
  HourlyForecast,
  NextDayChart,
  WeeklyForecast,
} from "./_components";
import type { Metadata } from "next";
import { generateWeatherMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{
    country_code: string;
    region: string;
    city_name: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city_name, region } = await params;

  const city = city_name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const regionName = region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return generateWeatherMetadata(city, regionName);
}

export default async function Overview() {
  return (
    <>
      {/* Current weather and parameters */}
      <CurrentWeather />
      {/*/!* Hourly forecast *!/*/}
      <HourlyForecast />
      {/*/!* 24h & Weekly forecast*!/*/}
      <section className="flex flex-col gap-6 xl:flex-row">
        <NextDayChart />
        <WeeklyForecast />
      </section>
      <div className="flex gap-6">Source Notes</div>
    </>
  );
}
