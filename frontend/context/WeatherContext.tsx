"use client";

import { createContext, useContext } from "react";
import type { WeatherResponse } from "@/lib/weather/types";
import { SavedCity } from "@/lib/weather/saved-cities";

type WeatherContextValue = {
  city: SavedCity | null;
  weather: WeatherResponse | null;
  loading: boolean;
  error: Error | null;
  setCity: (c: SavedCity) => void;
};

export const WeatherContext = createContext<WeatherContextValue | null>(null);

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }

  return context;
}
