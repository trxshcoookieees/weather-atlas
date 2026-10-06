import { HourlyChartPoint } from "@/components/weather/weather-chart";
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
    <div className="surface px-2.5 py-1.5 shadow-sm">
      <p className="text-center text-xs text-slate-600">{label}</p>
      <div className="flex w-full items-center justify-center gap-4">
        <WeatherIcon name={point.weather} alt="" size={40} />
        <div>
          <p className="font-semibold text-cyan-900">
            {formatTemperature(point.temperature, unit).display}
          </p>
          <p className="text-xs text-slate-600">
            feels {formatTemperature(point.apparentTemperature, unit).display}
          </p>
        </div>
      </div>
    </div>
  );
}
