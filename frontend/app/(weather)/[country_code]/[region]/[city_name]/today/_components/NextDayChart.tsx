import { Chart } from "@/components/weather";

export function NextDayChart() {
  return (
    <div className="surface max-h-max w-full space-y-5 rounded-4xl p-6">
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
  );
}
