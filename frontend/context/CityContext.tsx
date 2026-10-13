"use client";

import { createContext, useContext } from "react";
import type { SavedCity } from "@/lib/weather/saved-cities";

type CityContextValue = {
  activeCity: SavedCity | null;
  savedCities: SavedCity[];
  setActiveCity: (city: SavedCity) => void;
  saveCity: (city: SavedCity) => void;
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
