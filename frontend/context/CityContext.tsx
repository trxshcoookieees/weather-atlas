"use client";

import { createContext, useContext } from "react";
import type { City } from "@/lib/weather/types";

type CityContextValue = {
  activeCity: City | null;
  savedCities: City[];
  setActiveCity: (city: City) => void;
  saveCity: (city: City) => void;
  removeCity: (id: number) => void;
  isLoaded: boolean;
};

export const CityContext = createContext<CityContextValue | null>(null);

export function useCity() {
  const context = useContext(CityContext);

  if (!context) {
    throw new Error("useCity must be used within CityProvider");
  }

  return context;
}
