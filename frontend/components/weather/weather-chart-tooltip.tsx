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
    <div className="space-y-2 surface px-3.5 py-2.5 shadow-sm">
      <p className="text-center text-xs text-slate-600">{label} · Today</p>
      <div className="flex w-full items-center justify-center gap-4">
        <WeatherIcon
          name={point.weather}
          size={32}
          alt=""
          className="shrink-0"
        />
        <div>
          <p className="font-semibold text-cyan-900">
            {formatTemperature(point.temperature, unit)}
          </p>
          <p className="text-xs text-slate-600">
            feels {formatTemperature(point.apparentTemperature, unit)}
          </p>
        </div>
      </div>
    </div>
  );
}
