import type { WeatherResponse } from "./types";

const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

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

  return response.json();
}
