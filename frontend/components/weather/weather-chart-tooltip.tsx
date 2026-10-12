import { HourlyChartPoint } from "@/components/weather/chart";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { formatTemperature } from "@/lib/formatters";

export type WeatherTooltipPayload = {
  dataKey: string;
  value: number;
  payload: HourlyChartPoint;
};

export type ChartTooltipProps = {
  active?: boolean;
  payload?: WeatherTooltipPayload[];
  label?: string;
  unit: "C" | "F";
};

export function WeatherChartTooltip({
  active,
  payload,
  label,
  unit,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const point = payload[0]?.payload;

  if (!point) return null;

  return (
    <div className="rounded-lg bg-stone-200 px-2.5 py-1.5 shadow-sm dark:bg-gray-400">
      <p className="text-center text-xs">{label}</p>
      <div className="flex w-full items-center justify-center gap-4">
        <WeatherIcon name={point.weather} alt="" size={40} />
        <div>
          <p className="font-semibold">
            {formatTemperature(point.temperature, unit).display}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            feels {formatTemperature(point.apparentTemperature, unit).display}
          </p>
        </div>
      </div>
    </div>
  );
}
