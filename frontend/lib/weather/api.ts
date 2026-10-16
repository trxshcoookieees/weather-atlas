import type { WeatherAPIResponse, WeatherResponse, City } from "./types";
import { parseWeatherDateTime } from "@/lib/formatters";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (process.env.NODE_ENV === "production" ? "/api" : "http://127.0.0.1:8000");

export async function getWeatherForecast(
  latitude: number,
  longitude: number,
): Promise<WeatherResponse> {
  const response = await fetch(
    `${API_URL}/forecast?latitude=${latitude}&longitude=${longitude}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather forecast");
  }

  const data: WeatherAPIResponse = await response.json();

  const currentHour = Number(
    parseWeatherDateTime(data.current.time, data.location.timezone).hours,
  );
  const currentHourIndex = 24 + currentHour;

  const pressureDelta =
    data.hourly[currentHourIndex].pressureMsl -
    data.hourly[currentHourIndex - 3].pressureMsl;

  const precipitationDelta = Math.max(
    0,
    data.hourly[currentHourIndex].precipitation -
      data.hourly[currentHourIndex - 1].precipitation,
  );

  return {
    location: data.location,
    current: data.current,
    hourly: data.hourly.slice(24),
    daily: data.daily.slice(1),
    previousDay: {
      hourly: data.hourly.slice(0, 24),
      daily: data.daily[0],
    },
    pressureDelta,
    precipitationDelta,
  };
}

export async function getCity(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const response = await fetch(
    `${API_URL}/cities?city_name=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch city: ${response.status}`);
  }

  return response.json();
}

export async function getCityById(
  id: number,
  signal?: AbortSignal,
): Promise<City> {
  const response = await fetch(`${API_URL}/city/${id}`, {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch city: ${response.status}`);
  }

  return response.json();
}
