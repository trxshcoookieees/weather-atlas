"use client";

import type { HourlyWeather } from "@/lib/weather/types";
import type { WeatherIconName } from "@/components/weather/weather-icon";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Area,
  Tooltip,
} from "recharts";
import { WeatherChartTooltip } from "@/components/weather/weather-chart-tooltip";
import { parseWeatherDateTime, formatTemperature } from "@/lib/formatters";
import { getWeatherIconName } from "@/lib/weather/weather-codes";

export type HourlyChartPoint = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  weather: WeatherIconName;
};

type ChartProps = {
  data: HourlyWeather[];
  timezone: string;
  unit: "C" | "F";
};

export function Chart({ data, timezone, unit }: ChartProps) {
  const temperatures = data.map((h) => h.temperature);
  let minTemperature = Math.min(...temperatures);
  let maxTemperature = Math.max(...temperatures);
  const span = maxTemperature - minTemperature;
  const padding = span <= 1 ? 2 : Math.max(1, Math.round(span / 10));
  minTemperature = Math.floor(minTemperature - padding);
  maxTemperature = Math.ceil(maxTemperature + padding);
  const clampedMax = Math.max(maxTemperature, minTemperature + 2);

  const points = data.map((h) => ({
    time: parseWeatherDateTime(h.time, timezone),
    temperature: h.temperature,
    apparentTemperature: h.apparentTemperature,
    weather: getWeatherIconName(h.weatherCode, h.isDay),
  }));

  return (
    <div className="flex h-64 w-full items-center justify-center">
      <ResponsiveContainer>
        <ComposedChart data={points}>
          <defs>
            <linearGradient
              id="weather-temperature-fill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={"var(--chart-accent)"}
                stopOpacity={0.6}
              />
              <stop
                offset="50%"
                stopColor={"var(--chart-accent)"}
                stopOpacity={0.4}
              />
              <stop
                offset="90%"
                stopColor={"var(--chart-accent)"}
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            yAxisId={"temperature"}
            vertical={false}
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="time.time"
            interval={2}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--chart-base)",
              fontSize: 10,
            }}
          />
          <YAxis
            yAxisId="temperature"
            domain={[minTemperature, clampedMax]}
            axisLine={false}
            tickLine={false}
            width={20}
            tick={{
              fill: "var(--chart-base)",
              fontSize: 10,
            }}
            tickFormatter={(value) => formatTemperature(value, unit).display}
            allowDecimals={false}
          />
          <Tooltip
            content={<WeatherChartTooltip unit={unit} />}
            cursor={{ stroke: "var(--chart-base)", strokeDasharray: "3 3" }}
          />
          <Area
            yAxisId={"temperature"}
            type={"natural"}
            dataKey="temperature"
            stroke="none"
            fill="url(#weather-temperature-fill)"
            fillOpacity={1}
            dot={false}
            activeDot={false}
            baseValue="dataMin"
          />
          <Line
            yAxisId="temperature"
            type="natural"
            dataKey={"temperature"}
            dot={false}
            activeDot={{
              r: 4,
              fill: "var(--chart-accent)",
            }}
            strokeWidth={1.25}
            stroke="var(--chart-accent)"
            strokeOpacity="0.6"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
