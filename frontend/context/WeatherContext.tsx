"use client";

import { createContext, useContext } from "react";
import type { WeatherResponse } from "@/lib/weather/types";
import { City } from "@/lib/weather/types";

type WeatherContextValue = {
  city: City | null;
  weather: WeatherResponse | null;
  loading: boolean;
  error: Error | null;
  setCity: (c: City) => void;
};

export const WeatherContext = createContext<WeatherContextValue | null>(null);

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }

  return context;
}
