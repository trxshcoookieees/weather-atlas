import { Skeleton } from "@/components/ui/skeleton";
import { Chart } from "@/components/weather/chart";
import { CityInfoSkeleton } from "@/components/skeletons/city-info-skeleton";
import { CurrentWeatherSkeleton } from "@/components/skeletons/current-weather-skeleton";
import HourlyForecastSkeleton from "@/components/skeletons/hourly-forecast-skeleton";

export default function Loading() {
  return (
    <>
      <CityInfoSkeleton />
      <CurrentWeatherSkeleton />
      <HourlyForecastSkeleton />

      <section className="flex flex-col gap-6 xl:flex-row">
        <div className="hidden max-h-max w-full space-y-5 rounded-4xl surface p-6 sm:block">
          <div>
            <p className="text-xl font-semibold">Temperature, next 24 hours</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Apparent temperature tracks 1–2° lower through the day
            </p>
          </div>
          <Chart data={[]} timezone={""} unit={"C"} />
        </div>
        <div className="w-full space-y-3.5 rounded-4xl surface p-6">
          <div>
            <p className="text-xl font-semibold">7-day Forecast</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Next week
            </p>
          </div>
          <div className="h-64 scrollbar-none divide-y divide-neutral-500 overflow-y-scroll">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={`weekly-${i}`} className="py-2.5">
                <Skeleton className="mb-2 h-4 w-16 rounded-sm" />
                <Skeleton className="h-4 w-48 rounded-sm sm:w-64" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
