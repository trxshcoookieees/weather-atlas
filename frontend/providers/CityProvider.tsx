"use client";

import { CityContext } from "@/context/CityContext";
import {
  getActiveCity,
  getSavedCities,
  saveCity as saveCityToStorage,
  setActiveCity as setActiveCityInStorage,
  removeCity as removeCityFromStorage,
  CHANGE_EVENT,
} from "@/lib/weather/saved-cities";
import { useCallback, useEffect, useState } from "react";
import { City } from "@/lib/weather/types";

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [activeCity, setActiveCityState] = useState<City | null>(null);

  const [savedCities, setSavedCitiesState] = useState<City[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const syncCities = useCallback(() => {
    setSavedCitiesState(getSavedCities());

    try {
      setActiveCityState(getActiveCity());
    } catch {
      setActiveCityState(null);
    }
  }, []);

  useEffect(() => {
    syncCities();
    setIsLoaded(true);

    window.addEventListener(CHANGE_EVENT, syncCities);

    return () => {
      window.removeEventListener(CHANGE_EVENT, syncCities);
    };
  }, [syncCities]);

  const setActiveCity = useCallback((city: City) => {
    setActiveCityInStorage(city);
    setActiveCityState(city);
  }, []);

  const saveCity = useCallback(
    (city: City) => {
      saveCityToStorage(city);
      syncCities();
    },
    [syncCities],
  );

  const removeCity = useCallback(
    (id: number) => {
      removeCityFromStorage(id);
      syncCities();
    },
    [syncCities],
  );

  return (
    <CityContext.Provider
      value={{
        activeCity,
        savedCities,
        setActiveCity,
        saveCity,
        removeCity,
        isLoaded,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
